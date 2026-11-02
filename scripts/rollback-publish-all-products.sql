-- ==============================================================================
-- NELA KRANTHI NATURALS — ROLLBACK: CATALOGUE PUBLICATION MIGRATION
-- ==============================================================================
-- Script: scripts/rollback-publish-all-products.sql
-- Description: Safely reverts the 23 expansion products back to inactive drafts
--              (is_active = false) in case publication needs to be reversed.
--
-- Safety Invariants:
-- 1. Preserves Core 8 Products: Banana, Moringa, Curry Leaves, Papaya Fruit,
--    Mango, Lemon, Pineapple, and Okra REMAIN ACTIVE (is_active = true).
-- 2. Scoped to the 23 Expansion Slugs: Never affects any other rows.
-- 3. Transaction-wrapped: Atomic execution.
--
-- DO NOT RUN AGAINST PRODUCTION WITHOUT EXPLICIT ADMINISTRATIVE APPROVAL.
-- ==============================================================================

BEGIN;

-- ------------------------------------------------------------------------------
-- STEP 1: PRE-ROLLBACK SANITY CHECK (READ-ONLY)
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  v_active INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_active FROM public.products WHERE is_active = true;
  RAISE NOTICE 'Active Products before rollback: %', v_active;
END $$;

-- ------------------------------------------------------------------------------
-- STEP 2: REVERT THE 23 EXPANSION PRODUCTS TO INACTIVE DRAFTS
-- ------------------------------------------------------------------------------
UPDATE public.products
SET
  is_active = false,
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
RETURNING
  id,
  name,
  slug,
  category,
  is_active,
  updated_at;

-- ------------------------------------------------------------------------------
-- STEP 3: POST-ROLLBACK AUDIT VERIFICATION
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  v_active INTEGER;
  v_inactive INTEGER;
BEGIN
  SELECT COUNT(*) INTO v_active FROM public.products WHERE is_active = true;
  SELECT COUNT(*) INTO v_inactive FROM public.products WHERE is_active = false;

  RAISE NOTICE 'Post-Rollback Count -> Active: %, Inactive: %', v_active, v_inactive;

  IF v_active <> 8 THEN
    RAISE WARNING 'Expected exactly 8 active products remaining, found %', v_active;
  END IF;
END $$;

COMMIT;

-- ------------------------------------------------------------------------------
-- STEP 4: VERIFY REMAINING ACTIVE CORE PRODUCTS
-- ------------------------------------------------------------------------------
SELECT id, name, slug, category, is_active
FROM public.products
WHERE is_active = true
ORDER BY name;
