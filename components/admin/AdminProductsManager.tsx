"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import ProductTable from "@/components/admin/ProductTable";
import ProductModal from "@/components/admin/ProductModal";

interface AdminProductsManagerProps {
  initialProducts: Product[];
  error?: string | null;
}

export default function AdminProductsManager({
  initialProducts,
  error,
}: AdminProductsManagerProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductSaved = (savedProduct: Product) => {
    setProducts((prev) => {
      const existsIndex = prev.findIndex(
        (p) => p.id === savedProduct.id || p.slug === savedProduct.slug
      );
      if (existsIndex !== -1) {
        const next = [...prev];
        next[existsIndex] = savedProduct;
        return next;
      }
      return [savedProduct, ...prev];
    });
  };

  // Dynamic Metrics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.available).length;
  const draftProducts = products.filter((p) => !p.available).length;
  const uniqueCategories = new Set(products.map((p) => p.category)).size;
  const activePercent =
    totalProducts > 0
      ? `${Math.round((activeProducts / totalProducts) * 100)}% Active`
      : "0% Active";

  return (
    <div className="space-y-8">
      {/* Catalogue Synchronization / Error Alert */}
      {error && (
        <div
          id="admin-products-error"
          role="alert"
          className="rounded-3xl bg-rose-50 border border-rose-200/90 p-6 sm:p-7 text-rose-950 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
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
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-rose-950">
                  Catalogue Synchronization Alert
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 border border-rose-300">
                  Action Required
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-rose-900/90 leading-relaxed max-w-3xl">
                {error}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="/admin/products"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-900 text-rose-50 text-xs font-semibold hover:bg-rose-950 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  <span>Retry Connection</span>
                </a>
                <span className="text-xs text-rose-800">
                  If your role was recently updated, please sign out and sign in again.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Architecture & Auth Notice Banner */}
      <div className="rounded-3xl bg-amber-50/90 border border-amber-200/90 p-6 sm:p-7 text-amber-950 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0">
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
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-amber-950">
                  Admin Security Status: Authenticated DAL Guard
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Server Guard Active
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-amber-900/90 leading-relaxed max-w-3xl">
                Product mutations are executed through server-side actions guarded by <code>requireAdminSession()</code>.
                Production database writes and draft inspection require executing the least-privilege RLS migration script (<code>scripts/enable-admin-product-management-rls.sql</code>) in the Supabase Dashboard SQL Editor.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-amber-900 border border-amber-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Catalogue Read: Active
            </span>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products */}
        <div className="p-5 rounded-3xl bg-white border border-[#ded5c5] shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
            Total In Database
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-serif text-3xl font-bold text-[#1b4332]">
              {totalProducts}
            </p>
            <span className="text-xs text-[#52796f] font-medium">
              {draftProducts > 0 ? `${draftProducts} Drafts` : "All Published"}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#7d6c56]">
            Managed via public.products
          </p>
        </div>

        {/* Active Products */}
        <div className="p-5 rounded-3xl bg-white border border-[#ded5c5] shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
            Active in Public Site
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-serif text-3xl font-bold text-[#2d6a4f]">
              {activeProducts}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              {activePercent}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#7d6c56]">
            Displayed at /products
          </p>
        </div>

        {/* Categories */}
        <div className="p-5 rounded-3xl bg-white border border-[#ded5c5] shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
            Categories
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-serif text-3xl font-bold text-[#1b4332]">
              {uniqueCategories}
            </p>
            <span className="text-xs text-[#52796f] font-medium">
              {uniqueCategories} of 6 populated
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#7d6c56]">
            6 defined categories in taxonomy
          </p>
        </div>

        {/* Security Policy */}
        <div className="p-5 rounded-3xl bg-white border border-[#ded5c5] shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
            Security Policy
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-serif text-2xl font-bold text-[#1b4332]">
              RLS Protected
            </p>
          </div>
          <p className="mt-1 text-[11px] text-[#7d6c56]">
            Anon writes blocked by default
          </p>
        </div>
      </div>

      {/* Main Interactive Product Table */}
      <ProductTable
        products={products}
        onEdit={handleOpenEdit}
        onAdd={handleOpenAdd}
      />

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onSaved={handleProductSaved}
      />
    </div>
  );
}
