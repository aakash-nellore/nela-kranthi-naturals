"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { ProductCategory, Product } from "@/types";
import { mapSupabaseRowToProduct, SupabaseProductRow } from "@/lib/products";

const VALID_CATEGORIES: ProductCategory[] = [
  "Leaf Powders",
  "Flower & Petal Products",
  "Fruit Powders",
  "Vegetable Powders",
  "Roots, Spices & Specialty Botanicals",
  "Dehydrated Foods",
];

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export interface ProductFormData {
  id?: string;
  name: string;
  slug: string;
  category: ProductCategory;
  unit: string;
  imageUrl?: string;
  shortDescription?: string;
  description: string;
  isActive: boolean;
}

export interface ProductActionResult {
  success: boolean;
  message?: string;
  error?: string;
  product?: Product;
}

export interface ImageUploadResult {
  success: boolean;
  message?: string;
  error?: string;
  filename?: string;
  publicUrl?: string;
}

/**
 * Strips potentially dangerous HTML / script tags from user inputs to prevent stored XSS.
 */
function sanitizeTextInput(input?: string): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, "") // strip HTML tags
    .replace(/[<>'"&;]/g, (char) => {
      // escape remaining sensitive characters
      switch (char) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "'":
          return "&#39;";
        case '"':
          return "&quot;";
        case "&":
          return "&amp;";
        case ";":
          return "&#59;";
        default:
          return char;
      }
    })
    .trim();
}

/**
 * Validates binary magic byte headers for uploaded image files.
 * Ensures uploaded files cannot spoof MIME headers to deliver malicious binaries.
 */
function isValidImageHeader(buffer: Buffer, mime: string): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (mime === "image/jpeg" || mime === "image/jpg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (mime === "image/png") {
    return (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    );
  }

  // WebP: RIFF (bytes 0-3: 52 49 46 46), WEBP (bytes 8-11: 57 45 42 50)
  if (mime === "image/webp") {
    const isRiff =
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46;
    const isWebp =
      buffer[8] === 0x57 &&
      buffer[9] === 0x45 &&
      buffer[10] === 0x42 &&
      buffer[11] === 0x50;
    return isRiff && isWebp;
  }

  // AVIF: ISO Media file with 'ftyp' box
  if (mime === "image/avif") {
    return (
      buffer[4] === 0x66 &&
      buffer[5] === 0x74 &&
      buffer[6] === 0x79 &&
      buffer[7] === 0x70
    );
  }

  return false;
}

/**
 * Server Action: Validates and persists a product (INSERT or UPDATE) in Supabase.
 * Strictly enforces administrator authentication via requireAdminSession().
 */
export async function saveProductAction(
  payload: ProductFormData
): Promise<ProductActionResult> {
  // 1. Server-side authorization check (fails closed if unauthenticated or non-admin)
  try {
    await requireAdminSession();
  } catch (authError: unknown) {
    const errorMsg =
      authError instanceof Error ? authError.message : "Unauthorized";
    return {
      success: false,
      error: `Access Denied: ${errorMsg}`,
    };
  }

  // 2. Server-side validation of product fields
  const trimmedName = sanitizeTextInput(payload.name);
  if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
    return {
      success: false,
      error: "Product name must be between 2 and 100 characters.",
    };
  }

  const normalizedSlug = payload.slug
    ?.trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!normalizedSlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(normalizedSlug)) {
    return {
      success: false,
      error:
        "Invalid product slug. Slugs must contain only lowercase letters, numbers, and single hyphens.",
    };
  }

  if (!VALID_CATEGORIES.includes(payload.category)) {
    return {
      success: false,
      error: `Invalid product category "${payload.category}". Must be one of the six approved categories.`,
    };
  }

  const trimmedUnit = sanitizeTextInput(payload.unit);
  if (!trimmedUnit || trimmedUnit.length < 2 || trimmedUnit.length > 50) {
    return {
      success: false,
      error: "Product unit packaging size is required (e.g., '100g / 250g / 500g').",
    };
  }

  const trimmedDesc = sanitizeTextInput(payload.description);
  if (!trimmedDesc || trimmedDesc.length < 10) {
    return {
      success: false,
      error: "Product description must be at least 10 characters long.",
    };
  }

  // 3. Obtain authenticated Supabase client
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      success: false,
      error:
        "Database service unavailable: Supabase client is not configured.",
    };
  }

  try {
    // 4. Server-side slug collision check (ensure slug uniqueness)
    const { data: existingSlugRow } = await supabase
      .from("products")
      .select("id, slug")
      .eq("slug", normalizedSlug)
      .maybeSingle();

    if (existingSlugRow && existingSlugRow.id !== payload.id) {
      return {
        success: false,
        error: `A product with the slug "${normalizedSlug}" already exists. Slugs must be unique.`,
      };
    }

    const rowData = {
      name: trimmedName,
      slug: normalizedSlug,
      category: payload.category,
      description: trimmedDesc,
      image_url: payload.imageUrl?.trim() || null,
      unit: trimmedUnit,
      is_active: payload.isActive,
    };

    let resultRow: SupabaseProductRow | null = null;

    if (payload.id) {
      // UPDATE existing product
      const { data, error } = await supabase
        .from("products")
        .update(rowData)
        .eq("id", payload.id)
        .select()
        .single();

      if (error) {
        // Detect RLS policy violation
        if (
          error.code === "42501" ||
          error.message.includes("row-level security") ||
          error.message.includes("permission denied")
        ) {
          return {
            success: false,
            error:
              "Database write restricted by Row Level Security (RLS). Ensure the administrator account has been granted the 'admin' role in auth.users.raw_app_meta_data and scripts/enable-admin-product-management-rls.sql has been executed.",
          };
        }
        return {
          success: false,
          error: `Failed to update product: ${error.message}`,
        };
      }
      resultRow = data as SupabaseProductRow;
    } else {
      // INSERT new product
      const { data, error } = await supabase
        .from("products")
        .insert(rowData)
        .select()
        .single();

      if (error) {
        // Detect RLS policy violation
        if (
          error.code === "42501" ||
          error.message.includes("row-level security") ||
          error.message.includes("permission denied")
        ) {
          return {
            success: false,
            error:
              "Database write restricted by Row Level Security (RLS). Ensure the administrator account has been granted the 'admin' role in auth.users.raw_app_meta_data and scripts/enable-admin-product-management-rls.sql has been executed.",
          };
        }
        return {
          success: false,
          error: `Failed to create product: ${error.message}`,
        };
      }
      resultRow = data as SupabaseProductRow;
    }

    // 5. Revalidate cache on affected public and admin routes
    revalidatePath("/products");
    revalidatePath(`/products/${normalizedSlug}`);
    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath("/sitemap.xml");

    return {
      success: true,
      message: payload.id
        ? `Product "${trimmedName}" updated successfully.`
        : `Product "${trimmedName}" created successfully.`,
      product: resultRow ? mapSupabaseRowToProduct(resultRow) : undefined,
    };
  } catch (err: unknown) {
    console.error("Unexpected error saving product:", err);
    return {
      success: false,
      error: "An unexpected error occurred while saving the product.",
    };
  }
}

