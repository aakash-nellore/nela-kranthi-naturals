import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import ProductImage from "@/components/products/ProductImage";
import { getProductComplianceInfo } from "@/lib/compliance";
import { SITE_CONTACT } from "@/lib/constants";
import {
  getProductSeoData,
  getProductImageAlt,
  buildProductJsonLd,
  buildProductBreadcrumbJsonLd,
} from "@/lib/seo";

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested natural food product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || SITE_CONTACT.siteUrl
  ).replace(/\/$/, "");
  const seoData = getProductSeoData(
    product.slug,
    product.name,
    product.shortDescription
  );
  const canonicalUrl = `${baseUrl}/products/${product.slug}`;

  const hasValidRemoteImage =
    typeof product.image === "string" &&
    product.image.trim().length > 0 &&
    product.image.startsWith("http");

  const ogImages: Array<{ url: string; alt: string }> = hasValidRemoteImage
    ? [{ url: product.image, alt: getProductImageAlt(product) }]
    : [{ url: `${baseUrl}/icon.png`, alt: `${product.name} - ${SITE_CONTACT.brandName}` }];

  return {
    title: {
      absolute: seoData.seoTitle,
    },
    description: seoData.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoData.seoTitle,
      description: seoData.metaDescription,
      url: canonicalUrl,
      type: "website",
      images: ogImages,
      siteName: SITE_CONTACT.brandName,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.seoTitle,
      description: seoData.metaDescription,
      images: ogImages.map((img: { url: string; alt: string }) => img.url),
    },
    robots: product.isComplianceRestricted
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const compliance = getProductComplianceInfo(product.slug, product.name);
  const productJsonLd = buildProductJsonLd(product);
  const breadcrumbJsonLd = buildProductBreadcrumbJsonLd(product);

  // Category badge color schemes matching the existing product catalogue
  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Leaf Powders":
        return "bg-emerald-50 text-emerald-900 border-emerald-200/80";
      case "Flower & Petal Products":
        return "bg-rose-50 text-rose-900 border-rose-200/80";
      case "Fruit Powders":
        return "bg-amber-50 text-amber-900 border-amber-200/80";
      case "Vegetable Powders":
        return "bg-lime-50 text-lime-900 border-lime-200/80";
      case "Roots, Spices & Specialty Botanicals":
        return "bg-amber-100/60 text-amber-950 border-amber-300/70";
      case "Dehydrated Foods":
        return "bg-orange-50 text-orange-900 border-orange-200/80";
      default:
        return "bg-[#e9f1ed] text-[#1b4332] border-[#cfe1d7]";
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfaf6] py-10 sm:py-14 lg:py-16">
      {/* Schema.org Product Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      {/* Schema.org BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-[#52796f]">
            <li>
              <Link
                href="/"
                className="hover:text-[#1b4332] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f] rounded-sm"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#a0b5ab]">/</li>
            <li>
              <Link
                href="/products"
                className="hover:text-[#1b4332] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f] rounded-sm"
              >
                Products
              </Link>
            </li>
            <li aria-hidden="true" className="text-[#a0b5ab]">/</li>
            <li aria-current="page" className="font-semibold text-[#1b4332] truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Hero: Two-column layout on Desktop, stacked on mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Visual Placeholder */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-3xl border border-[#e8dfd1] p-6 sm:p-8 shadow-sm overflow-hidden">
              {/* Category indicator & Badge */}
              <div className="flex items-center justify-between border-b border-[#f0eae0] pb-4 mb-6">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full border ${getBadgeStyle(
                    product.category
                  )}`}
                >
                  {product.category}
                </span>

                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f]">
                  Solar Dehydrated
                </span>
              </div>

              {/* Product Image with Real Photo Support & Fallback Placeholder */}
              <ProductImage
                src={product.image}
                alt={getProductImageAlt(product)}
                productName={product.name}
                variant="detail"
                priority
              />

              {/* Bottom Info Bar */}
              <div className="mt-6 pt-4 border-t border-[#f0eae0] flex items-center justify-between text-xs text-[#52796f]">
                <span>Natural Harvest</span>
                <span className="font-semibold text-[#1b4332]">
                  Carefully Prepared
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Core Details */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Small Category Badge & Compliance Indicator */}
            <div className="mb-3 flex items-center gap-2 flex-wrap">
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${getBadgeStyle(
                  product.category
                )}`}
              >
                {product.category}
              </span>

              {compliance.isRestricted && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100/80 text-amber-950 border border-amber-300">
                  {compliance.statusLabel}
                </span>
              )}
            </div>

            {/* Main Product Heading */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Compliance Alert Box for Flagged Botanicals */}
            {compliance.isRestricted && (
              <div className="mt-4 w-full p-4 sm:p-5 rounded-2xl bg-amber-50/95 border border-amber-300 text-amber-950 shadow-2xs">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-800 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-amber-950">
                      {compliance.noticeHeading}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                      {compliance.noticeBody}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Short Description */}
            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Unit & Availability Specs Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd1] shadow-2xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
                  {compliance.isRestricted ? "Inquiry Specification" : "Available Unit"}
                </p>
                <p className="font-serif font-bold text-base sm:text-lg text-[#1b4332] mt-1">
                  {product.unit}
                </p>
                <p className="text-xs text-[#52796f] mt-0.5">
                  {compliance.isRestricted ? "Commercial & Formulation" : "Retail & Bulk packaging"}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e8dfd1] shadow-2xs">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
                  Catalogue Status
                </p>
                <div className="mt-1 flex items-center gap-2">
                  {compliance.isRestricted ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-serif font-bold text-base sm:text-lg text-amber-950">
                        {compliance.availabilityLabel}
                      </span>
                    </>
                  ) : product.available ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-serif font-bold text-base sm:text-lg text-[#1b4332]">
                        Available
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-2 h-2 rounded-full bg-stone-400" />
                      <span className="font-serif font-bold text-base sm:text-lg text-stone-600">
                        Seasonal
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-[#52796f] mt-0.5">
                  {compliance.isRestricted
                    ? compliance.availabilitySubtext
                    : "Based on seasonal harvest"}
                </p>
              </div>
            </div>

            {/* Quick Enquiry CTA Buttons in Hero */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
              <a
                href={`https://wa.me/917207717966?text=${encodeURIComponent(
                  compliance.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-[#0a2e1c] font-bold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                aria-label={`Enquire about ${product.name} on WhatsApp`}
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.675-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.911 1.23 3.112.15.201 2.124 3.243 5.145 4.548.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.086 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351zM12.04 2C6.495 2 2 6.495 2 12.04c0 1.85.5 3.585 1.372 5.083L2 22l5.025-1.317a9.99 9.99 0 0 0 5.015 1.357c5.545 0 10.04-4.495 10.04-10.04C22.08 6.495 17.585 2 12.04 2zm0 18.243a8.195 8.195 0 0 1-4.18-1.144l-.3-.178-3.107.815.83-3.029-.196-.312A8.188 8.188 0 0 1 3.847 12.04c0-4.52 3.674-8.193 8.193-8.193 4.52 0 8.193 3.673 8.193 8.193 0 4.52-3.673 8.203-8.193 8.203z" />
                </svg>
                <span>WhatsApp Us &rarr;</span>
              </a>

              <Link
                href={`/contact?inquiry=${encodeURIComponent(product.name)}&type=${compliance.contactUrlParam}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
              >
                <span>{compliance.isRestricted ? "Commercial Enquiry &rarr;" : "Send an Enquiry &rarr;"}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <section
          aria-labelledby="product-description-heading"
          className="mt-14 sm:mt-18 lg:mt-20 pt-10 sm:pt-14 border-t border-[#e8dfd1]"
        >
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Product Information</span>
            </div>

            <h2
              id="product-description-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-[#1b4332] tracking-tight"
            >
              About This Product
            </h2>

            <div className="mt-6 bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-2xs">
              <p className="text-base sm:text-lg text-[#3f4e46] leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </section>

        {/* ENQUIRY SECTION */}
        <section
          aria-labelledby="product-enquiry-heading"
          className="mt-12 sm:mt-16 bg-[#1b4332] text-[#fcfaf6] rounded-3xl p-8 sm:p-12 lg:p-14 text-center shadow-lg"
        >
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2d6a4f] text-emerald-200 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Direct Inquiries</span>
            </div>

            <h2
              id="product-enquiry-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight"
            >
              Interested in This Product?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              Share your requirement with us and we can discuss the product,
              specifications, quantity and other details directly.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary WhatsApp CTA */}
              <a
                href={`https://wa.me/917207717966?text=${encodeURIComponent(
                  compliance.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#25D366] text-[#0a2e1c] font-bold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-md focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.675-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.911 1.23 3.112.15.201 2.124 3.243 5.145 4.548.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.086 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351zM12.04 2C6.495 2 2 6.495 2 12.04c0 1.85.5 3.585 1.372 5.083L2 22l5.025-1.317a9.99 9.99 0 0 0 5.015 1.357c5.545 0 10.04-4.495 10.04-10.04C22.08 6.495 17.585 2 12.04 2zm0 18.243a8.195 8.195 0 0 1-4.18-1.144l-.3-.178-3.107.815.83-3.029-.196-.312A8.188 8.188 0 0 1 3.847 12.04c0-4.52 3.674-8.193 8.193-8.193 4.52 0 8.193 3.673 8.193 8.193 0 4.52-3.673 8.203-8.193 8.203z" />
                </svg>
                <span>WhatsApp Us &rarr;</span>
              </a>

              {/* Secondary Send an Enquiry CTA */}
              <Link
                href={`/contact?inquiry=${encodeURIComponent(product.name)}&type=${compliance.contactUrlParam}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#fcfaf6] text-[#1b4332] font-semibold text-sm sm:text-base hover:bg-white transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <span>Send an Enquiry &rarr;</span>
              </Link>

              {/* Third Call Us Action */}
              <a
                href="tel:+917207717966"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-emerald-300/40 text-white font-semibold text-sm sm:text-base hover:bg-[#2d6a4f] transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
