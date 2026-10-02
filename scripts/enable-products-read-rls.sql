-- ==============================================================================
-- Step 17 — Row Level Security (RLS) Policy for public.products
-- ==============================================================================
-- Security Model:
--   - Public / Anonymous (anon): SELECT active products only (is_active = true)
--   - Authenticated users: SELECT active products only (is_active = true)
--   - INSERT, UPDATE, DELETE: Strictly denied (no write policies created)
--
-- Instructions:
--   Run this script in the Supabase Dashboard -> SQL Editor.
-- ==============================================================================

-- 1. Ensure Row Level Security is enabled on public.products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policy if present so this script can be re-run safely
DROP POLICY IF EXISTS "Allow public read access for active products" ON public.products;

-- 3. Create public SELECT policy for active products
CREATE POLICY "Allow public read access for active products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (is_active = true);
