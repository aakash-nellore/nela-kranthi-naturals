import type { Metadata } from "next";
import Link from "next/link";
import { getAllAdminProducts } from "@/lib/products";
import AdminProductsManager from "@/components/admin/AdminProductsManager";

export const revalidate = 0; // Dynamic server component for fresh admin view

export const metadata: Metadata = {
  title: "Admin Product Management | Nela Kranthi Naturals",
  description:
    "Administration portal for managing Nela Kranthi Naturals solar-dehydrated product catalogue and availability.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProductsPage() {
  const products = await getAllAdminProducts();

  return (
    <main className="min-h-screen bg-[#fcfaf6] py-10 sm:py-14 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Breadcrumb */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#7d6c56]">
            <Link
              href="/"
              className="text-[#2d6a4f] hover:underline font-medium"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="text-[#2d6a4f] hover:underline font-medium"
            >
              Public Catalogue
            </Link>
            <span>/</span>
            <span className="text-[#1b4332] font-semibold">Admin Products</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/products"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#ded5c5] bg-white text-xs font-semibold text-[#1b4332] hover:bg-[#f3ede3] transition-colors"
            >
              <span>View Live Catalogue</span>
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Administration Dashboard</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight">
            Product Management
          </h1>
          <p className="mt-2 text-base sm:text-lg text-[#3f4e46] max-w-3xl leading-relaxed">
            Manage catalogue records, categories, unit sizes, and availability status
            for Nela Kranthi Naturals.
          </p>
        </div>

        {/* Admin Product Manager Component */}
        <AdminProductsManager initialProducts={products} />
      </div>
    </main>
  );
}
