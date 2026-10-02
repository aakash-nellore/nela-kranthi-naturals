import React from "react";
import Link from "next/link";
import { SITE_IMAGES } from "@/lib/images";
import ShowcaseImage from "@/components/home/ShowcaseImage";

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    step: "01",
    title: "Fresh Produce",
    description: "Carefully selected fruits, vegetables and leafy greens.",
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
    description: "Produce is cleaned and prepared before dehydration.",
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
      "Prepared produce is gently dehydrated using our solar drying process.",
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
    title: "Quality Check",
    description:
      "Dehydrated products are checked for quality before packing.",
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
      "Finished products are packed carefully for storage and delivery.",
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

export default function SolarDehydration() {
  return (
    <section
      id="solar-dehydration"
      aria-labelledby="solar-dehydration-heading"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#f7f2ea] to-[#fcfaf6] border-b border-[#e8dfd1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Hygienic Preparation Process</span>
          </div>

          <h2
            id="solar-dehydration-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
          >
            Naturally Dried, With Care
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
            Our solar dehydration process helps us transform carefully selected
            fresh produce into convenient, naturally processed foods while
            maintaining a clean and hygienic preparation process.
          </p>
        </div>

        {/* Real Solar Dehydration Process Photograph (rendered when configured) */}
        {SITE_IMAGES.solarDehydrationProcess ? (
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <ShowcaseImage
              src={SITE_IMAGES.solarDehydrationProcess}
              alt="Solar Dehydration Processing Unit and Hygiene Standards at Nela Kranthi Naturals, Sydapuram"
              title="Solar Dehydration Chamber"
              subtitle="Controlled Solar Drying Facility, Sydapuram Unit"
              badgeText="Process Photography Ready"
              icon="solar"
              aspectRatioClass="aspect-16/9 sm:aspect-21/9"
              sizes="(max-width: 1024px) 100vw, 896px"
              bgClass="bg-[#efe7db]"
              borderClass="border-[#ded5c5]"
              badgeBgClass="bg-white"
            />
          </div>
        ) : null}

        {/* 5-Step Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 items-stretch">
          {steps.map((item) => (
            <div
              key={item.step}
              className="flex flex-col justify-between bg-white rounded-2xl p-6 border border-[#e8dfd1] shadow-2xs hover:shadow-md hover:border-[#2d6a4f]/40 transition-all duration-200"
            >
              <div>
                {/* Step Top Bar: Icon & Step Number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#2d6a4f]/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f] border border-[#cfe1d7]">
                    {item.step}
                  </span>
                </div>

                {/* Step Title */}
                <h3 className="font-serif text-lg font-bold text-[#1b4332] leading-snug">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-[#4a5750] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Subtle Step Indicator */}
              <div className="mt-6 pt-3 border-t border-[#f0eae0] flex items-center gap-1.5 text-[11px] font-medium text-[#7d6c56]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
                <span>Step {item.step}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/solar-dehydration"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
          >
            <span>Learn About Our Process</span>
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
