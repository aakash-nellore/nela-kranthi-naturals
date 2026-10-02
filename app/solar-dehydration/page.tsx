import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solar Dehydration Process",
  description:
    "Learn about the solar dehydration and hygienic food preparation process used by Nela Kranthi Naturals in Sydapuram, Nellore, Andhra Pradesh.",
  openGraph: {
    title: "Solar Dehydration Process | Nela Kranthi Naturals",
    description:
      "Learn about the solar dehydration and hygienic food preparation process used by Nela Kranthi Naturals in Sydapuram, Nellore, Andhra Pradesh.",
    url: "/solar-dehydration",
  },
};

interface ProcessStage {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processStages: ProcessStage[] = [
  {
    step: "01",
    title: "Fresh Produce",
    description:
      "Selected fruits, vegetables and leafy greens are prepared for processing.",
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
      "Produce is cleaned and prepared appropriately before dehydration.",
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
      "Selected products are gently processed using a solar dehydration method.",
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
    description:
      "Products are checked during processing and before packing.",
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
      "Processed products are carefully packed for storage and delivery.",
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

interface WhyPoint {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const whyPoints: WhyPoint[] = [
  {
    id: "practical-transformation",
    title: "Practical Food Transformation",
    description:
      "Solar dehydration helps transform carefully chosen fresh produce into convenient dehydrated products for practical everyday use.",
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
        <path d="M20 7h-9" />
        <path d="M14 17H5" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
      </svg>
    ),
  },
  {
    id: "thoughtful-processing",
    title: "Thoughtful & Natural Approach",
    description:
      "Using gentle solar drying allows us to process foods without relying on artificial additives or unnecessary chemical treatments.",
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
    id: "convenient-usability",
    title: "Convenient Storage & Usability",
    description:
      "Dehydrated products are easier to store, manage, and use across households, culinary preparations, and commercial kitchens.",
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
      </svg>
    ),
  },
  {
    id: "local-processing",
    title: "Focused Local Handling",
    description:
      "Processing produce directly at our Sydapuram unit enables close oversight and care at each step of the drying sequence.",
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
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

interface SuitableProductCategory {
  id: string;
  name: string;
  description: string;
  items: string[];
}

const suitableCategories: SuitableProductCategory[] = [
  {
    id: "fruits",
    name: "Fruits",
    description:
      "Selected seasonal and regional fruits suitable for gentle dehydration into powders or cuts.",
    items: ["Banana", "Papaya", "Mango", "Pineapple", "Lemon"],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    description:
      "Carefully washed and sliced vegetables prepared for consistent drying and culinary use.",
    items: ["Ladyfinger / Okra", "Tomato", "Beetroot", "Seasonal Vegetables"],
  },
  {
    id: "leafy-greens",
    name: "Leafy Greens",
    description:
      "Tender greens harvested and dried with care to retain authentic color, aroma, and texture.",
    items: ["Moringa", "Curry Leaves", "Traditional Greens"],
  },
  {
    id: "food-powders",
    name: "Food Powders",
    description:
      "Pure milled powders derived from dried fruits, vegetables, and leaves for instant recipes.",
    items: ["Single-Ingredient Powders", "Cooking Blends", "Natural Seasonings"],
  },
  {
    id: "selected-dehydrated-foods",
    name: "Selected Dehydrated Foods",
    description:
      "Specialty dehydrated food items and dried cuts tailored for prolonged usability and storage.",
    items: ["Dried Fruit Slices", "Dehydrated Veg Cuts", "Custom Batches"],
  },
];

export default function SolarDehydrationPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf6]">
      {/* PAGE HEADER / INTRO */}
      <section
        aria-labelledby="solar-page-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Heading & Introduction */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                <span>Practical Processing • Sydapuram, Nellore</span>
              </div>

              <h1
                id="solar-page-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight"
              >
                Solar Dehydration Process
              </h1>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
                <p>
                  At Nela Kranthi Naturals, we use practical dehydration
                  methods to process selected fruits, vegetables, leafy greens
                  and other food products with care.
                </p>
                <p>
                  Our unit in Sydapuram, Nellore District, is focused on
                  thoughtful preparation, hygienic handling, and disciplined
                  solar drying to deliver natural, carefully prepared foods for
                  household, retail, and bulk requirements.
                </p>
              </div>

              {/* Process Highlights Bar */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="bg-white rounded-xl p-4 border border-[#e8dfd1] shadow-2xs">
                  <p className="text-xs uppercase font-bold tracking-wider text-[#52796f]">
                    Energy Source
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#1b4332] mt-1">
                    Solar Drying
                  </p>
                  <p className="text-xs text-[#7d6c56] mt-0.5">
                    Gentle Dehydration
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#e8dfd1] shadow-2xs">
                  <p className="text-xs uppercase font-bold tracking-wider text-[#52796f]">
                    Standards
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#1b4332] mt-1">
                    Hygienic Handling
                  </p>
                  <p className="text-xs text-[#7d6c56] mt-0.5">
                    Careful Checking
                  </p>
                </div>

                <div className="bg-white rounded-xl p-4 border border-[#e8dfd1] shadow-2xs">
                  <p className="text-xs uppercase font-bold tracking-wider text-[#52796f]">
                    Scope
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#1b4332] mt-1">
                    Diverse Produce
                  </p>
                  <p className="text-xs text-[#7d6c56] mt-0.5">
                    Seasonal Availability
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Local Placeholder Visual (Solar Dryer / Process) */}
            <div className="lg:col-span-5 w-full">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl bg-white border border-[#e4dbcd] p-6 sm:p-8 shadow-xl overflow-hidden">
                  {/* Card Header */}
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
                          Solar Dehydration Unit
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f]">
                      Sydapuram
                    </span>
                  </div>

                  {/* 
                    VISUAL PLACEHOLDER CONTAINER:
                    Ready to be replaced with:
                    <Image src="/images/process/solar-dehydration-unit.jpg" alt="Solar Dehydration Processing Unit at Sydapuram" fill className="object-cover" />
                    when official photographs of the solar dryer / dehydration facility are added to /public.
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
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                      </svg>
                    </div>

                    <p className="font-serif font-bold text-lg text-[#1b4332]">
                      Solar Dehydration Chamber
                    </p>
                    <p className="text-xs text-[#52796f] max-w-xs mt-1">
                      Controlled Solar Drying Facility, Sydapuram Unit
                    </p>
                    <p className="mt-3 text-[11px] font-medium text-[#7d6c56] bg-white px-3 py-1 rounded-full border border-[#ded5c5]">
                      Process Photography Ready
                    </p>
                  </div>

                  {/* Card Bottom Metadata */}
                  <div className="mt-5 pt-4 border-t border-[#f0eae0] flex items-center justify-between text-xs text-[#52796f]">
                    <span>Clean Enclosed Unit</span>
                    <span className="font-semibold text-[#1b4332]">
                      Modest &amp; Practical
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION — HOW OUR PROCESS WORKS */}
      <section
        id="how-our-process-works"
        aria-labelledby="how-our-process-works-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Five Systematic Stages</span>
            </div>

            <h2
              id="how-our-process-works-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              How Our Process Works
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              We guide produce through five practical stages to ensure clean,
              careful processing from receipt to dispatch.
            </p>
          </div>

          {/* 5 Stages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-stretch">
            {processStages.map((stage) => (
              <div
                key={stage.step}
                className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                      {stage.icon}
                    </div>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f] border border-[#cfe1d7]">
                      {stage.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#1b4332] leading-snug">
                    {stage.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#4a5750] leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-[11px] font-medium text-[#7d6c56]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Stage {stage.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION — WHY SOLAR DEHYDRATION? */}
      <section
        id="why-solar-dehydration"
        aria-labelledby="why-solar-dehydration-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Practical Benefits</span>
            </div>

            <h2
              id="why-solar-dehydration-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              Why Solar Dehydration?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              Solar dehydration provides a practical, natural method to
              transform fresh produce into convenient dehydrated products while
              supporting thoughtful food processing and long-term usability.
            </p>
          </div>

          {/* 4 Clean Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyPoints.map((point) => (
              <div
                key={point.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-5 shadow-2xs">
                    {point.icon}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1b4332] leading-snug">
                    {point.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-[#4a5750] leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-xs text-[#52796f] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Practical Processing</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION — PRODUCTS SUITABLE FOR DEHYDRATION */}
      <section
        id="products-suitable-for-dehydration"
        aria-labelledby="suitable-products-heading"
        className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Suitable Categories</span>
            </div>

            <h2
              id="suitable-products-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
            >
              Products Suitable for Dehydration
            </h2>

            {/* Availability Notice */}
            <div className="mt-5 max-w-2xl mx-auto bg-[#f7f2ea] rounded-xl p-4 border border-[#e8dfd1] text-sm text-[#3f4e46] leading-relaxed shadow-2xs">
              <p className="font-medium text-[#1b4332]">
                Our range includes selected fruits, vegetables, leafy greens and
                other food products depending on availability and processing
                requirements.
              </p>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {suitableCategories.map((category, index) => {
              const spanClass =
                index === 3 || index === 4 ? "lg:col-span-1" : "";

              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between ${spanClass}`}
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
                      Common varieties:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#f4efe6] text-[#1b4332] border border-[#e8dfd1]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Link to catalogue */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
            >
              <span>Browse Products Catalogue</span>
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

      {/* CTA SECTION */}
      <section
        id="solar-cta"
        aria-labelledby="solar-cta-heading"
        className="py-16 sm:py-20 bg-[#1b4332] text-[#fcfaf6]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2d6a4f] text-emerald-200 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Connect &amp; Inquire</span>
          </div>

          <h2
            id="solar-cta-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Explore Dehydrated Foods Prepared With Care
          </h2>

          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
            Discover our range of solar-dehydrated foods and natural powders, or
            reach out directly to discuss household, retail, or bulk processing
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
