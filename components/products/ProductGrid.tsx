"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Product, ProductCategory } from "@/types";
import { CATEGORIES } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "All">("All");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }
    return products.filter((item) => item.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="w-full">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        <nav
          className="inline-flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#f3ede3] border border-[#e4dbcd]"
          aria-label="Filter products by category"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f] ${
                  isSelected
                    ? "bg-[#2d6a4f] text-[#fcfaf6] shadow-xs"
                    : "text-[#4a5750] hover:text-[#1b4332] hover:bg-[#e9e1d3]"
                }`}
                aria-pressed={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Results Count & Current Active Filter Summary */}
      <div className="mt-6 mb-8 flex items-center justify-between text-xs sm:text-sm text-[#52796f] border-b border-[#e8dfd1] pb-3">
        <p>
          Showing{" "}
          <strong className="font-semibold text-[#1b4332]">
            {filteredProducts.length}
          </strong>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}{" "}
          {selectedCategory !== "All" && (
            <span>
              in{" "}
              <span className="font-medium text-[#2d6a4f]">
                {selectedCategory}
              </span>
            </span>
          )}
        </p>

        {selectedCategory !== "All" && (
          <button
            type="button"
            onClick={() => setSelectedCategory("All")}
            className="text-xs text-[#2d6a4f] hover:underline font-medium focus-visible:outline-2 focus-visible:outline-[#2d6a4f] rounded-xs"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty / Upcoming Category State (e.g., Dehydrated Foods) */
        <div className="rounded-3xl bg-[#f7f2ea] border border-[#e4dbcd] p-10 sm:p-14 text-center max-w-xl mx-auto my-12">
          <div className="w-14 h-14 rounded-full bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.75"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1b4332]">
            Upcoming Specialty Harvest
          </h3>
          <p className="mt-2 text-sm text-[#4a5750] leading-relaxed">
            Our solar-dehydrated specialty foods (such as sun-cured prawns, dry
            mutton, and dehydrated fish) are currently being prepared under
            hygienic seasonal batches.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact?inquiry=Upcoming%20Dehydrated%20Foods"
              className="px-5 py-2.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] text-xs font-semibold hover:bg-[#1b4332] transition-colors"
            >
              Inquire for Pre-orders
            </Link>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="px-5 py-2.5 rounded-full bg-white border border-[#ded5c5] text-[#2d6a4f] text-xs font-semibold hover:bg-[#f3ede3] transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
