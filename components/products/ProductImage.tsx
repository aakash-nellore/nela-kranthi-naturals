"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductImageProps {
  src?: string | null;
  alt?: string;
  productName: string;
  variant?: "card" | "detail";
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  productName,
  variant = "card",
  priority = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  // Normalize image source: verify non-empty string
  const cleanSrc = typeof src === "string" && src.trim().length > 0 ? src.trim() : null;

  // Alt text based on product name
  const imageAlt =
    alt || `${productName} - Solar-Dehydrated Natural Food Product by Nela Kranthi Naturals`;

  // If a valid image URL is provided and has not failed loading, render Next.js Image
  if (cleanSrc && !hasError) {
    if (variant === "detail") {
      return (
        <div className="relative aspect-4/3 w-full rounded-2xl bg-gradient-to-br from-[#f8f5ee] to-[#ece3d4] border border-[#ded5c5] overflow-hidden group">
          <Image
            src={cleanSrc}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setHasError(true)}
          />
        </div>
      );
    }

    // Default "card" variant
    return (
      <div className="relative aspect-4/3 w-full bg-gradient-to-br from-[#f8f5ee] to-[#ece3d4] border-b border-[#eee7db] overflow-hidden group">
        <Image
          src={cleanSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Fallback: Elegant visual placeholder when image is null, empty, or fails to load
  if (variant === "detail") {
    return (
      <div className="relative aspect-4/3 w-full rounded-2xl bg-gradient-to-br from-[#f8f5ee] to-[#ece3d4] border border-[#ded5c5] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
        {/* Decorative radial gradient */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-100/40 via-transparent to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Botanical Icon Treatment */}
        <div className="w-20 h-20 rounded-3xl bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center mb-4 shadow-2xs">
          <svg
            className="w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>

        <p className="font-serif font-bold text-xl text-[#1b4332]">{productName}</p>
        <p className="text-xs text-[#52796f] max-w-xs mt-1">
          Solar-Dehydrated Natural Food Product
        </p>
        <p className="mt-4 text-[11px] font-medium text-[#7d6c56] bg-white/90 px-3.5 py-1.5 rounded-full border border-[#ded5c5]">
          Official Product Photograph Ready
        </p>
      </div>
    );
  }

  // Card Variant Fallback
  return (
    <div className="relative aspect-4/3 w-full bg-gradient-to-br from-[#f8f5ee] to-[#ece3d4] flex flex-col items-center justify-center p-6 border-b border-[#eee7db] overflow-hidden">
      {/* Decorative subtle sunbeam background element */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Botanical / Leaf Icon treatment */}
      <div className="w-14 h-14 rounded-2xl bg-[#2d6a4f]/10 text-[#2d6a4f] flex items-center justify-center transition-transform group-hover:scale-105 duration-200 shadow-2xs">
        <svg
          className="w-7 h-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>

      {/* Organic Solar Dehydrated Tag */}
      <span className="mt-3 text-[11px] font-medium tracking-wide uppercase text-[#52796f] bg-white/80 px-2.5 py-0.5 rounded-full border border-[#ded5c5]">
        Solar Dehydrated
      </span>
    </div>
  );
}
