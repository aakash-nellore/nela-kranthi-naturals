-- ==============================================================================
-- NELA KRANTHI NATURALS — CATALOGUE PUBLICATION MIGRATION
-- ==============================================================================
-- Script: scripts/publish-all-products-with-compliance.sql
-- Description: Activates all 23 draft products in public.products to publish them
--              on the main website catalogue alongside the 8 original products.
--
-- Business Context:
-- - The business owner requires all 31 products visible in the public catalogue.
-- - 8 products are already active and published with photos/packaging.
-- - 23 products are currently drafts (is_active = false) awaiting photography.
-- - 5 products (papaya-leaf-powder, jamun-leaf-powder, neem-leaf-powder,
--   marigold-petals-dried, safed-musli-root-powder) are subject to regulatory
--   compliance notice and enquiry-only presentation on the frontend.
--
-- Safety Invariants:
-- 1. Transaction-wrapped: Wrapped in BEGIN ... COMMIT for atomic execution.
-- 2. Preserves Core 8 Products: The 8 original active products remain untouched.
-- 3. Exact Slug Scoping: Only updates the 23 designated expansion slugs.
-- 4. Audit Logging: Returns modified records with their new status and timestamps.
-- 5. Rollback Available: Reversible via scripts/rollback-publish-all-products.sql.
--
-- DO NOT RUN AGAINST PRODUCTION WITHOUT EXPLICIT ADMINISTRATIVE APPROVAL.
-- ==============================================================================

BEGIN;

-- ------------------------------------------------------------------------------
-- STEP 1: PRE-MIGRATION SANITY CHECK (READ-ONLY)
-- ------------------------------------------------------------------------------
-- Confirm exactly 31 total products exist.
DO $$
DECLARE
  v_total INTEGER;
  v_active INTEGER;
  v_inactive INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_total FROM public.products;
  SELECT COUNT(*) INTO v_active FROM public.products WHERE is_active = true;
  SELECT COUNT(*) INTO v_inactive FROM public.products WHERE is_active = false;

  RAISE NOTICE 'Pre-Migration Count -> Total: %, Active: %, Inactive: %',
    v_total, v_active, v_inactive;

  IF v_total < 31 THEN
    RAISE EXCEPTION 'Aborting: Expected at least 31 products in public.products, found %', v_total;
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- STEP 2: ACTIVATE THE 23 EXPANSION PRODUCTS
-- ------------------------------------------------------------------------------
UPDATE public.products
SET
  is_active = true,
  updated_at = NOW()
WHERE slug IN (
  -- Category 1: Leaf Powders (6)
  'guava-leaf-powder',
  'papaya-leaf-powder',
  'jamun-leaf-powder',
  'neem-leaf-powder',
  'gongura-leaf-powder',
  'mint-leaf-powder',

  -- Category 2: Flower & Petal Products (2)
  'desi-gulabi-rose-petals-dried',
  'marigold-petals-dried',

  -- Category 3: Fruit Powders (4)
  'dragon-fruit-powder',
  'orange-powder',
  'amla-powder',
  'apple-powder',

  -- Category 4: Vegetable Powders (8)
  'tomato-powder',
  'onion-powder',
  'carrot-powder',
  'beetroot-powder',
  'bitter-gourd-powder',
  'drumstick-pod-powder',
  'brinjal-eggplant-powder',
  'green-chilli-powder',

  -- Category 5: Roots, Spices & Specialty Botanicals (3)
  'ginger-powder',
  'garlic-powder',
  'safed-musli-root-powder'
)
AND is_active = false
RETURNING
  id,
  name,
  slug,
  category,
  is_active,
  updated_at;

-- ------------------------------------------------------------------------------
-- STEP 3: POST-MIGRATION AUDIT VERIFICATION
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  v_total INTEGER;
  v_active INTEGER;
  v_inactive INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_total FROM public.products;
  SELECT COUNT(*) INTO v_active FROM public.products WHERE is_active = true;
  SELECT COUNT(*) INTO v_inactive FROM public.products WHERE is_active = false;

  RAISE NOTICE 'Post-Migration Count -> Total: %, Active: %, Inactive: %',
    v_total, v_active, v_inactive;

  IF v_active < 31 THEN
    RAISE WARNING 'Expected all 31 products to be active, found % active products', v_active;
  END IF;
END $$;

COMMIT;

-- ------------------------------------------------------------------------------
-- STEP 4: VERIFICATION REPORT QUERY
-- ------------------------------------------------------------------------------
SELECT
  id,
  name,
  slug,
  category,
  unit,
  is_active,
  CASE
    WHEN slug IN (
      'papaya-leaf-powder',
      'jamun-leaf-powder',
      'neem-leaf-powder',
      'marigold-petals-dried',
      'safed-musli-root-powder'
    ) THEN 'Enquiry Only (Compliance Review)'
    ELSE 'Standard Catalogue'
  END AS compliance_classification,
  CASE
    WHEN image_url IS NOT NULL AND image_url <> '' THEN 'Has Photo'
    ELSE 'Branded Placeholder'
  END AS image_status
FROM public.products
ORDER BY category, name;
