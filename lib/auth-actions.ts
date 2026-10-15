"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import {
  isUserAdmin,
  getSafeAdminRedirect,
  TEST_ADMIN_COOKIE,
} from "@/lib/auth-constants";

/**
 * Server Action for administrator authentication via Supabase Auth SSR.
 */
export async function loginAdminAction(
  prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  const rawNext = formData.get("next") as string;
  const safeNext = getSafeAdminRedirect(rawNext);

  if (!email || !password) {
    return { error: "Please provide both email address and password." };
  }

  // Non-production test bypass for local Playwright automated testing
  if (
    process.env.NODE_ENV !== "production" &&
    email.toLowerCase() === "nelakranthinaturals@gmail.com" &&
    password === "Admin@NelaKranthi2026!"
  ) {
    const cookieStore = await cookies();
    cookieStore.set(TEST_ADMIN_COOKIE, "true", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    redirect(safeNext);
  }

  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return {
      error:
        "Authentication service unavailable: Supabase client is not configured.",
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      return {
        error:
          error?.message ||
          "Invalid login credentials. Please verify your email and password.",
      };
    }

    // Server-side authorization check: verify user has administrator role
    if (!isUserAdmin(data.user)) {
      // Sign out unauthorized user session immediately
      await supabase.auth.signOut();
      return {
        error:
          "Access Denied: This account is not registered as an authorized administrator.",
      };
    }
  } catch (err: unknown) {
    // If Next.js redirect was thrown, re-throw so Next.js handles it properly
    if (
      err &&
      typeof err === "object" &&
      "digest" in err &&
      typeof (err as { digest: string }).digest === "string" &&
      (err as { digest: string }).digest.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }
    console.error("Login unexpected error:", err);
    return { error: "An unexpected error occurred during authentication. Please try again." };
  }

  redirect(safeNext);
}

/**
 * Server Action to log out administrator and terminate session cookies.
 */
export async function logoutAdminAction(): Promise<void> {
  try {
    const cookieStore = await cookies();

    // Clear non-production test cookie if present
    if (process.env.NODE_ENV !== "production") {
      cookieStore.delete(TEST_ADMIN_COOKIE);
    }

    const supabase = await createServerSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  redirect("/admin/login");
}
