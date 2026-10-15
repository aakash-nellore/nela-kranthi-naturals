import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Nela Kranthi Naturals, a natural-food processing business based in Sydapuram, Nellore, Andhra Pradesh.",
  openGraph: {
    title: "About Us | Nela Kranthi Naturals",
    description:
      "Learn about Nela Kranthi Naturals, a natural-food processing business based in Sydapuram, Nellore, Andhra Pradesh.",
    url: "/about",
  },
};

interface ApproachStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const approachSteps: ApproachStep[] = [
  {
    step: "01",
    title: "Selection & Preparation",
    description: "Carefully select and prepare the produce before processing.",
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
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Cleaning & Preparation",
    description:
      "Clean and prepare fruits, vegetables and leafy greens appropriately.",
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
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Solar Dehydration",
    description:
      "Use solar dehydration as a practical method for processing selected products.",
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
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Quality Checking",
    description: "Check products during processing and before packing.",
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    step: "05",
    title: "Hygienic Packing",
    description:
      "Pack processed products carefully for storage and delivery.",
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
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
];

interface ProductCategoryItem {
  id: string;
  name: string;
  description: string;
  examples: string[];
  icon: React.ReactNode;
}

const productCategories: ProductCategoryItem[] = [
  {
    id: "fruit-powders",
    name: "Fruit Powders",
    description:
      "Naturally dried fruit powders prepared from selected fruits, suitable for smoothies, drinks and baking.",
    examples: ["Banana", "Papaya", "Mango", "Pineapple", "Lemon"],
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
    id: "leaf-powders",
    name: "Leaf Powders",
    description:
      "Wholesome leafy greens carefully prepared and dehydrated to retain natural green goodness and aroma.",
    examples: ["Moringa", "Curry Leaves"],
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
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    id: "vegetable-powders",
    name: "Vegetable Powders",
    description:
      "Convenient dehydrated vegetable powders designed for versatile culinary preparation and daily nutrition.",
    examples: ["Ladyfinger / Okra", "Tomato", "Beetroot"],
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M8 10h8" />
        <path d="M12 7v6" />
      </svg>
    ),
  },
  {
    id: "dehydrated-foods",
    name: "Dehydrated Foods",
    description:
      "Prepared dehydrated cuts and specialty food items processed thoughtfully for extended usability and storage.",
    examples: ["Vegetable Cuts", "Fruit Slices", "Seasonal Produce"],
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
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      </svg>
    ),
  },
];

