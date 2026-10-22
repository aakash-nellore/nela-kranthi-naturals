"use client";

import React, { useActionState, useState } from "react";
import { loginAdminAction } from "@/lib/auth-actions";

interface AdminLoginFormProps {
  nextDestination: string;
}

export default function AdminLoginForm({
  nextDestination,
}: AdminLoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={nextDestination} />

      {/* Error Feedback Alert */}
      {state?.error && (
        <div
          id="admin-login-error"
          data-testid="admin-login-error"
          role="alert"
          aria-live="polite"
          className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150"
        >
          <svg
            className="w-4 h-4 text-red-700 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z"
            />
          </svg>
          <p className="leading-snug">{state.error}</p>
        </div>
      )}

      {/* Email Input */}
      <div>
        <label
          htmlFor="admin-email"
          className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
        >
          Administrator Email
        </label>
        <div className="relative">
          <input
            id="admin-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            autoFocus
            defaultValue=""
            placeholder="nelakranthinaturals@gmail.com"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#ded5c5] bg-[#fcfaf6] text-base sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
          />
          <svg
            className="w-4 h-4 text-[#7d6c56] absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label
          htmlFor="admin-password"
          className="block text-xs font-semibold uppercase tracking-wider text-[#3f4e46] mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            placeholder="••••••••••••"
            className="w-full pl-9 pr-12 py-2.5 rounded-xl border border-[#ded5c5] bg-[#fcfaf6] text-base sm:text-sm text-[#1b4332] placeholder-[#8d7c68] focus:border-[#2d6a4f] focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2d6a4f]/20 transition-all"
          />
          <svg
            className="w-4 h-4 text-[#7d6c56] absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>

          {/* Toggle show/hide password */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-[#7d6c56] hover:text-[#1b4332] absolute right-1 top-1/2 -translate-y-1/2 rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-[#2d6a4f]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 min-h-[44px] sm:min-h-0 rounded-full bg-[#2d6a4f] text-[#fcfaf6] text-sm font-semibold hover:bg-[#1b4332] transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#2d6a4f]"
        >
          {isPending ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l3 3m0 0l-3 3m3-3H2.25"
                />
              </svg>
              <span>Sign In as Administrator</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
