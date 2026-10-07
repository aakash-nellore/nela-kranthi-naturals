import React from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";

export default async function FeaturedProducts() {
  const allProducts = await getAllProducts();

  // Select the 4 featured products requested
  const featuredSlugs = [
    "banana-powder",
    "moringa-powder",
    "curry-leaves-powder",
    "papaya-powder",
  ];

  const featuredProducts = featuredSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is (typeof allProducts)[0] => Boolean(p));

  const displayProducts =
    featuredProducts.length > 0 ? featuredProducts : allProducts.slice(0, 4);

  return (
    <section
      id="featured-products"
      aria-labelledby="featured-products-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#fcfaf6] border-b border-[#e8dfd1]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Pure &amp; Solar-Dehydrated</span>
          </div>

          <h2
            id="featured-products-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight"
          >
            Our Natural Products
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
            Naturally processed fruits, vegetables, leafy greens and food
            powders, made with care from Sydapuram, Nellore.
          </p>
        </div>

        {/* Responsive Product Cards Grid (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm sm:text-base hover:bg-[#1b4332] transition-all shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d6a4f]"
          >
            <span>View All Products</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
