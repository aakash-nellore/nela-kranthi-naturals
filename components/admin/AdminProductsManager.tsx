"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import ProductTable from "@/components/admin/ProductTable";
import ProductModal from "@/components/admin/ProductModal";

interface AdminProductsManagerProps {
  initialProducts: Product[];
}

export default function AdminProductsManager({
  initialProducts,
}: AdminProductsManagerProps) {
  const [products] = useState<Product[]>(initialProducts);
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

  // Metrics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.available).length;
  const uniqueCategories = new Set(products.map((p) => p.category)).size;

  return (
    <div className="space-y-8">
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
                  Admin Security Status: Foundation Mode
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900">
                  Write-Locked
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-amber-900/90 leading-relaxed max-w-3xl">
                This administration interface operates in read-only foundation mode.
                Public and anonymous clients are restricted from executing INSERT, UPDATE, or DELETE operations by PostgreSQL Row Level Security (RLS).
                Before production deployment of write features, Supabase Authentication and server-side admin authorization must be configured.
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
            <span className="text-xs text-[#52796f] font-medium">8 Seeded</span>
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
              100% Active
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
            <span className="text-xs text-[#52796f] font-medium">3 of 4 active</span>
          </div>
          <p className="mt-1 text-[11px] text-[#7d6c56]">
            Fruit, Leaf, Veg, Dehydrated
          </p>
        </div>

        {/* Security Policy */}
        <div className="p-5 rounded-3xl bg-white border border-[#ded5c5] shadow-2xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7d6c56]">
            Security Policy
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-serif text-2xl font-bold text-[#1b4332]">
              RLS Read-Only
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
      />
    </div>
  );
}
