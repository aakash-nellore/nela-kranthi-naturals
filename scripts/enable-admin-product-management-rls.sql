-- ==============================================================================
-- NELA KRANTHI NATURALS — ROW LEVEL SECURITY (RLS) POLICIES
-- ADMIN PRODUCT MANAGEMENT & SECURE STORAGE ACCESS (STEP 6 HARDENED)
-- ==============================================================================
-- Description:
--   Implements hardened, least-privilege PostgreSQL Row Level Security (RLS) policies
--   to enable verified administrators to view drafts, insert new products,
--   update product records, and securely upload images, while strictly
--   preserving public read isolation for unpublished/inactive drafts.
--
-- Security Hardening Invariants:
--   1. Role-Based Access Control (RBAC):
--      Eliminated hardcoded email addresses from all database policies.
--      Authorization strictly checks server-controlled Supabase app_metadata:
--      (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
--   2. Client Tamper-Proof:
--      Never references client-writable user_metadata.
--   3. Deletion Protection:
--      Product DELETION is intentionally disabled for the initial production
--      release to prevent accidental or irreversible data loss.
--      Product archiving is performed by updating is_active = false.
--   4. Public Read Isolation:
--      Anonymous visitors and regular users can ONLY query active products (is_active = true).
--      Zero draft data is exposed via public queries or REST endpoints.
--   5. Idempotent & Re-run Safe:
--      Drops all predecessor policies cleanly before creation.
--
-- DO NOT EXECUTE AGAINST PRODUCTION WITHOUT EXPLICIT ADMINISTRATIVE APPROVAL.
-- Run in the Supabase Dashboard -> SQL Editor when ready to activate admin writes.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Ensure Row Level Security is enabled on public.products
-- ------------------------------------------------------------------------------
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. Drop existing policies to allow clean, idempotent re-runs
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Allow public read access for active products" ON public.products;
DROP POLICY IF EXISTS "Allow administrators full read access" ON public.products;
DROP POLICY IF EXISTS "Allow administrators to insert products" ON public.products;
DROP POLICY IF EXISTS "Allow administrators to update products" ON public.products;
DROP POLICY IF EXISTS "Allow administrators to delete products" ON public.products;

-- ------------------------------------------------------------------------------
-- 3. Public Read Policy (Active Products Only)
--    Enforces that anonymous visitors and unprivileged users can ONLY query active products.
-- ------------------------------------------------------------------------------
CREATE POLICY "Allow public read access for active products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- ------------------------------------------------------------------------------
-- 4. Admin SELECT Policy (Active + Inactive Draft Products)
--    Permits verified administrators to view ALL products, including unpublished drafts.
-- ------------------------------------------------------------------------------
CREATE POLICY "Allow administrators full read access"
ON public.products
FOR SELECT
TO authenticated
USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
);

-- ------------------------------------------------------------------------------
-- 5. Admin INSERT Policy
--    Permits verified administrators to insert new products and drafts.
-- ------------------------------------------------------------------------------
CREATE POLICY "Allow administrators to insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (
  (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
);

-- ------------------------------------------------------------------------------
-- 6. Admin UPDATE Policy
--    Permits verified administrators to modify product details, unit packaging,
--    descriptions, image URLs, and toggle publication status (is_active).
-- ------------------------------------------------------------------------------
CREATE POLICY "Allow administrators to update products"
ON public.products
FOR UPDATE
TO authenticated
USING (
  (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
)
WITH CHECK (
  (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
);

-- ------------------------------------------------------------------------------
-- 7. Product Deletion Policy (Disabled for Initial Production Release)
--    Product DELETE operations are intentionally prohibited to safeguard production data.
--    Any obsolete or discontinued product should have is_active set to false.
-- ------------------------------------------------------------------------------
-- Note: No FOR DELETE policy is created. Under PostgreSQL RLS, absence of a DELETE policy
-- denies DELETE operations for all roles except service_role.

-- ------------------------------------------------------------------------------
-- 8. Supabase Storage Policies for 'product-images' Bucket
-- ------------------------------------------------------------------------------
-- Clean up predecessor storage policies
DROP POLICY IF EXISTS "Allow public read access for product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow administrators to upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow administrators to update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow administrators to delete product images" ON storage.objects;

-- Allow public CDN / browser read access to product images
CREATE POLICY "Allow public read access for product images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

-- Allow verified administrators to upload product images
CREATE POLICY "Allow administrators to upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
);

-- Allow verified administrators to update/replace product images
CREATE POLICY "Allow administrators to update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
)
WITH CHECK (
  bucket_id = 'product-images'
  AND (auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'superadmin')
);

-- Image deletion is disabled for initial release to prevent broken image references
