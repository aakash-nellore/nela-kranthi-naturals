-- ==============================================================================
-- Fix: Update packaging units in public.products table
-- ==============================================================================
-- Reason:
--   The 'unit' column was previously filled with 'Powder' (the product form)
--   instead of the available retail & bulk packaging weights (e.g. '100g / 250g / 500g').
--
-- Instructions:
--   Run this script in your Supabase Dashboard -> SQL Editor.
-- ==============================================================================

UPDATE public.products
SET unit = '100g / 250g / 500g'
WHERE unit ILIKE '%powder%' OR unit IS NULL OR trim(unit) = '';
