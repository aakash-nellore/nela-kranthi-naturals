import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";
import { Product, ProductCategory } from "@/types";
import { products as fallbackProducts, CATEGORIES } from "@/data/products";

export { CATEGORIES };

export interface SupabaseProductRow {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image_url: string | null;
  unit: string | null;
  is_active: boolean;
  created_at?: string;
}

/**
 * Resolves a product image candidate.
 * Supports:
 * 1. Full remote URLs (e.g. https://*.supabase.co/storage/v1/object/public/product-images/banana-powder.jpg)
 * 2. Bare filenames from Supabase Storage 'product-images' bucket (e.g. banana-powder.jpg)
 * 3. Bucket-relative paths (e.g. product-images/banana-powder.jpg or /storage/v1/object/public/product-images/...)
 * 4. Local files in /public (only if they exist on disk)
 *
 * If null, empty, unuploaded, or not found, returns "" so ProductImage renders
 * the graceful fallback placeholder without layout shift or broken image errors.
 */
export function resolveProductImage(imageUrl?: string | null): string {
  if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.trim()) {
    return "";
  }
  const trimmed = imageUrl.trim();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");

  // Handle Supabase dashboard preview links if copied accidentally
  if (trimmed.includes("supabase.com/dashboard/project/") && trimmed.includes("preview=") && supabaseUrl) {
    try {
      const parsedUrl = new URL(trimmed);
      const preview = parsedUrl.searchParams.get("preview");
      if (preview) {
        return `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(preview)}`;
      }
    } catch {
      // Fall through
    }
  }

  // 1. Remote HTTP/HTTPS URL (e.g. Supabase Storage bucket)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // 2. Relative Supabase Storage path starting with /storage/ or storage/
  if (trimmed.startsWith("/storage/v1/object/public/") && supabaseUrl) {
    return `${supabaseUrl}${trimmed}`;
  }
  if (trimmed.startsWith("storage/v1/object/public/") && supabaseUrl) {
    return `${supabaseUrl}/${trimmed}`;
  }

  // 3. Bucket-relative path (e.g. "product-images/banana-powder.jpg" or "/product-images/banana-powder.jpg")
  if (trimmed.replace(/^\//, "").startsWith("product-images/") && supabaseUrl) {
    const cleanPath = trimmed.replace(/^\//, "");
    return `${supabaseUrl}/storage/v1/object/public/${cleanPath}`;
  }

  // 4. Bare filename uploaded to the 'product-images' bucket (e.g. "banana-powder.jpg")
  if (!trimmed.includes("/") && supabaseUrl && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(trimmed)) {
    return `${supabaseUrl}/storage/v1/object/public/product-images/${trimmed}`;
  }

  // 5. Local public path (e.g. /images/products/banana-powder.jpg)
  if (trimmed.startsWith("/")) {
    try {
      const publicFilePath = path.join(process.cwd(), "public", trimmed);
      if (fs.existsSync(publicFilePath)) {
        return trimmed;
      }
      return "";
    } catch {
      return "";
    }
  }

  return "";
}

/**
 * Maps a row from public.products table to the application's Product interface.
 * Preserves existing types and cleanly fills any optional properties.
 */
export function mapSupabaseRowToProduct(row: SupabaseProductRow): Product {
  const localMatch = fallbackProducts.find((p) => p.slug === row.slug);

  const rawImage = row.image_url || localMatch?.image || "";

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category as ProductCategory,
    shortDescription:
      localMatch?.shortDescription ||
      (row.description.length > 120
        ? `${row.description.slice(0, 117)}...`
        : row.description),
    description: row.description,
    image: resolveProductImage(rawImage),
    unit: row.unit || localMatch?.unit || "100g / 250g / 500g",
    available: row.is_active,
  };
}

/**
 * Fetches all active products from Supabase.
 * If Supabase is unavailable, errors, or returns no records, falls back gracefully to local product data.
 */
export async function getAllProducts(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("name", { ascending: true });

      if (error) {
        console.error("Supabase error fetching products:", error.message);
      } else if (data && data.length > 0) {
        return (data as SupabaseProductRow[]).map(mapSupabaseRowToProduct);
      }
    } catch (err) {
      console.error("Unexpected error reading products from Supabase:", err);
    }
  }

  // Graceful fallback to local products if Supabase returned 0 rows or is offline
  return fallbackProducts.filter((p) => p.available);
}

/**
 * Fetches all products (including inactive products) for admin management.
 * Falls back gracefully to local products if Supabase query fails or returns empty.
 */
export async function getAllAdminProducts(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Supabase error fetching admin products:", error.message);
      } else if (data && data.length > 0) {
        return (data as SupabaseProductRow[]).map(mapSupabaseRowToProduct);
      }
    } catch (err) {
      console.error("Unexpected error reading admin products from Supabase:", err);
    }
  }

  return fallbackProducts;
}

/**
 * Fetches a single active product by its unique slug.
 * Returns null if not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) return null;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error(`Supabase error fetching product "${slug}":`, error.message);
      } else if (data) {
        return mapSupabaseRowToProduct(data as SupabaseProductRow);
      }
    } catch (err) {
      console.error(`Unexpected error fetching product "${slug}" from Supabase:`, err);
    }
  }

  // Graceful fallback to local products
  const localMatch = fallbackProducts.find((p) => p.slug === slug && p.available);
  return localMatch || null;
}

/**
 * Fetches all active products in a specific category.
 */
export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  const allProducts = await getAllProducts();
  return allProducts.filter((p) => p.category === category);
}
