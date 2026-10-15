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

  // 3. Local non-production testing environment bypass for verified testing email
  if (
    process.env.NODE_ENV !== "production" &&
    normalizedEmail === "nelakranthinaturals@gmail.com"
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
