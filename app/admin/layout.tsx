import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: {
    default: "Admin Portal | Nela Kranthi Naturals",
    template: "%s | Admin | Nela Kranthi Naturals",
  },
  description:
    "Administration portal for managing Nela Kranthi Naturals solar-dehydrated products, catalogue availability, and content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col bg-[#fcfaf6]">
      {/* Top Admin Notice Bar */}
      <div className="bg-[#122e22] text-[#f4efe6] px-4 py-2 border-b border-[#1b4332] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white tracking-wide">
              Nela Kranthi Naturals Administration Portal
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-emerald-200/90">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1b4332] border border-[#2d6a4f]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Foundation Mode (Read-Only)</span>
            </span>
            <span className="hidden md:inline text-emerald-300/60">•</span>
            <span className="hidden md:inline">Supabase RLS Protected</span>
          </div>
        </div>
      </div>

      {/* Admin Sub-navigation Bar */}
      <AdminNav />

      {/* Admin Content Area */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
