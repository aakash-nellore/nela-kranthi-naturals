"use client";

import React, { useTransition } from "react";
import { logoutAdminAction } from "@/lib/auth-actions";

export default function AdminLogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAdminAction();
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-1 min-h-[44px] sm:min-h-0 rounded-full bg-[#1b4332] hover:bg-[#2d6a4f] text-emerald-200 hover:text-white border border-[#2d6a4f] text-xs sm:text-[11px] font-semibold transition-colors disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-white"
      title="Sign out of administration session"
      aria-label="Sign out of administrator session"
    >
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
        />
      </svg>
      <span>{isPending ? "Signing out..." : "Sign Out"}</span>
    </button>
  );
}