/**
 * Server Action: Validates and uploads a product image to Supabase Storage ('product-images' bucket).
 * Enforces administrator authentication, file size bounds, strict MIME matching, and binary header validation.
 */
export async function uploadProductImageAction(
  formData: FormData
): Promise<ImageUploadResult> {
  // 1. Server-side authorization check
  try {
    await requireAdminSession();
  } catch (authError: unknown) {
    const errorMsg =
      authError instanceof Error ? authError.message : "Unauthorized";
    return {
      success: false,
      error: `Access Denied: ${errorMsg}`,
    };
  }

  const file = formData.get("file") as File | null;
  const slug = (formData.get("slug") as string | null)?.trim() || "product";

  if (!file || !(file instanceof File) || file.size === 0) {
    return {
      success: false,
      error: "Please select an image file to upload.",
    };
  }

  // 2. Strict file size validation (max 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: "Image file size exceeds the 5MB limit. Please optimize the image.",
    };
  }

  // 3. Strict MIME type validation
  const normalizedMime = file.type.toLowerCase().trim();
  if (!ALLOWED_MIME_TYPES.includes(normalizedMime)) {
    return {
      success: false,
      error:
        "Unsupported file format. Please upload a JPEG, PNG, WebP, or AVIF image.",
    };
  }

  // 4. File extension validation matching declared MIME type
  const rawExt = file.name.split(".").pop()?.toLowerCase() || "";
  const validExtensionsByMime: Record<string, string[]> = {
    "image/jpeg": ["jpg", "jpeg"],
    "image/jpg": ["jpg", "jpeg"],
    "image/png": ["png"],
    "image/webp": ["webp"],
    "image/avif": ["avif"],
  };

  const allowedExts = validExtensionsByMime[normalizedMime] || [];
  if (!allowedExts.includes(rawExt)) {
    return {
      success: false,
      error: `File extension ".${rawExt}" does not match declared MIME type "${normalizedMime}".`,
    };
  }

  // 5. Binary magic byte header verification
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!isValidImageHeader(buffer, normalizedMime)) {
      return {
        success: false,
        error:
          "Invalid or corrupted image file. Content failed image header verification.",
      };
    }

    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        error: "Storage service unavailable: Supabase client is not configured.",
      };
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");
    const uniqueSuffix = Math.random().toString(36).substring(2, 8);
    const uniqueFilename = `${cleanSlug}-${Date.now()}-${uniqueSuffix}.${rawExt}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(uniqueFilename, buffer, {
        contentType: normalizedMime,
        upsert: true,
      });

    if (error) {
      if (
        error.message.includes("row-level security") ||
        error.message.includes("policy") ||
        error.message.includes("Unauthorized")
      ) {
        return {
          success: false,
          error:
            "Storage upload restricted by Row Level Security. Ensure scripts/enable-admin-product-management-rls.sql has been executed and the administrator account holds the 'admin' role.",
        };
      }
      return {
        success: false,
        error: `Image upload failed: ${error.message}`,
      };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${encodeURIComponent(
      uniqueFilename
    )}`;

    return {
      success: true,
      message: "Image uploaded successfully to product-images bucket.",
      filename: uniqueFilename,
      publicUrl,
    };
  } catch (err: unknown) {
    console.error("Unexpected error uploading product image:", err);
    return {
      success: false,
      error: "An unexpected error occurred during image validation or upload.",
    };
  }
}
