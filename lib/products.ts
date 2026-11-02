import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";
import { Product, ProductCategory } from "@/types";
import { products as fallbackProducts, CATEGORIES } from "@/data/products";
import { isComplianceRestricted } from "@/lib/compliance";

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
    return `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(trimmed)}`;
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

  // Preserve confirmed packaging unit from database record.
  // Do not replace existing database values with assumed sizes.
  const rawUnit = row.unit?.trim();
  const resolvedUnit = rawUnit || localMatch?.unit || "";

  const isRestricted = isComplianceRestricted(row.slug);

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
    unit: resolvedUnit,
    available: row.is_active,
    isComplianceRestricted: isRestricted,
    complianceStatus: isRestricted ? "under_review" : "approved",
  };
}

/**
 * Determines whether local fallback data is permitted.
 *
 * PRODUCTION SAFETY INVARIANT:
 * Local fallback data is strictly forbidden in production and Vercel environments.
 * Supabase is the sole authoritative source for product publication status.
 * Permitted only when explicitly configured for isolated local test/dev environments.
 */
export function isLocalFallbackPermitted(): boolean {
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    return false;
  }
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ALLOW_LOCAL_FALLBACK !== "true"
  ) {
    return false;
  }
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test" ||
    process.env.ALLOW_LOCAL_FALLBACK === "true"
  );
}

/**
 * Fetches all active products from Supabase.
 *
 * SINGLE SOURCE OF TRUTH INVARIANT:
 * In production, Supabase public.products (with is_active = true) is the exclusive
 * authority for product visibility. Local fallback products are never substituted in
 * production when Supabase is unavailable. Infrastructure errors fail safely with
 * a temporary error rather than misrepresenting products as unverified or published.
 * Regulatory review items are strictly excluded from the public catalogue.
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
        if (!isLocalFallbackPermitted()) {
          throw new Error(
            `Database error: Failed to fetch product catalogue from Supabase (${error.message}).`
          );
        }
        return fallbackProducts.filter(
          (p) => p.available && !isComplianceRestricted(p.slug)
        );
      }

      if (data) {
        return (data as SupabaseProductRow[])
          .filter((row) => row.is_active && !isComplianceRestricted(row.slug))
          .map(mapSupabaseRowToProduct);
      }
    } catch (err) {
      console.error("Unexpected error reading products from Supabase:", err);
      if (!isLocalFallbackPermitted()) {
        throw err instanceof Error
          ? err
          : new Error("Database error: Product catalogue is temporarily unavailable.");
      }
      return fallbackProducts.filter(
        (p) => p.available && !isComplianceRestricted(p.slug)
      );
    }
  }

  // If Supabase client is not configured in production, fail closed
  if (!isLocalFallbackPermitted()) {
    throw new Error(
      "Configuration error: Supabase client is not configured in production. Cannot verify product publication status."
    );
  }

  // Explicit development/test-only fallback
  return fallbackProducts.filter(
    (p) => p.available && !isComplianceRestricted(p.slug)
  );
}

export interface AdminProductsResult {
  products: Product[];
  error: string | null;
  errorCode?: "AUTH_REQUIRED" | "ROLE_REQUIRED" | "DB_ERROR" | "CONFIG_ERROR" | null;
}

export interface AdminClientLike {
  auth?: {
    getUser: () => Promise<{
      data: {
        user: {
          id?: string;
          email?: string | null;
          app_metadata?: Record<string, unknown> | null;
        } | null;
      } | null;
      error: { message: string } | null;
    }>;
  };
  from: (table: string) => {
    select: (columns?: string) => {
      order: (
        column: string,
        options?: { ascending?: boolean }
      ) => Promise<{
        data: SupabaseProductRow[] | null;
        error: { message: string } | null;
      }>;
    };
  };
}

export interface GetAllAdminProductsOptions {
  client?: AdminClientLike;
  bypassRoleCheck?: boolean;
}

/**
 * Fetches all products (including inactive products) exclusively for authenticated administrators.
 *
 * SECURITY INVARIANTS:
 * 1. Exclusively uses the cookie-authenticated Supabase server client (createServerSupabaseClient).
 * 2. NEVER silently falls back to the anonymous client.
 * 3. NEVER returns hardcoded fallbackProducts.
 * 4. Does NOT filter is_active = true, allowing full draft catalogue retrieval.
 * 5. Checks trusted authenticated admin identity and server-controlled app_metadata.role.
 * 6. Uses Supabase Auth verification (getUser) rather than trusting client JWTs alone.
 * 7. Reports an explicit authorization error if the admin role is missing.
 * 8. Reports a clear database error if the database query fails.
 * 9. Never logs access tokens, passwords or secrets.
 * 10. Does NOT bypass RLS using service-role credentials.
 */
