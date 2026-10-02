"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, ProductCategory } from "@/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onAdd: () => void;
}

const CATEGORIES: (ProductCategory | "All")[] = [
  "All",
  "Fruit Powders",
  "Leaf Powders",
  "Vegetable Powders",
  "Dehydrated Foods",
];

export default function ProductTable({
  products,
  onEdit,
  onAdd,
}: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Fruit Powders":
        return "bg-amber-50 text-amber-900 border-amber-200";
      case "Leaf Powders":
        return "bg-emerald-50 text-emerald-900 border-emerald-200";
      case "Vegetable Powders":
        return "bg-lime-50 text-lime-900 border-lime-200";
      case "Dehydrated Foods":
        return "bg-orange-50 text-orange-900 border-orange-200";
      default:
        return "bg-[#e9f1ed] text-[#1b4332] border-[#cfe1d7]";
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#ded5c5] shadow-xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-5 sm:p-6 border-b border-[#eee7db] bg-[#fcfaf6] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or slug..."
              className="w-full pl-9 pr-4 py-2 rounded-full border border-[#ded5c5] bg-white text-xs sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
            />
            <svg
              className="w-4 h-4 text-[#7d6c56] absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as ProductCategory | "All")
              }
              className="px-3.5 py-2 rounded-full border border-[#ded5c5] bg-white text-xs sm:text-sm text-[#1b4332] focus:border-[#2d6a4f] focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>

            {(searchQuery || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-xs text-[#2d6a4f] hover:underline font-medium px-2 py-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Add Product Button */}
        <div>
          <button
            type="button"
            onClick={onAdd}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] text-xs sm:text-sm font-semibold hover:bg-[#1b4332] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Table Results Count Bar */}
      <div className="px-6 py-2.5 bg-[#fdfbf7] border-b border-[#eee7db] text-xs text-[#7d6c56] flex items-center justify-between">
        <span>
          Showing{" "}
          <strong className="font-semibold text-[#1b4332]">
            {filteredProducts.length}
          </strong>{" "}
          of {products.length} products
        </span>
        <span className="text-[11px] font-medium text-[#2d6a4f]">
          Supabase Products Catalogue
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#eee7db] bg-[#f8f5ee]/70 text-[11px] font-bold uppercase tracking-wider text-[#52796f]">
              <th scope="col" className="py-3.5 px-6">
                Product Name
              </th>
              <th scope="col" className="py-3.5 px-6">
                Category
              </th>
              <th scope="col" className="py-3.5 px-6">
                Unit Packaging
              </th>
              <th scope="col" className="py-3.5 px-6">
                Status
              </th>
              <th scope="col" className="py-3.5 px-6 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eee7db] text-xs sm:text-sm">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#fcfaf6] transition-colors"
                >
                  {/* Name & Slug */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center shrink-0">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-serif font-bold text-[#1b4332] text-sm sm:text-base">
                          {product.name}
                        </p>
                        <p className="font-mono text-[11px] text-[#7d6c56] mt-0.5">
                          /{product.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
                        product.category
                      )}`}
                    >
                      {product.category}
                    </span>
                  </td>

                  {/* Unit */}
                  <td className="py-4 px-6 text-[#3f4e46] whitespace-nowrap font-medium">
                    {product.unit}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {product.available ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="px-3 py-1.5 rounded-lg border border-[#ded5c5] bg-white text-xs font-semibold text-[#1b4332] hover:bg-[#f3ede3] transition-colors focus-visible:outline-2 focus-visible:outline-[#2d6a4f]"
                      >
                        Edit
                      </button>

                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-[#7d6c56] hover:text-[#1b4332] hover:bg-[#f3ede3] transition-colors focus-visible:outline-2 focus-visible:outline-[#2d6a4f]"
                        title="View public page"
                      >
                        <svg
                          className="w-4 h-4"
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#7d6c56]">
                  <p className="font-serif text-base font-bold text-[#1b4332]">
                    No products matched your search.
                  </p>
                  <p className="text-xs text-[#52796f] mt-1">
                    Try clearing filters or search queries.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
