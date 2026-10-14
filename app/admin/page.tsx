import type { Metadata } from "next";
import Link from "next/link";
import { getAllAdminProducts } from "@/lib/products";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Dashboard | Admin | Nela Kranthi Naturals",
  description:
    "Administration overview dashboard for Nela Kranthi Naturals product catalogue, website content, and system status.",
};

export default async function AdminDashboardPage() {
  const products = await getAllAdminProducts();

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.available).length;
  const draftProducts = products.filter((p) => !p.available).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  return (
    <main className="py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#eee7db]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
              <span>Admin Dashboard</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1b4332] tracking-tight">
              Overview & Content Management
            </h1>
            <p className="mt-1 text-sm sm:text-base text-[#52796f]">
              Welcome to the Nela Kranthi Naturals portal. Manage catalogue records and prepare website updates.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] text-xs sm:text-sm font-semibold hover:bg-[#1b4332] transition-colors shadow-xs"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Manage Products</span>
            </Link>
          </div>
        </div>

        {/* Security & Authentication Notice */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200/90 p-5 sm:p-6 text-amber-950">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-amber-950">
                    Phase: Priority 3 — Admin Panel Foundation
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Read-Only Mode
                  </span>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-amber-900/90 leading-relaxed max-w-3xl">
                  The dashboard architecture is established. Direct write operations to PostgreSQL are protected by Supabase Row Level Security (RLS). Admin authentication and session management will be activated in <strong>Priority 4</strong>.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-amber-900 border border-amber-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync Active
              </span>
            </div>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <section aria-labelledby="metrics-heading">
          <h2 id="metrics-heading" className="sr-only">
            Catalogue Summary Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Total Products */}
            <div className="p-5 rounded-2xl bg-white border border-[#ded5c5] shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
                  Total Products
                </p>
                <div className="w-8 h-8 rounded-lg bg-[#e9f1ed] text-[#2d6a4f] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="font-serif text-3xl font-bold text-[#1b4332]">
                  {totalProducts}
                </p>
                <Link
                  href="/admin/products"
                  className="text-xs text-[#2d6a4f] hover:underline font-medium"
                >
                  View catalogue →
                </Link>
              </div>
              <p className="mt-1 text-[11px] text-[#7d6c56]">
                Stored in Supabase `products`
              </p>
            </div>

            {/* Published Products */}
            <div className="p-5 rounded-2xl bg-white border border-[#ded5c5] shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
                  Published Products
                </p>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="font-serif text-3xl font-bold text-[#2d6a4f]">
                  {publishedProducts}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Active
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#7d6c56]">
                Live on public website (/products)
              </p>
            </div>

            {/* Draft Products */}
            <div className="p-5 rounded-2xl bg-white border border-[#ded5c5] shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
                  Draft Products
                </p>
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-600 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="font-serif text-3xl font-bold text-[#1b4332]">
                  {draftProducts}
                </p>
                <span className="text-xs text-[#7d6c56] font-medium">
                  {draftProducts === 0 ? "0 unpublished" : `${draftProducts} hidden`}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#7d6c56]">
                Hidden from public visitors
              </p>
            </div>

            {/* Categories */}
            <div className="p-5 rounded-2xl bg-white border border-[#ded5c5] shadow-xs">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
                  Active Categories
                </p>
                <div className="w-8 h-8 rounded-lg bg-[#f8f5ee] text-[#1b4332] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <p className="font-serif text-3xl font-bold text-[#1b4332]">
                  {categoriesCount}
                </p>
                <span className="text-xs text-[#52796f] font-medium">
                  Fruit, Leaf, Veg
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#7d6c56]">
                4 defined in taxonomy
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation Cards */}
        <section aria-labelledby="sections-heading">
          <h2
            id="sections-heading"
            className="font-serif text-lg font-bold text-[#1b4332] mb-4"
          >
            Management Sections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Products Section Card */}
            <Link
              href="/admin/products"
              className="group p-6 rounded-2xl bg-white border border-[#ded5c5] hover:border-[#2d6a4f] shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e9f1ed] text-[#2d6a4f] group-hover:bg-[#2d6a4f] group-hover:text-white transition-colors flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors">
                  Product Catalogue
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#52796f] leading-relaxed">
                  Manage product names, slugs, category taxonomy, packaging units, descriptions, and public visibility.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#2d6a4f] group-hover:translate-x-1 transition-transform">
                <span>Open product management</span>
                <span>→</span>
              </div>
            </Link>

            {/* Website Content Section Card */}
            <Link
              href="/admin/content"
              className="group p-6 rounded-2xl bg-white border border-[#ded5c5] hover:border-[#2d6a4f] shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e9f1ed] text-[#2d6a4f] group-hover:bg-[#2d6a4f] group-hover:text-white transition-colors flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors">
                  Website Content
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#52796f] leading-relaxed">
                  Review and configure static content sections: Homepage Showcase, About Us origin, and Solar Dehydration narrative.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#2d6a4f] group-hover:translate-x-1 transition-transform">
                <span>View content sections</span>
                <span>→</span>
              </div>
            </Link>

            {/* Settings Section Card */}
            <Link
              href="/admin/settings"
              className="group p-6 rounded-2xl bg-white border border-[#ded5c5] hover:border-[#2d6a4f] shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e9f1ed] text-[#2d6a4f] group-hover:bg-[#2d6a4f] group-hover:text-white transition-colors flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors">
                  System & Settings
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#52796f] leading-relaxed">
                  Verify Supabase project integration, storage bucket availability, and security authorization boundaries.
                </p>
              </div>
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#2d6a4f] group-hover:translate-x-1 transition-transform">
                <span>Inspect settings</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Recently Updated Products Snapshot */}
        <section aria-labelledby="recent-products-heading">
          <div className="flex items-center justify-between mb-4">
            <h2
              id="recent-products-heading"
              className="font-serif text-lg font-bold text-[#1b4332]"
            >
              Current Products Snapshot
            </h2>
            <Link
              href="/admin/products"
              className="text-xs font-semibold text-[#2d6a4f] hover:underline"
            >
              Full Catalogue Table ({products.length}) →
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#ded5c5] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#eee7db] bg-[#f8f5ee]/70 text-[11px] font-bold uppercase tracking-wider text-[#52796f]">
                    <th scope="col" className="py-3 px-5">Product</th>
                    <th scope="col" className="py-3 px-5">Category</th>
                    <th scope="col" className="py-3 px-5">Unit Packaging</th>
                    <th scope="col" className="py-3 px-5">Status</th>
                    <th scope="col" className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee7db] text-xs sm:text-sm">
                  {products.length > 0 ? (
                    products.slice(0, 5).map((product) => (
                      <tr key={product.id} className="hover:bg-[#fcfaf6] transition-colors">
                        <td className="py-3.5 px-5">
                          <p className="font-serif font-bold text-[#1b4332]">
                            {product.name}
                          </p>
                          <p className="font-mono text-[11px] text-[#7d6c56]">
                            /{product.slug}
                          </p>
                        </td>
                        <td className="py-3.5 px-5 whitespace-nowrap text-[#3f4e46]">
                          {product.category}
                        </td>
                        <td className="py-3.5 px-5 whitespace-nowrap text-[#3f4e46]">
                          {product.unit}
                        </td>
                        <td className="py-3.5 px-5 whitespace-nowrap">
                          {product.available ? (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                          <Link
                            href="/admin/products"
                            className="text-xs font-semibold text-[#2d6a4f] hover:underline px-2 py-1"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-[#7d6c56] hover:text-[#1b4332] px-2 py-1"
                          >
                            Live ↗
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-[#7d6c56] text-xs">
                        No product records available in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {products.length > 5 && (
              <div className="p-3 bg-[#fdfbf7] border-t border-[#eee7db] text-center">
                <Link
                  href="/admin/products"
                  className="text-xs font-semibold text-[#2d6a4f] hover:underline"
                >
                  View all {products.length} products in Product Manager →
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
