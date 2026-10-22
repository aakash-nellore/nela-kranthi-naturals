import React from "react";
import Link from "next/link";

interface ValuePoint {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBoxClass: string;
}

const valuePoints: ValuePoint[] = [
  {
    id: "carefully-selected-produce",
    title: "Carefully Selected Produce",
    description:
      "We choose fresh fruits, vegetables, and greens to ensure dependable quality in every batch.",
    iconBoxClass: "bg-emerald-500/10 text-[#2d6a4f] border border-emerald-500/20",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7 20h10" />
        <path d="M12 20v-8" />
        <path d="M12 12c0-4.5 3.5-7 7-7-1 4-3.5 7-7 7Z" />
        <path d="M12 12c0-3.5-2.5-5.5-5-5.5.8 3 2.5 5.5 5 5.5Z" />
      </svg>
    ),
  },
  {
    id: "simple-natural-ingredients",
    title: "Simple, Natural Ingredients",
    description:
      "Our products contain pure dehydrated produce with no artificial colors or synthetic flavorings added.",
    iconBoxClass: "bg-[#2d6a4f]/10 text-[#2d6a4f] border border-[#2d6a4f]/20",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d6a4f]"
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
    id: "careful-quality-checks",
    title: "Careful Quality Checks",
    description:
      "Each batch undergoes thorough inspection during processing to maintain high hygiene and consistency.",
    iconBoxClass: "bg-[#1b4332]/10 text-[#1b4332] border border-[#1b4332]/20",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#1b4332]"
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
    id: "thoughtful-packing",
    title: "Thoughtful Packing",
    description:
      "Packaged securely to preserve natural aroma, texture, and convenient culinary freshness.",
    iconBoxClass: "bg-amber-600/10 text-amber-800 border border-amber-600/20",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 16l2 2 4-4" />
        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    id: "retail-bulk-enquiries",
    title: "Retail and Bulk Enquiries",
    description:
      "Supplying households, retailers, and food businesses with flexible packaging and reliable fulfilment.",
    iconBoxClass: "bg-[#2d6a4f]/10 text-[#2d6a4f] border border-[#2d6a4f]/20",
    icon: (
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6 text-[#2d6a4f]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.24-4.05a1 1 0 0 0-.78-.38H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="relative overflow-hidden py-12 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
    >
      {/* Background Decorative Accents for Refined Glassmorphism Depth */}
      <div
        className="absolute top-1/4 left-10 -z-10 w-72 h-72 rounded-full bg-emerald-100/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 -z-10 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Why Choose Us</span>
          </div>

          <h2
            id="why-choose-us-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
          >
            Natural Foods, Made With Care
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
            At Nela Kranthi Naturals, we focus on careful preparation, hygienic
            processing and thoughtful packaging to bring naturally dehydrated
            foods from our unit in Sydapuram, Nellore.
          </p>
        </div>

        {/* 5 Value Points Layout with Subtle Glassmorphism:
            - Mobile (<640px): 1 column for clean readability
            - Tablet (640px-1023px): 2 columns (Card 5 spans full width)
            - Desktop (1024px+): 6-column base grid (Top row: 3 cards x 2 cols; Bottom row: 2 cards x 3 cols)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {valuePoints.map((item, index) => {
            const desktopSpan =
              index < 3
                ? "lg:col-span-2"
                : "lg:col-span-3 sm:last:col-span-2 lg:last:col-span-3";

            return (
              <div
                key={item.id}
                className={`relative rounded-2xl p-5 sm:p-6 lg:p-7 bg-white/75 supports-[backdrop-filter]:bg-white/65 backdrop-blur-md border border-white/80 shadow-xs hover:bg-white/85 hover:border-[#2d6a4f]/35 hover:shadow-md transition-all duration-300 motion-reduce:transition-none flex flex-col justify-between ${desktopSpan}`}
              >
                <div>
                  {/* Icon Area with Refined Harmonious Accent */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3.5 sm:mb-5 shadow-2xs ${item.iconBoxClass}`}
                  >
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1b4332] leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-[#4a5750] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-5 sm:mt-6 pt-3 border-t border-[#f0eae0]/80 flex items-center gap-1.5 text-xs text-[#52796f] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Sydapuram Quality Promise</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 sm:mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
          >
            <span>Explore Our Products</span>
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
  );
}