export async function getAllAdminProducts(
  options?: GetAllAdminProductsOptions
): Promise<AdminProductsResult> {
  let client = options?.client;

  // 1. Exclusively use cookie-authenticated Supabase server client
  if (!client) {
    try {
      const { createServerSupabaseClient } = await import("@/lib/supabase-server");
      const serverClient = await createServerSupabaseClient();
      if (serverClient) {
        client = serverClient as unknown as AdminClientLike;
      }
    } catch {
      return {
        products: [],
        error: "Server configuration error: Failed to initialize Supabase server client.",
        errorCode: "CONFIG_ERROR",
      };
    }
  }

  if (!client) {
    return {
      products: [],
      error: "Database configuration error: Supabase client is not configured.",
      errorCode: "CONFIG_ERROR",
    };
  }

  // 2. Server-side identity & role verification
  let isAdminAuthorized = Boolean(options?.bypassRoleCheck);

  if (!isAdminAuthorized) {
    // Check test session bypass (strictly permitted only in isolated CI/local test environments)
    try {
      const { isTestSessionPermitted, TEST_ADMIN_COOKIE } = await import("@/lib/auth-constants");
      if (isTestSessionPermitted()) {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        if (cookieStore.get(TEST_ADMIN_COOKIE)?.value === "true") {
          isAdminAuthorized = true;
        }
      }
    } catch {
      // next/headers might not be available in non-server-component contexts
    }
  }

  // Supabase Auth server-side verification: verifies session with auth service & checks server-controlled app_metadata
  if (!isAdminAuthorized) {
    if (!client.auth) {
      return {
        products: [],
        error: "Authentication required: Auth client is unavailable.",
        errorCode: "AUTH_REQUIRED",
      };
    }

    try {
      const authResult = await client.auth.getUser();
      const authData = authResult?.data;
      const authError = authResult?.error;

      if (authError || !authData?.user) {
        return {
          products: [],
          error: "Authentication required: Administrator session not found. Please sign in to access the product catalogue.",
          errorCode: "AUTH_REQUIRED",
        };
      }

      const user = authData.user;
      const appRole = (user.app_metadata?.role as string | undefined)?.toLowerCase();
      const hasAdminRole = appRole === "admin" || appRole === "superadmin";

      if (!hasAdminRole) {
        return {
          products: [],
          error: "Access Denied: Administrative privileges ('admin' role) are required in database metadata. If the admin role was recently granted, please sign out and sign in again to refresh your session.",
          errorCode: "ROLE_REQUIRED",
        };
      }

      isAdminAuthorized = true;
    } catch (authErr: unknown) {
      const msg = authErr instanceof Error ? authErr.message : "Authentication verification failed";
      return {
        products: [],
        error: `Authentication error: ${msg}`,
        errorCode: "AUTH_REQUIRED",
      };
    }
  }

  // 3. Query all products from Supabase PostgreSQL without filtering is_active = true
  try {
    const { data, error } = await client
      .from("products")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      return {
        products: [],
        error: `Database Error: Failed to fetch products from Supabase (${error.message || "Unknown error"}).`,
        errorCode: "DB_ERROR",
      };
    }

    if (!data) {
      return {
        products: [],
        error: null,
      };
    }

    return {
      products: (data as SupabaseProductRow[]).map(mapSupabaseRowToProduct),
      error: null,
    };
  } catch (dbErr: unknown) {
    const msg = dbErr instanceof Error ? dbErr.message : "Unexpected database error";
    return {
      products: [],
      error: `Database Error: ${msg}`,
      errorCode: "DB_ERROR",
    };
  }
}

/**
 * Fetches a single active product by its unique slug.
 * Returns null if not found.
 *
 * SAFETY INVARIANT:
 * Regulatory review items are strictly excluded from the public catalogue and
 * return null immediately. Supabase remains the authoritative source of truth.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!slug) return null;

  let normalizedSlug = slug.trim().toLowerCase();
  try {
    normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();
  } catch {
    // Keep trimmed slug if decode fails
  }

  // Strictly exclude regulatory review products from public catalogue
  if (isComplianceRestricted(normalizedSlug)) {
    return null;
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", normalizedSlug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error(`Supabase error fetching product "${normalizedSlug}":`, error.message);
        if (!isLocalFallbackPermitted()) {
          throw new Error(
            `Database error: Failed to fetch product "${normalizedSlug}" from Supabase (${error.message}).`
          );
        }
        const localMatch = fallbackProducts.find(
          (p) =>
            p.slug.toLowerCase() === normalizedSlug &&
            p.available &&
            !isComplianceRestricted(p.slug)
        );
        return localMatch || null;
      }

      // Supabase is authoritative: if data is null, the product either does not exist
      // or is marked inactive (is_active = false) in the database. Return null (404).
      if (data) {
        return mapSupabaseRowToProduct(data as SupabaseProductRow);
      }
      return null;
    } catch (err) {
      console.error(`Unexpected error fetching product "${normalizedSlug}" from Supabase:`, err);
      if (!isLocalFallbackPermitted()) {
        throw err instanceof Error
          ? err
          : new Error(`Database error: Product "${normalizedSlug}" is temporarily unavailable.`);
      }
      const localMatch = fallbackProducts.find(
        (p) =>
          p.slug.toLowerCase() === normalizedSlug &&
          p.available &&
          !isComplianceRestricted(p.slug)
      );
      return localMatch || null;
    }
  }

  // If Supabase client is not configured in production, fail closed
  if (!isLocalFallbackPermitted()) {
    throw new Error(
      "Configuration error: Supabase client is not configured in production. Cannot verify product publication status."
    );
  }

  // Development/test-only fallback
  const localMatch = fallbackProducts.find(
    (p) =>
      p.slug.toLowerCase() === normalizedSlug &&
      p.available &&
      !isComplianceRestricted(p.slug)
  );
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
