import React from "react";
import Link from "next/link";
import { SITE_IMAGES } from "@/lib/images";
import ShowcaseImage from "@/components/home/ShowcaseImage";

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-b from-[#fcfaf6] via-[#f7f2ea] to-[#fcfaf6] py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#e8dfd1]"
    >
      {/* Background Decorative Accents */}
      <div
        className="absolute top-0 right-1/4 -z-10 w-96 h-96 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 -z-10 w-80 h-80 rounded-full bg-amber-100/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Copy, Location Badge, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Location & Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs sm:text-sm font-medium mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2d6a4f] shrink-0" />
              <span>Made with care in Sydapuram, Nellore, Andhra Pradesh</span>
            </div>

            {/* Main Headings */}
            <h1
              id="hero-heading"
              className="tracking-tight text-[#1b4332] font-serif font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.15]"
            >
              <span className="block">Pure Nature&apos;s Goodness</span>
              <span className="block font-sans text-2xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#386641] mt-2 sm:mt-3 leading-tight">
                Healthy Choices for Better Tomorrow
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#3f4e46] leading-relaxed max-w-2xl font-normal">
              Premium solar-dehydrated fruits, vegetables, leafy greens and
              natural food powders, carefully processed for quality, flavor and
              convenience.
            </p>

            {/* Value Proposition Pills */}
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-[#2d6a4f]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffffff] border border-[#e3dcd1] font-medium shadow-2xs">
                <svg
                  className="w-4 h-4 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                Solar Dehydrated
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffffff] border border-[#e3dcd1] font-medium shadow-2xs">
                <svg
                  className="w-4 h-4 text-[#2d6a4f]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Carefully Processed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffffff] border border-[#e3dcd1] font-medium shadow-2xs">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
                Nutrient &amp; Flavor Intact
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              {/* Primary CTA */}
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-base hover:bg-[#1b4332] transition-all shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
              >
                <span>Explore Products</span>
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

              {/* Secondary CTA */}
              <Link
                href="/bulk-orders"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-transparent border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold text-base hover:bg-[#e9f1ed] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
              >
                <span>Bulk / Wholesale Enquiry</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase / Placeholder Area */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Showcase Card */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#ffffff] to-[#f4ede3] border border-[#e3dcd1] p-6 sm:p-8 shadow-xl overflow-hidden">
                {/* Decorative Sun & Leaf Badge */}
                <div className="flex items-center justify-between border-b border-[#eadecb] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-[#2d6a4f]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#1b4332]">
                        Solar Processing
                      </p>
                      <p className="text-[11px] text-[#52796f]">
                        Hygienic Dehydration
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#e9f1ed] text-[#2d6a4f]">
                    Sydapuram Unit
                  </span>
                </div>

                {/* Real Photograph Showcase with Graceful Placeholder Fallback */}
                <ShowcaseImage
                  src={SITE_IMAGES.heroHarvestShowcase}
                  alt="Natural Harvest Showcase - Solar-Dehydrated Fruits, Farm Greens & Natural Powders by Nela Kranthi Naturals"
                  title="Natural Harvest Showcase"
                  subtitle="Solar-Dehydrated Fruits, Farm Greens & Natural Powders"
                  badgeText="Product Photography Ready"
                  icon="leaf"
                  bgClass="bg-[#efe7db]"
                  borderClass="border-[#ded4c3]"
                  badgeBgClass="bg-[#f8f5ee]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
                  priority
                />

                {/* Categories Grid Preview */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#e5dcd0] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs font-medium text-[#2d6a4f]">
                      Dried Fruits
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#e5dcd0] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span className="text-xs font-medium text-[#2d6a4f]">
                      Dehydrated Veggies
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#e5dcd0] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-[#2d6a4f]">
                      Leafy Greens
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-[#e5dcd0] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-700" />
                    <span className="text-xs font-medium text-[#2d6a4f]">
                      Natural Powders
                    </span>
                  </div>
                </div>

                {/* Bottom Trust Note */}
                <div className="mt-4 pt-3 border-t border-[#eadecb] flex items-center justify-between text-xs text-[#52796f]">
                  <span>Flavor &amp; Aroma Retained</span>
                  <span className="font-semibold text-[#1b4332]">
                    Hygienic Solar Units
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
