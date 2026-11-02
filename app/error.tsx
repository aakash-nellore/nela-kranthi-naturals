"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error securely without exposing sensitive internals to the user
    console.error("Infrastructure or application error:", error.message);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#fcfaf6] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#e8dfd1] shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto mb-5 font-serif font-bold text-2xl">
          !
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b4332]">
          Temporarily Unavailable
        </h1>
        <p className="mt-3 text-sm text-[#3f4e46] leading-relaxed">
          We are experiencing a temporary connection issue while loading the product catalogue. Please try again shortly.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-full bg-[#2d6a4f] text-white font-semibold text-sm hover:bg-[#1b4332] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-full border border-[#cfe1d7] text-[#1b4332] font-semibold text-sm hover:bg-[#e9f1ed] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

