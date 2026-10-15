import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import {
  isUserAdmin,
  TEST_ADMIN_COOKIE,
  type AdminUser,
} from "@/lib/auth-constants";

export * from "@/lib/auth-constants";
export * from "@/lib/auth-actions";

/**
 * Server-side Data Access Layer (DAL) to verify and retrieve the current administrator session.
 * Used in Server Component layouts and server-side route handlers.
 */
export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();

    // In non-production testing environment, handle automated test session cookie
    if (process.env.NODE_ENV !== "production") {
      const testToken = cookieStore.get(TEST_ADMIN_COOKIE)?.value;
      if (testToken === "true") {
        return {
          id: "local-admin-test-id",
          email: "nelakranthinaturals@gmail.com",
          role: "admin",
          lastSignInAt: new Date().toISOString(),
        };
      }
    }

    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return null;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !isUserAdmin(user)) {
      return null;
    }

    const role =
      (user.app_metadata?.role as string) || "admin";

    return {
      id: user.id,
      email: user.email || "",
      role,
      lastSignInAt: user.last_sign_in_at,
    };
  } catch (err) {
    console.error("Error retrieving admin session:", err);
    return null;
  }
}

/**
 * Server-side guard to strictly enforce administrator privileges on server actions & API mutations.
 * Throws an error if the user is unauthenticated or not an authorized administrator.
 */
export async function requireAdminSession(): Promise<AdminUser> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized: Administrator privileges are required to perform this action.");
  }
  return session;
}
