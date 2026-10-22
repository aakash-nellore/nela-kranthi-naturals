export const TEST_ADMIN_COOKIE = "sb-test-admin-session";
export const ADMIN_ROLES = ["admin", "superadmin"] as const;

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  lastSignInAt?: string;
}

export interface UserLike {
  id?: string;
  email?: string | null;
  app_metadata?: Record<string, unknown> | null;
  last_sign_in_at?: string;
}

/**
 * Determines whether automated test sessions via TEST_ADMIN_COOKIE are permitted.
 *
 * FAIL-CLOSED SECURITY INVARIANTS:
 * 1. STRICTLY FORBIDDEN on any Vercel deployment (Production, Preview, or Dev).
 *    If process.env.VERCEL is set or process.env.VERCEL_ENV is set, IMMEDIATELY returns false.
 * 2. STRICTLY FORBIDDEN on any public deployment outside Vercel.
 *    If NODE_ENV === "production", test sessions are ONLY permitted if ALL of the following hold:
 *      a) process.env.CI === "true" (running within an isolated CI container)
 *      b) process.env.ALLOW_TEST_ADMIN_SESSION === "true" (explicit opt-in from test config)
 *      c) NEITHER process.env.VERCEL nor process.env.VERCEL_ENV is set.
 *    Any public production server will fail condition (a), failing closed.
 * 3. In local development (NODE_ENV === "development"), allowed for local testing unless Vercel is detected.
 */
export function isTestSessionPermitted(): boolean {
  // 1. Immediately fail closed on any Vercel deployment (Production, Preview, Dev)
  if (process.env.VERCEL || process.env.VERCEL_ENV) {
    return false;
  }

  // 2. In production mode (e.g. `next start` during CI test runs), strictly require isolated CI container flags
  if (process.env.NODE_ENV === "production") {
    return (
      process.env.CI === "true" &&
      process.env.ALLOW_TEST_ADMIN_SESSION === "true"
    );
  }

  // 3. In local development (`next dev`), permitted
  return process.env.NODE_ENV === "development";
}

/**
 * Validates whether a user is an authorized administrator.
 *
 * SECURITY RULES:
 * 1. NEVER trusts `user_metadata` because it is user-writable in Supabase.
 * 2. Checks trusted server-controlled `app_metadata.role` ('admin' or 'superadmin').
 * 3. Checks explicitly configured, server-only ADMIN_EMAILS environment allowlist.
 * 4. Does NOT automatically grant admin privileges to business emails unless explicitly configured.
 */
export function isUserAdmin(user: UserLike | null | undefined): boolean {
  if (!user || !user.email) return false;

  const normalizedEmail = user.email.toLowerCase().trim();

  // 1. Check server-controlled app_metadata (set only via service-role / auth hooks)
  const appRole = (user.app_metadata?.role as string | undefined)?.toLowerCase();
  if (appRole && ADMIN_ROLES.includes(appRole as (typeof ADMIN_ROLES)[number])) {
    return true;
  }

  // 2. Check explicitly configured server-only ADMIN_EMAILS allowlist
  const configuredEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (configuredEmails.length > 0 && configuredEmails.includes(normalizedEmail)) {
    return true;
  }

  // 3. Automated testing environment bypass for verified testing emails
  if (
    isTestSessionPermitted() &&
    (normalizedEmail === "nelakranthinaturals@gmail.com" ||
      (process.env.TEST_ADMIN_EMAIL &&
        normalizedEmail === process.env.TEST_ADMIN_EMAIL.toLowerCase().trim()))
  ) {
    return true;
  }

  return false;
}

/**
 * Validates and sanitizes destination URL for the `next` query parameter.
 * Strictly prevents open redirect vulnerabilities.
 */
export function getSafeAdminRedirect(nextUrl: string | null | undefined): string {
  if (!nextUrl) return "/admin";

  const trimmed = nextUrl.trim();

  // Reject empty or non-relative paths
  if (!trimmed.startsWith("/admin")) {
    return "/admin";
  }

  // Reject protocol-relative URLs (//evil.com) and backslash traversal (/\evil.com)
  if (trimmed.startsWith("//") || trimmed.startsWith("/\\") || trimmed.includes("://")) {
    return "/admin";
  }

  return trimmed;
}
