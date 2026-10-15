import React from "react";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import { getAdminSession } from "@/lib/auth";

export const revalidate = 0; // Fresh server-side auth verification on every request

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side Data Access Layer (DAL) authentication & authorization check
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Admin Bar with Verified Admin Identity & Sign Out */}
      <div className="bg-[#122e22] text-[#f4efe6] px-4 py-2 border-b border-[#1b4332] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-white tracking-wide">
              Nela Kranthi Naturals Administration Portal
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[11px]">{session.email}</span>
            </div>
            <span className="text-emerald-400/50 hidden sm:inline">•</span>
            <AdminLogoutButton />
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <AdminNav />

      {/* Admin Content View */}
      <div className="flex-1">{children}</div>

      {/* Admin Dedicated Footer */}
      <footer className="border-t border-[#eee7db] bg-white py-3.5 px-4 text-center text-xs text-[#7d6c56]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Nela Kranthi Naturals Administration Portal • Sydapuram, Nellore</span>
          <span className="text-[11px] text-[#a39480]">Authorized internal use only</span>
        </div>
      </footer>
    </div>
  );
}
