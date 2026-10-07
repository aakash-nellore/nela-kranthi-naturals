"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE_IMAGES } from "@/lib/images";

export interface BrandLogoProps {
  /**
   * Presentation variant:
   * - "navbar": Light background, optimized for main navigation bar
   * - "footer": Dark forest background, optimized for site footer
   */
  variant?: "navbar" | "footer";
  /**
   * Custom width & height for the logo image in pixels.
   * Defaults to 48px for navbar, 40px for footer.
   */
  size?: number;
  /**
   * Additional container CSS classes.
   */
  className?: string;
  /**
   * Whether to prioritize loading (recommended for above-the-fold navbar).
   */
  priority?: boolean;
  /**
   * Accessible text for the logo image. Defaults to "Nela Kranthi Naturals logo".
   */
  alt?: string;
  /**
   * Optional custom image source. Defaults to SITE_IMAGES.brandLogo.
   */
  src?: string;
}

export function BrandLogo({
  variant = "navbar",
  size,
  className = "",
  priority = false,
  alt = "Nela Kranthi Naturals logo",
  src,
}: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const logoSrc = src || SITE_IMAGES.brandLogo;

  const isFooter = variant === "footer";
  const defaultSize = isFooter ? 40 : 48;
  const imageDimension = size || defaultSize;

  const imageContainerClasses = isFooter
    ? "w-10 h-10 rounded-full shrink-0 shadow-sm transition-transform group-hover:scale-105"
    : "w-11 h-11 sm:w-12 sm:h-12 rounded-full shrink-0 shadow-xs transition-transform group-hover:scale-105";

  const imageClasses = isFooter
    ? "w-full h-full rounded-full object-contain ring-1 ring-white/10"
    : "w-full h-full rounded-full object-contain ring-1 ring-[#1b4332]/10";

  // Logo Graphic: Uploaded image with graceful fallback to leaf SVG icon
  const renderLogoGraphic = () => {
    if (!hasError && logoSrc) {
      return (
        <div className={imageContainerClasses}>
          <Image
            src={logoSrc}
            alt={alt}
            width={imageDimension}
            height={imageDimension}
            priority={priority}
            className={imageClasses}
            onError={() => setHasError(true)}
          />
        </div>
      );
    }

    // Graceful fallback: original leaf SVG icon circle if logo fails to load
    if (isFooter) {
      return (
        <div className="w-10 h-10 rounded-full bg-[#2d6a4f] text-[#fcfaf6] flex items-center justify-center shadow-sm shrink-0">
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>
      );
    }

    return (
      <div className="w-11 h-11 rounded-full bg-[#2d6a4f] flex items-center justify-center text-[#fcfaf6] shadow-sm transition-transform group-hover:scale-105 shrink-0">
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      </div>
    );
  };

  // Text Brand Name: Visible typography matching original brand identity
  const renderTextBrand = () => {
    if (isFooter) {
      return (
        <div className="flex flex-col">
          <span className="font-serif text-xl font-bold tracking-tight text-white leading-tight">
            Nela Kranthi
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-300/80">
            Naturals • Sydapuram
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1b4332] leading-tight">
          Nela Kranthi
        </span>
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#52796f]">
          Naturals • Sydapuram
        </span>
      </div>
    );
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {renderLogoGraphic()}
      {renderTextBrand()}
    </div>
  );
}

export default BrandLogo;
