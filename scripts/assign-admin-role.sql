-- ==============================================================================
-- NELA KRANTHI NATURALS — SECURE ADMIN ROLE ASSIGNMENT PROCEDURE
-- ==============================================================================
-- Description:
--   Administrator-controlled procedure to grant the trusted 'admin' role in
--   auth.users.raw_app_meta_data.
--
-- Security Invariants:
--   1. Operates only on verified accounts with confirmed email addresses.
--   2. Modifies strictly server-controlled raw_app_meta_data.
--   3. Never uses client-writable raw_user_meta_data.
--   4. Must be executed manually in the Supabase Dashboard SQL Editor by the project owner.
--   5. Idempotent: Can be safely re-run without corrupting existing metadata.
--
-- DO NOT RUN AGAINST PRODUCTION WITHOUT EXPLICIT ADMINISTRATIVE APPROVAL.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- STEP 1: PREVIEW USER ACCOUNT (READ-ONLY)
-- Run this query to inspect the account before assigning administrative privileges.
-- ------------------------------------------------------------------------------
SELECT
  id,
  email,
  email_confirmed_at,
  created_at,
  last_sign_in_at,
  raw_app_meta_data
FROM auth.users
WHERE email = 'nelakranthinaturals@gmail.com';

-- ------------------------------------------------------------------------------
-- STEP 2: ASSIGN TRUSTED 'admin' ROLE INTO raw_app_meta_data
-- Updates raw_app_meta_data JSON to add {"role": "admin"}.
-- Guarantees that the role is attached to the user's JWT upon next sign-in or token refresh.
-- ------------------------------------------------------------------------------
UPDATE auth.users
SET raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
WHERE email = 'nelakranthinaturals@gmail.com'
  AND email_confirmed_at IS NOT NULL;

-- ------------------------------------------------------------------------------
-- STEP 3: VERIFICATION (READ-ONLY)
-- Confirm the role was successfully assigned.
-- Expected output: assigned_role = 'admin'
-- ------------------------------------------------------------------------------
SELECT
  id,
  email,
  raw_app_meta_data ->> 'role' AS assigned_role,
  updated_at
FROM auth.users
WHERE email = 'nelakranthinaturals@gmail.com';

-- ------------------------------------------------------------------------------
-- OPTIONAL: REVOCATION PROCEDURE (FOR INCIDENT RESPONSE / DE-PROVISIONING)
-- To safely strip administrative privileges without deleting the account:
-- ------------------------------------------------------------------------------
/*
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data - 'role'
WHERE email = 'nelakranthinaturals@gmail.com';
*/
