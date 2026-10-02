import React from "react";
import Link from "next/link";

interface HighlightItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const highlights: HighlightItem[] = [
  {
    id: "location",
    title: "Based in Sydapuram",
    description: "Nellore District, Andhra Pradesh",
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
  {
    id: "focus",
    title: "Natural Food Focus",
    description: "Fruits, vegetables, leafy greens and food powders",
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
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    id: "growth",
    title: "Growing With Care",
    description: "Focused on quality, hygiene and customer requirements",
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
];

export default function AboutPreview() {
  return (
    <section
      id="about-preview"
      aria-labelledby="about-preview-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#f7f2ea] border-b border-[#e8dfd1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Narrative Content & Highlights */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>About Nela Kranthi Naturals</span>
            </div>

            {/* Main Heading */}
            <h2
              id="about-preview-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight leading-tight"
            >
              Rooted in Nature. Growing With Purpose.
            </h2>

            {/* Narrative Paragraphs */}
            <div className="mt-6 space-y-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
              <p>
                Nela Kranthi Naturals is a natural-food processing business based
                in Sydapuram, Nellore, Andhra Pradesh. We focus on carefully
                processing fruits, vegetables, leafy greens and other food
                products through practical dehydration methods and thoughtful
                preparation.
              </p>
              <p>
                Our aim is to build a trusted local food business that connects
                naturally processed products with households, retailers, food
                businesses and bulk buyers.
              </p>
            </div>

            {/* 3 Core Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {highlights.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 sm:p-5 border border-[#e8dfd1] shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-[#2d6a4f]/10 flex items-center justify-center mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#1b4332] leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-[#52796f] leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Link */}
            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
              >
                <span>Know More About Us</span>
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

          {/* Right Column: Visual Showcase Placeholder */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="rounded-3xl bg-white border border-[#e4dbcd] p-6 sm:p-8 shadow-xl overflow-hidden">
                {/* Header within Card */}
                <div className="flex items-center justify-between border-b border-[#f0eae0] pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#2d6a4f] text-[#fcfaf6] flex items-center justify-center font-serif font-bold text-sm">
                      NK
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
                        Nela Kranthi Naturals
                      </p>
                      <p className="text-[11px] text-[#52796f]">
                        Sydapuram Processing Unit
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f]">
                    Nellore Dist.
                  </span>
                </div>

                {/* 
                  VISUAL PLACEHOLDER CONTAINER:
                  Ready to be replaced with <Image src="/images/about/sydapuram-unit.jpg" alt="Nela Kranthi Naturals Sydapuram Unit" fill className="object-cover" />
                  when physical business photography is added to /public.
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
                    Local Natural Food Business
                  </p>
                  <p className="text-xs text-[#52796f] max-w-xs mt-1">
                    Sydapuram, Nellore District, Andhra Pradesh
                  </p>
                  <p className="mt-3 text-[11px] font-medium text-[#7d6c56] bg-white px-3 py-1 rounded-full border border-[#ded5c5]">
                    Facility Photography Ready
                  </p>
                </div>

                {/* Bottom Trust Row */}
                <div className="mt-5 pt-4 border-t border-[#f0eae0] flex items-center justify-between text-xs text-[#52796f]">
                  <span>Serving Retail &amp; Bulk</span>
                  <span className="font-semibold text-[#1b4332]">
                    Thoughtful Preparation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
