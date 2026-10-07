/**
 * Site-wide Image Configuration for Nela Kranthi Naturals
 *
 * 1. Product Images:
 *    Stored in Supabase Storage (`product-images` bucket) and referenced via
 *    the `products.image_url` column in Supabase.
 *    See `lib/products.ts` for product image URL resolution.
 *
 * 2. Homepage & Business Photographs:
 *    Loaded from Supabase Storage (`public-images` bucket) using the pattern:
 *    `${NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/public-images/<encoded-filename>`
 */

const SUPABASE_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL || ""
).trim().replace(/\/$/, "");

/**
 * Builds the public Supabase Storage URL for a given filename in the `public-images` bucket.
 * Properly URL-encodes the filename (e.g. spaces become %20).
 */
export function buildPublicStorageUrl(filename: string): string {
  if (!SUPABASE_URL || !filename.trim()) return "";
  let resolvedFilename = filename.trim();
  // Resolve exact uploaded logo filename to bucket object if extension was omitted
  if (resolvedFilename === "Nela kranthi Naturals logo") {
    resolvedFilename = "Nela kranthi Naturals logo.png";
  }
  return `${SUPABASE_URL}/storage/v1/object/public/public-images/${encodeURIComponent(resolvedFilename)}`;
}

export const BRAND_LOGO_FILENAME = "Nela kranthi Naturals logo";

export const SITE_IMAGES = {
  /**
   * Official Brand Identity Logo
   * Sections: components/layout/Navbar.tsx & components/layout/Footer.tsx
   * File in bucket `public-images`: `Nela kranthi Naturals logo` (`Nela kranthi Naturals logo.png`)
   */
  brandLogo:
    process.env.NEXT_PUBLIC_IMAGE_BRAND_LOGO ||
    buildPublicStorageUrl("Nela kranthi Naturals logo"),

  /**
   * Homepage Hero — "Natural Harvest Showcase"
   * Section: components/home/HeroSection.tsx
   * File in bucket `public-images`: `all images.jpeg` (also aliases `all images.jpg`)
   */
  heroHarvestShowcase:
    process.env.NEXT_PUBLIC_IMAGE_HERO_SHOWCASE ||
    buildPublicStorageUrl("all images.jpeg"),

  /**
   * Homepage About Preview — "Local Natural Food Business"
   * Section: components/home/AboutPreview.tsx
   * File in bucket `public-images`: `image_96067187 (1).jpg`
   */
  aboutBusinessFacility:
    process.env.NEXT_PUBLIC_IMAGE_ABOUT_FACILITY ||
    buildPublicStorageUrl("image_96067187 (1).jpg"),

  /**
   * Solar Dehydration Section & Process Page — Facility / Chamber Image
   * Sections: components/home/SolarDehydration.tsx & app/solar-dehydration/page.tsx
   * File in bucket `public-images`: `image_96067187.jpg` (also aliases `image_96067187 .jpg`)
   */
  solarDehydrationProcess:
    process.env.NEXT_PUBLIC_IMAGE_SOLAR_PROCESS ||
    buildPublicStorageUrl("image_96067187.jpg"),
} as const;
