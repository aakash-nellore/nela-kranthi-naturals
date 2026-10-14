import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Website Content | Admin | Nela Kranthi Naturals",
  description:
    "Administration overview for public website content sections, business narratives, and brand assets.",
};

const contentSections = [
  {
    id: "hero",
    title: "Homepage Hero & Brand Headline",
    route: "/",
    currentText:
      "Naturally Processed, Solar-Dehydrated Foods • Sourced from Sydapuram, Nellore",
    asset: "all images.jpeg (Supabase public-images bucket)",
    description:
      "Main landing banner displaying the natural harvest showcase, brand tagline, and immediate inquiry actions.",
  },
  {
    id: "about",
    title: "About Us & Sydapuram Heritage",
    route: "/about",
    currentText:
      "Rooted in Sydapuram, Nellore District — empowering local agriculture through sustainable solar dehydration.",
    asset: "image_96067187 (1).jpg (Supabase public-images bucket)",
    description:
      "Company story, agricultural roots, clean farming philosophy, and regional sourcing practices.",
  },
  {
    id: "solar",
    title: "Solar Dehydration Process Narrative",
    route: "/solar-dehydration",
    currentText:
      "Hygienic enclosed solar drying chambers preserving natural vitamins, authentic color, and intense aroma.",
    asset: "image_96067187.jpg (Supabase public-images bucket)",
    description:
      "Technical walkthrough of solar tunnel dehydration, hygiene standards, and zero-chemical dehydration benefits.",
  },
  {
    id: "contact",
    title: "Business Contact & Official Channels",
    route: "/contact",
    currentText: `${SITE_CONTACT.email} • ${SITE_CONTACT.phoneDisplay} • Sydapuram, Nellore District`,
    asset: "Nela kranthi Naturals logo.png (Supabase public-images bucket)",
    description:
      "Verified business contact telephone, WhatsApp order channel, official email address, and physical business location.",
  },
];

export default function AdminContentPage() {
  return (
    <main className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-[#eee7db]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Content Architecture</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b4332] tracking-tight">
            Website Content Overview
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#52796f] max-w-3xl">
            Audit and map out editable public website content sections. In upcoming phases, content updates will be editable directly from this portal.
          </p>
        </div>

        {/* Foundation Notice */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm">
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
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <div>
              <strong className="font-semibold text-amber-900">
                Content Management Architecture:
              </strong>{" "}
              The public website currently serves verified, statically optimized content across core landing pages. In <strong>Priority 5</strong>, database-backed site content tables will allow authorized administrators to revise headlines, copy, and brand assets dynamically.
            </div>
          </div>
        </div>

        {/* Content Section Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentSections.map((section) => (
            <div
              key={section.id}
              className="p-6 rounded-2xl bg-white border border-[#ded5c5] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h2 className="font-serif text-lg font-bold text-[#1b4332]">
                    {section.title}
                  </h2>
                  <span className="text-[11px] font-semibold text-[#2d6a4f] bg-[#e9f1ed] px-2.5 py-0.5 rounded-full border border-[#cfe1d7]">
                    Route: {section.route}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#3f4e46] mb-4 leading-relaxed">
                  {section.description}
                </p>

                <div className="p-3 rounded-xl bg-[#f8f5ee] border border-[#eee7db] text-xs space-y-2">
                  <div>
                    <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                      Current Content Sample:
                    </span>
                    <p className="text-[#52796f] mt-0.5 font-medium">
                      &ldquo;{section.currentText}&rdquo;
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#eee7db]">
                    <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                      Storage Asset Reference:
                    </span>
                    <p className="font-mono text-[11px] text-[#7d6c56] mt-0.5">
                      {section.asset}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#eee7db] flex items-center justify-between">
                <span className="text-xs text-[#7d6c56]">
                  Status: <strong className="text-emerald-700">Verified Live</strong>
                </span>
                <Link
                  href={section.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2d6a4f] hover:underline"
                >
                  <span>Preview Page</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
