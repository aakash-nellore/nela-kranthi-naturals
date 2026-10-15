import type { Metadata } from "next";
import Link from "next/link";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In | Nela Kranthi Naturals",
  description: "Secure administrator sign-in portal for Nela Kranthi Naturals.",
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const resolvedParams = await searchParams;
  const nextDestination = resolvedParams?.next || "/admin";

  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#fcfaf6]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand & Portal Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Administration Portal</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1b4332] tracking-tight">
            Admin Sign In
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#52796f] max-w-sm mx-auto leading-relaxed">
            Authorized administrator credentials are required to manage catalogue records and website configuration.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ded5c5] shadow-xs">
          <AdminLoginForm nextDestination={nextDestination} />
        </div>

        {/* Security Notice & Public Link */}
        <div className="text-center space-y-3">
          <p className="text-[11px] text-[#7d6c56] leading-relaxed max-w-xs mx-auto">
            Protected administrative access. Public user registration is disabled. Unauthorized access attempts are monitored and logged.
          </p>
          <div>
            <Link
              href="/"
              className="text-xs text-[#2d6a4f] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>← Return to public website</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
