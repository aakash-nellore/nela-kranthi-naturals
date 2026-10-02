import React from "react";
import Link from "next/link";

interface ValuePoint {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const valuePoints: ValuePoint[] = [
  {
    id: "natural-processing",
    title: "Natural Processing",
    description:
      "We focus on simple, natural processing methods for fruits, vegetables, leafy greens and food powders.",
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
    id: "solar-dehydration",
    title: "Solar Dehydration",
    description:
      "Our solar dehydration process helps transform fresh produce into convenient dehydrated foods.",
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
    id: "careful-preparation",
    title: "Careful Preparation",
    description:
      "Fresh produce is cleaned and prepared carefully before the dehydration process.",
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
    id: "quality-focused",
    title: "Quality-Focused",
    description:
      "Products are checked during processing and prepared carefully before packing.",
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
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: "local-growing",
    title: "Local & Growing",
    description:
      "Based in Sydapuram, Nellore, we are building a natural-food business focused on quality and customer requirements.",
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

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-choose-us-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* 5 Value Points Layout:
            - Mobile: 1 column
            - Tablet: 2 columns
            - Desktop: 6-column base grid (Top row: 3 cards x 2 cols; Bottom row: 2 cards x 3 cols)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
          {valuePoints.map((item, index) => {
            // First 3 items span 2 cols on desktop; last 2 items span 3 cols on desktop
            const desktopSpan =
              index < 3
                ? "lg:col-span-2"
                : "lg:col-span-3 sm:last:col-span-2 lg:last:col-span-3";

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200 flex flex-col justify-between ${desktopSpan}`}
              >
                <div>
                  {/* Icon Area */}
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center mb-5 shadow-2xs">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-[#1b4332] leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-sm text-[#4a5750] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-xs text-[#52796f] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                  <span>Sydapuram Quality Promise</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
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
