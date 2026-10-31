-- ==============================================================================
-- NELA KRANTHI NATURALS — ROLLBACK: CATALOGUE EXPANSION (23 DRAFTS)
-- ==============================================================================
-- Migration Identifier: catalogue-expansion-23-drafts
-- Description: Safely deletes ONLY unpublished draft records explicitly inserted
--              by the catalogue-expansion-23-drafts migration script.
--
-- Safety Invariants:
-- 1. Explicit UUID Requirement: The operator MUST replace the placeholder UUID list
--    with the exact IDs captured from the migration execution RETURNING clause.
-- 2. Multi-Factor Safety Guards:
--    - id IN (<EXPLICIT_INSERTED_UUIDS>)
--    - AND slug IN (<23_EXPANSION_SLUGS>)  -- Prevents UUID typos from affecting other rows
--    - AND is_active = false               -- Never deletes published/live products
--    - AND (image_url IS NULL OR image_url = '') -- Never deletes drafts modified by admins
-- 3. Core Product Protection: Zero possibility of impacting existing products:
--    Banana, Moringa, Curry Leaves, Papaya, Mango, Lemon, Pineapple, or Okra.
-- 4. Pre-existing Draft Protection: Any draft created independently is excluded
--    by the explicit UUID check and slug filters.
--
-- DO NOT RUN AGAINST PRODUCTION WITHOUT EXPLICIT ADMINISTRATIVE APPROVAL.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STEP 1: DRY RUN VERIFICATION (READ-ONLY)
-- Run this SELECT query first to inspect exactly which records will be affected.
-- Replace the placeholder UUIDs below with the actual UUIDs returned during insertion.
-- ------------------------------------------------------------------------------

/*
SELECT
  id,
  name,
  slug,
  category,
  is_active,
  image_url,
  created_at
FROM public.products
WHERE id IN (
  -- PASTE THE EXACT INSERTED UUIDs HERE:
  '00000000-0000-0000-0000-000000000000' -- Replace with real UUIDs
)
AND slug IN (
  'guava-leaf-powder',
  'papaya-leaf-powder',
  'jamun-leaf-powder',
  'neem-leaf-powder',
  'gongura-leaf-powder',
  'mint-leaf-powder',
  'desi-gulabi-rose-petals-dried',
  'marigold-petals-dried',
  'dragon-fruit-powder',
  'orange-powder',
  'amla-powder',
  'apple-powder',
  'tomato-powder',
  'onion-powder',
  'carrot-powder',
  'beetroot-powder',
  'bitter-gourd-powder',
  'drumstick-pod-powder',
  'brinjal-eggplant-powder',
  'green-chilli-powder',
  'ginger-powder',
  'garlic-powder',
  'safed-musli-root-powder'
)
AND is_active = false
AND (image_url IS NULL OR image_url = '');
*/


-- ------------------------------------------------------------------------------
-- STEP 2: ATOMIC ROLLBACK DELETION
-- Execute within an explicit transaction only after Step 1 dry run confirms
-- the expected row count and record details.
-- ------------------------------------------------------------------------------

/*
BEGIN;

WITH deleted_drafts AS (
  DELETE FROM public.products
  WHERE id IN (
    -- PASTE THE EXACT INSERTED UUIDs HERE:
    '00000000-0000-0000-0000-000000000000' -- Replace with real UUIDs
  )
  AND slug IN (
    'guava-leaf-powder',
    'papaya-leaf-powder',
    'jamun-leaf-powder',
    'neem-leaf-powder',
    'gongura-leaf-powder',
    'mint-leaf-powder',
    'desi-gulabi-rose-petals-dried',
    'marigold-petals-dried',
    'dragon-fruit-powder',
    'orange-powder',
    'amla-powder',
    'apple-powder',
    'tomato-powder',
    'onion-powder',
    'carrot-powder',
    'beetroot-powder',
    'bitter-gourd-powder',
    'drumstick-pod-powder',
    'brinjal-eggplant-powder',
    'green-chilli-powder',
    'ginger-powder',
    'garlic-powder',
    'safed-musli-root-powder'
  )
  AND is_active = false
  AND (image_url IS NULL OR image_url = '')
  RETURNING id, slug, name, category
)
SELECT count(*) AS deleted_draft_count FROM deleted_drafts;

-- If the deleted count does NOT match your expectation, run: ROLLBACK;
-- If confirmed, run: COMMIT;
COMMIT;
*/