interface FocusCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const focusCards: FocusCard[] = [
  {
    id: "natural-processing",
    title: "Natural Processing",
    description: "Focus on practical and natural processing methods.",
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
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    id: "careful-preparation",
    title: "Careful Preparation",
    description:
      "Products are prepared thoughtfully before dehydration and packing.",
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
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "hygienic-handling",
    title: "Hygienic Handling",
    description:
      "Maintain careful handling and packing practices throughout processing.",
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "customer-requirements",
    title: "Customer Requirements",
    description:
      "Understand product and quantity requirements for household, retail and bulk enquiries.",
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf6]">
      {/* PAGE HEADER / INTRO */}
      <section
        aria-labelledby="about-page-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                <span>Sydapuram, Nellore • Andhra Pradesh</span>
              </div>

              <h1
                id="about-page-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight"
              >
                About Nela Kranthi Naturals
              </h1>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
                <p>
                  Nela Kranthi Naturals is a natural-food processing business
                  based in Sydapuram, Nellore District, Andhra Pradesh. We focus
                  on carefully processing fruits, vegetables, leafy greens and
                  other food products using practical dehydration methods and
                  thoughtful preparation.
                </p>
                <p>
                  Our goal is to build an honest, transparent and reliable
                  food-processing enterprise that connects quality local
                  produce with household kitchens, retail partners and bulk
                  enquiries across Andhra Pradesh and beyond.
                </p>
              </div>

              {/* Quick Key Facts */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="bg-white rounded-xl p-4 border border-[#e8dfd1] shadow-2xs">
                  <p className="text-xs uppercase font-bold tracking-wider text-[#52796f]">
                    Location
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#1b4332] mt-1">
                    Sydapuram, Nellore
                  </p>
                  <p className="text-xs text-[#7d6c56] mt-0.5">
                    Andhra Pradesh, India
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#e8dfd1] shadow-2xs">
                  <p className="text-xs uppercase font-bold tracking-wider text-[#52796f]">
                    Methodology
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#1b4332] mt-1">
                    Solar Dehydration
                  </p>
                  <p className="text-xs text-[#7d6c56] mt-0.5">
                    Thoughtful Preparation
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#e8dfd1] shadow-2xs">
                  <p className="text-xs uppercase font-bold tracking-wider text-[#52796f]">
                    Service Channels
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#1b4332] mt-1">
                    Household &amp; Bulk
                  </p>
                  <p className="text-xs text-[#7d6c56] mt-0.5">
                    Retail &amp; Custom Orders
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Placeholder Card */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl bg-white border border-[#e4dbcd] p-6 sm:p-8 shadow-xl overflow-hidden">
                  {/* Facility Card Header */}
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
                          Sydapuram Processing Facility
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f]">
                      Nellore Dist.
                    </span>
                  </div>

                  {/* 
                    VISUAL PLACEHOLDER CONTAINER:
                    Ready to be replaced with:
                    <Image src="/images/about/sydapuram-facility.jpg" alt="Nela Kranthi Naturals Sydapuram Facility" fill className="object-cover" />
                    when official physical photography of the facility and process is added to /public.
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
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                      </svg>
                    </div>

                    <p className="font-serif font-bold text-lg text-[#1b4332]">
                      Processing Facility &amp; Unit
                    </p>
                    <p className="text-xs text-[#52796f] max-w-xs mt-1">
                      Sydapuram, Nellore District, Andhra Pradesh
                    </p>
                    <p className="mt-3 text-[11px] font-medium text-[#7d6c56] bg-white px-3 py-1 rounded-full border border-[#ded5c5]">
                      Facility Photography Ready
                    </p>
                  </div>

                  {/* Highlights Bar */}
                  <div className="mt-5 pt-4 border-t border-[#f0eae0] flex items-center justify-between text-xs text-[#52796f]">
                    <span>Clean &amp; Hygienic</span>
                    <span className="font-semibold text-[#1b4332]">
                      Careful Solar Drying
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 — OUR APPROACH */}
      <section
        id="our-approach"
        aria-labelledby="our-approach-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Step-by-Step Methodology</span>
            </div>

            <h2
              id="our-approach-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              Our Approach
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              We follow a practical, disciplined sequence of stages to ensure
              every product is handled thoughtfully from harvest to delivery.
            </p>
          </div>

          {/* 5 Approach Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-stretch">
            {approachSteps.map((item) => (
              <div
                key={item.step}
                className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f] border border-[#cfe1d7]">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1b4332] leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#4a5750] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-[11px] font-medium text-[#7d6c56]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Stage {item.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT WE WORK WITH */}
      <section
        id="what-we-work-with"
        aria-labelledby="what-we-work-with-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Produce Categories</span>
            </div>

            <h2
              id="what-we-work-with-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              What We Work With
            </h2>

            {/* Availability Notice */}
            <div className="mt-5 max-w-2xl mx-auto bg-white/80 rounded-xl p-4 border border-[#e8dfd1] text-sm text-[#3f4e46] leading-relaxed shadow-2xs">
              <p className="font-medium text-[#1b4332]">
                Our product range includes selected fruits, vegetables, leafy
                greens and food powders, depending on availability and
                processing requirements.
              </p>
            </div>
          </div>

          {/* 4 Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {productCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center shrink-0">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1b4332]">
                        {category.name}
                      </h3>
                      <span className="text-xs text-[#52796f]">
                        Carefully Processed Category
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[#4a5750] leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56] mb-2.5">
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

          {/* Notice & Link to Products */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
            >
              <span>View Available Products</span>
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

      {/* SECTION 3 — FROM SYDAPURAM, NELLORE */}
      <section
        id="from-sydapuram-nellore"
        aria-labelledby="sydapuram-nellore-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                <span>Geographic Roots &amp; Purpose</span>
              </div>

              <h2
                id="sydapuram-nellore-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight"
              >
                From Sydapuram, Nellore
              </h2>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
                <p>
                  Nela Kranthi Naturals is based in Sydapuram, Nellore District,
                  Andhra Pradesh, and is focused on developing a natural-food
                  processing business serving household, retail and bulk
                  requirements.
                </p>
                <p>
                  Located in the agricultural belt of Nellore district, our unit
                  benefits from direct access to diverse produce. By processing
                  fresh produce locally through solar dehydration and careful
                  preparation, we aim to deliver convenient, carefully prepared
                  natural foods that preserve authentic culinary taste and
                  practical utility.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-sm">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#e8dfd1] text-[#1b4332] font-medium shadow-2xs">
                  <svg
                    className="w-4 h-4 text-[#2d6a4f]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Sydapuram Mandal, Nellore District</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#e8dfd1] text-[#1b4332] font-medium shadow-2xs">
                  <svg
                    className="w-4 h-4 text-[#2d6a4f]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  <span>Household, Retail &amp; Bulk Focus</span>
                </div>
              </div>
            </div>

            {/* Right Column: Grounded Info Card */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-gradient-to-br from-[#f7f2ea] to-[#ffffff] rounded-3xl p-6 sm:p-8 border border-[#e4dbcd] shadow-lg">
                <h3 className="font-serif text-xl font-bold text-[#1b4332] mb-4">
                  Rooted in Our Community
                </h3>
                <p className="text-sm text-[#4a5750] leading-relaxed mb-6">
                  We believe in growing sustainably with modest, authentic
                  values—focusing on quality food processing, clean handling,
                  and clear communication with every customer.
                </p>

                <div className="space-y-3.5 border-t border-[#e8dfd1] pt-5 text-xs sm:text-sm text-[#3f4e46]">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                    <span>
                      <strong>Regional Base:</strong> Sydapuram, Nellore
                      District, Andhra Pradesh
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                    <span>
                      <strong>Processing Model:</strong> Solar dehydration &amp;
                      careful preparation
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
                    <span>
                      <strong>Distribution:</strong> Serving household users,
                      retail stores and bulk buyers
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#e8dfd1]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2d6a4f] hover:text-[#1b4332] transition-colors"
                  >
                    <span>Have a question or requirement? Connect with us</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR FOCUS */}
      <section
        id="our-focus"
        aria-labelledby="our-focus-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Core Principles</span>
            </div>

            <h2
              id="our-focus-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              Our Focus
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              Four fundamental principles that guide our day-to-day processing
              and customer relationships.
            </p>
          </div>

          {/* 4 Value Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {focusCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-5 shadow-2xs">
                    {card.icon}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1b4332] leading-snug">
                    {card.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-[#4a5750] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-xs text-[#52796f] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Nela Kranthi Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section
        id="about-cta"
        aria-labelledby="about-cta-heading"
        className="py-16 sm:py-20 bg-[#1b4332] text-[#fcfaf6]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2d6a4f] text-emerald-200 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Connect &amp; Explore</span>
          </div>

          <h2
            id="about-cta-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Experience Natural Foods Processed With Care
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Browse our current selection of solar-dehydrated foods and natural
            powders, or speak with us directly for your custom or bulk
            requirements.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#fcfaf6] text-[#1b4332] font-semibold text-sm sm:text-base hover:bg-white transition-all shadow-md focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span>Explore Our Products</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent border border-emerald-300/40 text-white font-semibold text-sm sm:text-base hover:bg-[#2d6a4f] transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
            >
              <span>Contact Us</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
