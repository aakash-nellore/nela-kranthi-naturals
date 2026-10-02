import React from "react";
import Link from "next/link";
import { Product } from "@/types";
import ProductImage from "@/components/products/ProductImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Category badge color schemes
  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Fruit Powders":
        return "bg-amber-50 text-amber-900 border-amber-200/80";
      case "Leaf Powders":
        return "bg-emerald-50 text-emerald-900 border-emerald-200/80";
      case "Vegetable Powders":
        return "bg-lime-50 text-lime-900 border-lime-200/80";
      case "Dehydrated Foods":
        return "bg-orange-50 text-orange-900 border-orange-200/80";
      default:
        return "bg-[#e9f1ed] text-[#1b4332] border-[#cfe1d7]";
    }
  };

  return (
    <article className="flex flex-col bg-white rounded-2xl border border-[#e8dfd1] shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Product Image with Real Photo Support & Fallback Placeholder */}
      <ProductImage
        src={product.image}
        alt={`${product.name} - Solar Dehydrated Powder`}
        productName={product.name}
        variant="card"
      />

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between">
        <div>
          {/* Category & Availability Badge */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
                product.category
              )}`}
            >
              {product.category}
            </span>

            {product.available ? (
              <span className="text-[11px] font-medium text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                In Stock
              </span>
            ) : (
              <span className="text-[11px] font-medium text-stone-500">
                Seasonal
              </span>
            )}
          </div>

          {/* Product Name */}
          <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1b4332] group-hover:text-[#2d6a4f] transition-colors leading-snug">
            {product.name}
          </h2>

          {/* Short Description */}
          <p className="mt-2 text-sm text-[#4a5750] leading-relaxed line-clamp-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Card Footer: Pack Unit & Inquiry CTA */}
        <div className="mt-5 pt-4 border-t border-[#f0eae0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-[#7d6c56] uppercase tracking-wider">
              Available Units
            </span>
            <span className="text-xs font-semibold text-[#1b4332]">
              {product.unit}
            </span>
          </div>

          <Link
            href={`/contact?inquiry=${encodeURIComponent(product.name)}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#2d6a4f] text-[#fcfaf6] text-xs font-semibold hover:bg-[#1b4332] transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
            aria-label={`View or inquire about ${product.name}`}
          >
            <span>View Product</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
