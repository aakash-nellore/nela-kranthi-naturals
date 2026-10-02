import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bulk & Wholesale Enquiries",
  description:
    "Bulk and wholesale supply enquiries for naturally processed food powders and dehydrated foods from Nela Kranthi Naturals, Sydapuram, Nellore, Andhra Pradesh.",
  openGraph: {
    title: "Bulk & Wholesale Enquiries | Nela Kranthi Naturals",
    description:
      "Bulk and wholesale supply enquiries for naturally processed food powders and dehydrated foods from Nela Kranthi Naturals, Sydapuram, Nellore, Andhra Pradesh.",
    url: "/bulk-orders",
  },
};

interface WhoWeServeItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const audienceList: WhoWeServeItem[] = [
  {
    id: "retailers",
    title: "Retailers",
    description:
      "Retail store owners can enquire about available natural products, packaging formats and suitable order quantities for retail shelves.",
    icon: (
      <svg
        className="w-6 h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
        <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.79 1.1L21 9" />
        <path d="M12 3v6" />
      </svg>
    ),
  },
  {
    id: "distributors",
    title: "Distributors",
    description:
      "Regional distributors can discuss ongoing product requirements, seasonal availability and bulk procurement channels.",
    icon: (
      <svg
        className="w-6 h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" />
        <path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" />
        <circle cx="8" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    ),
  },
  {
    id: "food-businesses",
    title: "Food Businesses",
    description:
      "Packaged food manufacturers, bakeries and snack makers can enquire about dehydrated powders suitable for recipe formulations.",
    icon: (
      <svg
        className="w-6 h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a5 5 0 0 0-5 5v1a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
        <path d="M12 12a7 7 0 0 0-7 7v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a7 7 0 0 0-7-7Z" />
      </svg>
    ),
  },
  {
    id: "hotels-restaurants",
    title: "Hotels & Restaurants",
    description:
      "Hospitality kitchens and culinary teams can discuss recurring product requirements for culinary seasonings and cooking preparations.",
    icon: (
      <svg
        className="w-6 h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8Z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    id: "bulk-buyers",
    title: "Bulk Buyers",
    description:
      "Institutions, community caterers and individual buyers can contact us with custom volume and packing requirements.",
    icon: (
      <svg
        className="w-6 h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
];

interface EnquireAboutItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const enquireAspects: EnquireAboutItem[] = [
  {
    id: "product-availability",
    title: "Product Availability",
    description:
      "Check which seasonal fruits, vegetables, leafy greens and powders are currently processed or in stock.",
    icon: (
      <svg
        className="w-5 h-5 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    ),
  },
  {
    id: "product-selection",
    title: "Product Selection",
    description:
      "Discuss specific produce varieties and processing styles matching your intended culinary or commercial application.",
    icon: (
      <svg
        className="w-5 h-5 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "approximate-quantities",
    title: "Approximate Quantities",
    description:
      "Share your estimated volume requirements, whether for trial batches, recurring orders or larger bulk supply.",
    icon: (
      <svg
        className="w-5 h-5 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    id: "packaging-requirements",
    title: "Packaging Requirements",
    description:
      "Discuss preferred container sizes, moisture-protective liners or commercial packaging formats for safe storage.",
    icon: (
      <svg
        className="w-5 h-5 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      </svg>
    ),
  },
  {
    id: "delivery-location",
    title: "Delivery & Location Requirements",
    description:
      "Specify your delivery destination and logistics preferences to arrange practical dispatch options.",
    icon: (
      <svg
        className="w-5 h-5 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

interface EnquireStep {
  step: string;
  title: string;
  description: string;
}

const enquireSteps: EnquireStep[] = [
  {
    step: "01",
    title: "Share the Product Name",
    description:
      "Let us know which fruit, vegetable, leaf powder or dehydrated item you need.",
  },
  {
    step: "02",
    title: "Mention the Approximate Quantity",
    description:
      "Indicate your estimated order volume or recurring quantity requirement.",
  },
  {
    step: "03",
    title: "Share Your Location",
    description:
      "Provide your city, district and state to help us plan dispatch details.",
  },
  {
    step: "04",
    title: "Tell Us Packaging Preferences",
    description:
      "Inform us of any specific packaging, packing sizes or timeline needs.",
  },
  {
    step: "05",
    title: "Discuss Directly With Us",
    description:
      "We will review availability and discuss fulfillment options directly with you.",
  },
];

interface ProductCategory {
  name: string;
  description: string;
  examples: string[];
}

const bulkCategories: ProductCategory[] = [
  {
    name: "Fruit Powders",
    description:
      "Naturally solar-dehydrated fruit powders suitable for food products, beverages and confectionery.",
    examples: ["Banana", "Papaya", "Mango", "Pineapple", "Lemon"],
  },
  {
    name: "Leaf Powders",
    description:
      "Gently dried green leaves processed for nutritional formulations, herbal blends and daily cooking.",
    examples: ["Moringa", "Curry Leaves"],
  },
  {
    name: "Vegetable Powders",
    description:
      "Pure vegetable powders suitable for seasonings, cooking mixes, soups and culinary bases.",
    examples: ["Ladyfinger / Okra", "Tomato", "Beetroot"],
  },
  {
    name: "Dehydrated Foods",
    description:
      "Carefully dried vegetable cuts, fruit slices and seasonal produce for extended storage and use.",
    examples: ["Vegetable Cuts", "Fruit Slices", "Seasonal Produce"],
  },
];

export default function BulkOrdersPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf6]">
      {/* PAGE HEADER / INTRO */}
      <section
        aria-labelledby="bulk-page-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading & Introduction */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                <span>Commercial &amp; Bulk Supply • Sydapuram, Nellore</span>
              </div>

              <h1
                id="bulk-page-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight"
              >
                Bulk &amp; Wholesale Enquiries
              </h1>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
                <p>
                  Looking for naturally processed foods in bulk? Nela Kranthi
                  Naturals welcomes enquiries from retailers, distributors, food
                  businesses, hotels, restaurants and other buyers.
                </p>
                <p>
                  Operating from our processing unit in Sydapuram, Nellore
                  District, Andhra Pradesh, we focus on careful preparation and
                  solar dehydration to serve custom and volume requirements.
                </p>
              </div>

              {/* Direct Quick Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://wa.me/917207717966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-[#0a2e1c] font-bold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.675-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.911 1.23 3.112.15.201 2.124 3.243 5.145 4.548.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.086 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351zM12.04 2C6.495 2 2 6.495 2 12.04c0 1.85.5 3.585 1.372 5.083L2 22l5.025-1.317a9.99 9.99 0 0 0 5.015 1.357c5.545 0 10.04-4.495 10.04-10.04C22.08 6.495 17.585 2 12.04 2zm0 18.243a8.195 8.195 0 0 1-4.18-1.144l-.3-.178-3.107.815.83-3.029-.196-.312A8.188 8.188 0 0 1 3.847 12.04c0-4.52 3.674-8.193 8.193-8.193 4.52 0 8.193 3.673 8.193 8.193 0 4.52-3.673 8.203-8.193 8.203z" />
                  </svg>
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href="tel:+917207717966"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#cfe1d7] text-[#1b4332] font-semibold text-sm sm:text-base hover:bg-[#e9f1ed] transition-all shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                  </svg>
                  <span>Call +91 72077 17966</span>
                </a>
              </div>
            </div>

            {/* Right Column: Local Placeholder Visual (Bulk / Packaged Natural Foods) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl bg-white border border-[#e4dbcd] p-6 sm:p-8 shadow-xl overflow-hidden">
                  {/* Card Top Brand Info */}
                  <div className="flex items-center justify-between border-b border-[#f0eae0] pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-[#2d6a4f] text-[#fcfaf6] flex items-center justify-center font-serif font-bold text-base shadow-sm">
                        NK
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
                          Nela Kranthi Naturals
                        </p>
                        <p className="text-[11px] text-[#52796f]">
                          Wholesale &amp; Bulk Supply
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f]">
                      Sydapuram Unit
                    </span>
                  </div>

                  {/* 
                    VISUAL PLACEHOLDER CONTAINER:
                    Ready to be replaced with:
                    <Image src="/images/bulk/packaged-natural-foods.jpg" alt="Packaged Natural Foods & Bulk Packing at Sydapuram" fill className="object-cover" />
                    when official bulk packaging photographs are added to /public.
                  */}
                  <div className="relative w-full aspect-4/3 rounded-2xl bg-[#f4ede3] border border-[#ded5c5] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                    <div className="w-16 h-16 rounded-2xl bg-[#2d6a4f] text-[#fcfaf6] flex items-center justify-center mb-3 shadow-md">
                      <svg
                        className="w-9 h-9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                        <path d="m3.3 7 8.7 5 8.7-5" />
                        <path d="M12 22V12" />
                      </svg>
                    </div>

                    <p className="font-serif font-bold text-lg text-[#1b4332]">
                      Bulk Food &amp; Packaging
                    </p>
                    <p className="text-xs text-[#52796f] max-w-xs mt-1">
                      Hygienically Packed Natural Powders &amp; Dehydrated Cuts
                    </p>
                    <p className="mt-3 text-[11px] font-medium text-[#7d6c56] bg-white px-3 py-1 rounded-full border border-[#ded5c5]">
                      Packaging Photography Ready
                    </p>
                  </div>

                  {/* Card Bottom Summary */}
                  <div className="mt-5 pt-4 border-t border-[#f0eae0] flex items-center justify-between text-xs text-[#52796f]">
                    <span>Custom Batches</span>
                    <span className="font-semibold text-[#1b4332]">
                      Direct Discussion
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — WHO WE SERVE */}
      <section
        id="who-we-serve"
        aria-labelledby="who-we-serve-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Commercial Segments</span>
            </div>

            <h2
              id="who-we-serve-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              Who We Serve
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              We welcome enquiries from diverse trade partners and commercial
              buyers looking for reliable natural produce and processed foods.
            </p>
          </div>

          {/* 5 Audience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {audienceList.map((item, index) => {
              const spanClass =
                index === 3 || index === 4
                  ? "lg:col-span-1 md:col-span-1"
                  : "";

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between ${spanClass}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-5 shadow-2xs">
                      {item.icon}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1b4332] leading-snug">
                      {item.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-[#4a5750] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-xs text-[#52796f] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                    <span>Open for Enquiry</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT YOU CAN ENQUIRE ABOUT */}
      <section
        id="what-you-can-enquire-about"
        aria-labelledby="enquire-aspects-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Enquiry Scope</span>
            </div>

            <h2
              id="enquire-aspects-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              What You Can Enquire About
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              Every requirement is discussed directly with our team to match
              availability, packaging preferences and practical delivery options.
            </p>
          </div>

          {/* 5 Enquire Scope Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-stretch">
            {enquireAspects.map((aspect) => (
              <div
                key={aspect.id}
                className="bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-4">
                    {aspect.icon}
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1b4332] leading-snug">
                    {aspect.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#4a5750] leading-relaxed">
                    {aspect.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-[11px] font-medium text-[#7d6c56]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Discussed Directly</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW TO ENQUIRE */}
      <section
        id="how-to-enquire"
        aria-labelledby="how-to-enquire-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Simple 5-Step Process</span>
            </div>

            <h2
              id="how-to-enquire-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              How to Enquire
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              We keep our enquiry process straightforward so you can easily
              connect with us regarding your product requirements.
            </p>
          </div>

          {/* 5 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-stretch">
            {enquireSteps.map((stepItem) => (
              <div
                key={stepItem.step}
                className="bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f] border border-[#cfe1d7] mb-4">
                    Step {stepItem.step}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-[#1b4332] leading-snug">
                    {stepItem.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#4a5750] leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-[11px] font-medium text-[#7d6c56]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Requirement Flow</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — PRODUCT CATEGORIES FOR BULK ENQUIRY */}
      <section
        id="products-for-bulk-enquiry"
        aria-labelledby="bulk-products-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Available Categories</span>
            </div>

            <h2
              id="bulk-products-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              Products for Bulk Enquiry
            </h2>

            {/* Availability Notice */}
            <div className="mt-5 max-w-2xl mx-auto bg-white/80 rounded-xl p-4 border border-[#e8dfd1] text-sm text-[#3f4e46] leading-relaxed shadow-2xs">
              <p className="font-medium text-[#1b4332]">
                Product availability may vary depending on availability and
                processing requirements.
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {bulkCategories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1b4332] mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-[#4a5750] leading-relaxed mb-5">
                    {category.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56] mb-2">
                    Examples include:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <span
                        key={example}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#f4efe6] text-[#1b4332] border border-[#e8dfd1]"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Link to general products */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
            >
              <span>Explore Products Catalogue</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* PROMINENT CONTACT CTA SECTION */}
      <section
        id="bulk-contact-cta"
        aria-labelledby="bulk-cta-heading"
        className="py-16 sm:py-20 bg-[#1b4332] text-[#fcfaf6]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2d6a4f] text-emerald-200 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Direct Commercial Discussion</span>
          </div>

          <h2
            id="bulk-cta-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Let&apos;s Discuss Your Requirement
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Share your product, quantity and location details with us and we can
            discuss your requirement directly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary WhatsApp CTA */}
            <a
              href="https://wa.me/917207717966"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] text-[#0a2e1c] font-bold text-sm sm:text-base hover:bg-[#20bd5a] transition-all shadow-md focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
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

            {/* Secondary Phone CTA */}
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

            {/* Third Contact CTA */}
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#fcfaf6] text-[#1b4332] font-semibold text-sm sm:text-base hover:bg-white transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span>Contact Us &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
