import type { Metadata } from "next";
import { SITE_CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Settings | Admin | Nela Kranthi Naturals",
  description:
    "System integration status, database parameters, and security policies for Nela Kranthi Naturals admin portal.",
};

export default function AdminSettingsPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "Configured in environment";

  return (
    <main className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-[#eee7db]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>System Settings</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b4332] tracking-tight">
            Portal & Integration Settings
          </h1>
          <p className="mt-1 text-sm sm:text-base text-[#52796f] max-w-3xl">
            Audit connected database infrastructure, storage buckets, security parameters, and business communication channels.
          </p>
        </div>

        {/* Integration Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supabase Database Connection */}
          <div className="p-6 rounded-2xl bg-white border border-[#ded5c5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1b4332]">
                Database Infrastructure
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Connected
              </span>
            </div>

            <div className="text-xs sm:text-sm space-y-3 text-[#3f4e46]">
              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Provider:
                </span>
                <p className="font-medium text-[#52796f] mt-0.5">
                  Supabase PostgreSQL (Cloud Hosted)
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Project Host:
                </span>
                <p className="font-mono text-xs text-[#7d6c56] mt-0.5 break-all">
                  {supabaseUrl}
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Primary Table:
                </span>
                <p className="font-mono text-xs text-[#7d6c56] mt-0.5">
                  public.products (RLS Read-Only Enforced)
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Client Key Scope:
                </span>
                <p className="text-xs text-[#52796f] mt-0.5">
                  Public Anonymous Key (Least-privilege; service-role keys are strictly excluded)
                </p>
              </div>
            </div>
          </div>

          {/* Storage Buckets Configuration */}
          <div className="p-6 rounded-2xl bg-white border border-[#ded5c5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1b4332]">
                Supabase Storage Buckets
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Configured
              </span>
            </div>

            <div className="text-xs sm:text-sm space-y-3 text-[#3f4e46]">
              <div className="p-3 rounded-xl bg-[#f8f5ee] border border-[#eee7db]">
                <span className="font-semibold text-[#1b4332] block text-xs">
                  `product-images` (Public Bucket)
                </span>
                <p className="text-xs text-[#52796f] mt-1 leading-relaxed">
                  Hosts catalogue imagery (Banana Flour, Moringa, Pappaya, Curry leaf, etc.). Managed through the admin product interface.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f8f5ee] border border-[#eee7db]">
                <span className="font-semibold text-[#1b4332] block text-xs">
                  `public-images` (Public Bucket)
                </span>
                <p className="text-xs text-[#52796f] mt-1 leading-relaxed">
                  Hosts brand assets: official brand logo (`Nela kranthi Naturals logo.png`), hero harvest showcase, and facility photographs.
                </p>
              </div>
            </div>
          </div>

          {/* Security & Auth Boundary (Priority 4 Roadmap) */}
          <div className="p-6 rounded-2xl bg-white border border-[#ded5c5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1b4332]">
                Authentication & Security Posture
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold">
                Priority 4 (Next)
              </span>
            </div>

            <div className="text-xs sm:text-sm space-y-2 text-[#3f4e46]">
              <p className="leading-relaxed">
                Current mode: <strong>Foundation Mode</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#52796f]">
                <li>Search engine indexing blocked via <code>robots.txt</code> (`Disallow: /admin`)</li>
                <li>Anonymous writes blocked via PostgreSQL Row Level Security (RLS)</li>
                <li>Zero hardcoded admin credentials or mock accounts</li>
                <li>Supabase Auth admin sessions will be implemented next in Priority 4</li>
              </ul>
            </div>
          </div>

          {/* Official Business Information */}
          <div className="p-6 rounded-2xl bg-white border border-[#ded5c5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-[#1b4332]">
                Official Business Identifiers
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                Verified
              </span>
            </div>

            <div className="text-xs sm:text-sm space-y-2.5 text-[#3f4e46]">
              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Brand Name:
                </span>
                <p className="font-medium text-[#1b4332] mt-0.5">{SITE_CONTACT.brandName}</p>
              </div>

              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Official Business Email:
                </span>
                <p className="font-mono text-xs text-[#2d6a4f] mt-0.5 font-semibold">
                  {SITE_CONTACT.email}
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Business Telephone & WhatsApp:
                </span>
                <p className="font-mono text-xs text-[#2d6a4f] mt-0.5 font-semibold">
                  {SITE_CONTACT.phoneDisplay}
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#1b4332] block text-[11px] uppercase tracking-wider">
                  Origin / Facility Location:
                </span>
                <p className="text-xs text-[#52796f] mt-0.5">
                  Sydapuram, Nellore District, Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
