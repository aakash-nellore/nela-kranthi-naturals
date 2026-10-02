/**
 * Site-wide Image Configuration for Nela Kranthi Naturals
 *
 * 1. Product Images:
 *    Stored in Supabase Storage (`product-images` bucket) and referenced via
 *    the `products.image_url` column in Supabase.
 *    See `lib/products.ts` for product image URL resolution.
 *
 * 2. Homepage & Business Photographs:
 *    For static business photographs, place them in `public/images/` and specify
 *    their paths below (e.g. "/images/hero-harvest-showcase.jpg").
 *    Remote Supabase Storage URLs (https://*.supabase.co/...) are also supported.
 */

export const SITE_IMAGES = {
  /**
   * Homepage Hero — "Natural Harvest Showcase"
   * Section: components/home/HeroSection.tsx
   * Recommended file: public/images/hero-harvest-showcase.jpg
   */
  heroHarvestShowcase: process.env.NEXT_PUBLIC_IMAGE_HERO_SHOWCASE || "",

  /**
   * Homepage About Preview — "Local Natural Food Business"
   * Section: components/home/AboutPreview.tsx
   * Recommended file: public/images/sydapuram-facility.jpg
   */
  aboutBusinessFacility: process.env.NEXT_PUBLIC_IMAGE_ABOUT_FACILITY || "",

  /**
   * Solar Dehydration Section & Process Page — Facility / Chamber Image
   * Sections: components/home/SolarDehydration.tsx & app/solar-dehydration/page.tsx
   * Recommended file: public/images/solar-dehydration.jpg
   */
  solarDehydrationProcess: process.env.NEXT_PUBLIC_IMAGE_SOLAR_PROCESS || "",
} as const;
