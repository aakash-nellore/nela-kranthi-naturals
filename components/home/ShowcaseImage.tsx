"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ShowcaseImageProps {
  src?: string | null;
  alt: string;
  title: string;
  subtitle: string;
  badgeText: string;
  priority?: boolean;
  aspectRatioClass?: string;
  sizes?: string;
  icon?: "leaf" | "solar";
  bgClass?: string;
  borderClass?: string;
  badgeBgClass?: string;
}

export default function ShowcaseImage({
  src,
  alt,
  title,
  subtitle,
  badgeText,
  priority = false,
  aspectRatioClass = "aspect-4/3",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px",
  icon = "leaf",
  bgClass = "bg-[#efe7db]",
  borderClass = "border-[#ded4c3]",
  badgeBgClass = "bg-[#f8f5ee]",
}: ShowcaseImageProps) {
  const cleanSrc =
    typeof src === "string" && src.trim().length > 0 ? src.trim() : null;

  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [altAttempted, setAltAttempted] = useState<Record<string, boolean>>({});

  // Derive alternative candidate (e.g. %20.jpg -> .jpg, or .jpg -> .jpeg)
  let alternativeCandidate: string | null = null;
  if (cleanSrc) {
    if (cleanSrc.includes("%20.jpg")) {
      alternativeCandidate = cleanSrc.replace("%20.jpg", ".jpg");
    } else if (cleanSrc.endsWith(".jpg")) {
      alternativeCandidate = cleanSrc.replace(/\.jpg$/, ".jpeg");
    } else if (cleanSrc.endsWith(".jpeg")) {
      alternativeCandidate = cleanSrc.replace(/\.jpeg$/, ".jpg");
    }
  }

  // Determine current active URL to attempt
  const hasPrimaryFailed = cleanSrc ? Boolean(failedUrls[cleanSrc]) : false;
  const shouldUseAlt = Boolean(
    cleanSrc &&
      hasPrimaryFailed &&
      alternativeCandidate &&
      altAttempted[cleanSrc] &&
      !failedUrls[alternativeCandidate]
  );

  const activeSrc = shouldUseAlt
    ? alternativeCandidate
    : !hasPrimaryFailed
    ? cleanSrc
    : null;

  const handleImageError = () => {
    if (!cleanSrc) return;

    if (!hasPrimaryFailed) {
      setFailedUrls((prev) => ({ ...prev, [cleanSrc]: true }));
      if (alternativeCandidate && !altAttempted[cleanSrc]) {
        setAltAttempted((prev) => ({ ...prev, [cleanSrc]: true }));
      }
    } else if (alternativeCandidate) {
      setFailedUrls((prev) => ({ ...prev, [alternativeCandidate]: true }));
    }
  };

  // Real Image: Render Next.js Image when an active source is present and hasn't failed
  if (activeSrc) {
    return (
      <div
        className={`relative w-full ${aspectRatioClass} rounded-2xl overflow-hidden border ${borderClass} ${bgClass} shadow-2xs group`}
      >
        <Image
          src={activeSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={handleImageError}
        />
      </div>
    );
  }

  // Graceful Fallback Placeholder: Matches existing visual design with zero layout shift
  return (
    <div
      className={`relative w-full ${aspectRatioClass} rounded-2xl ${bgClass} border ${borderClass} flex flex-col items-center justify-center p-6 text-center overflow-hidden group`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#2d6a4f] text-[#fcfaf6] flex items-center justify-center mb-3 shadow-md">
        {icon === "leaf" ? (
          <svg
            className="w-9 h-9"
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
        ) : (
          <svg
            className="w-9 h-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        )}
      </div>

      <p className="font-serif font-bold text-lg text-[#1b4332]">{title}</p>
      <p className="text-xs text-[#52796f] max-w-xs mt-1">{subtitle}</p>
      <p
        className={`mt-3 text-[11px] font-medium text-[#7d6c56] ${badgeBgClass} px-3 py-1 rounded-full border border-[#ded5c5]`}
      >
        {badgeText}
      </p>
    </div>
  );
}
