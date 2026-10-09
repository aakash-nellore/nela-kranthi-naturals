-- ==============================================================================
-- Row Level Security (RLS) Policy for public.enquiries
-- ==============================================================================
-- Security Model:
--   - Public / Anonymous (anon): INSERT enquiries (for website contact form)
--   - Authenticated users: INSERT enquiries
--   - SELECT, UPDATE, DELETE: Service role or admin access only
--
-- Instructions:
--   Run this script in the Supabase Dashboard -> SQL Editor.
-- ==============================================================================

-- 1. Ensure Row Level Security is enabled on public.enquiries
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policy if present so this script can be re-run safely
DROP POLICY IF EXISTS "Allow public insert for enquiries" ON public.enquiries;

-- 3. Create public INSERT policy for enquiries
CREATE POLICY "Allow public insert for enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
