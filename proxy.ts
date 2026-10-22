import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  isUserAdmin,
  getSafeAdminRedirect,
  TEST_ADMIN_COOKIE,
  isTestSessionPermitted,
} from "@/lib/auth-constants";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const { pathname } = request.nextUrl;

  // Non-production / test runner session check for automated Playwright tests
  const isTestSession =
    isTestSessionPermitted() &&
    request.cookies.get(TEST_ADMIN_COOKIE)?.value === "true";

  let isAuthenticatedAdmin = isTestSession;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && !isAuthenticatedAdmin) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user && isUserAdmin(user)) {
      isAuthenticatedAdmin = true;
    }
  }

  // Handle /admin/login route
  if (pathname === "/admin/login") {
    if (isAuthenticatedAdmin) {
      const nextParam = request.nextUrl.searchParams.get("next");
      const safeRedirect = getSafeAdminRedirect(nextParam);
      return NextResponse.redirect(new URL(safeRedirect, request.url));
    }
    return response;
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticatedAdmin) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
