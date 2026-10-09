import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SITE_CONTACT } from "@/lib/constants";

interface FooterLink {
  label: string;
  href: string;
}

const navLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Solar Dehydration", href: "/solar-dehydration" },
  { label: "Bulk Orders", href: "/bulk-orders" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer
      className="bg-[#122e22] text-[#f4efe6] border-t border-[#1f4a36]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Brand & Philosophy (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Brand Logo & Name */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 rounded-md"
              aria-label="Nela Kranthi Naturals Home"
            >
              <BrandLogo variant="footer" />
            </Link>

            {/* Description */}
            <p className="mt-4 text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Naturally processed and solar-dehydrated foods from Sydapuram,
              Nellore, Andhra Pradesh.
            </p>

            {/* Origin Pill */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b4332] border border-[#2d6a4f] text-xs font-medium text-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Sydapuram, Nellore District</span>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols on desktop) */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-emerald-100/80 hover:text-white hover:underline transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-xs"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details & Direct Actions (4 cols on desktop) */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-base font-bold text-white tracking-wide uppercase text-xs">
              Contact Us
            </h3>

            <address className="not-italic mt-4 space-y-3.5 text-sm text-emerald-100/80">
              {/* Location */}
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  Nela Kranthi Naturals
                  <br />
                  Sydapuram, Nellore District, Andhra Pradesh, India
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-emerald-300 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href={SITE_CONTACT.telLink}
                  className="text-white hover:underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-xs"
                >
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-emerald-300 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href={SITE_CONTACT.mailto}
                  className="text-white hover:underline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-xs break-all"
                  aria-label={`Email Nela Kranthi Naturals at ${SITE_CONTACT.email}`}
                >
                  {SITE_CONTACT.email}
                </a>
              </div>

              {/* WhatsApp Quick Action */}
              <div className="pt-2">
                <a
                  href={SITE_CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-[#0a2e1c] font-bold text-xs hover:bg-[#20bd5a] transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                >
                  <svg
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.781-.879-2.057-.98-.276-.1-.477-.15-.678.15-.201.3-.778.98-.954 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.787-1.675-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.509-.678-.518l-.578-.01c-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.911 1.23 3.112.15.201 2.124 3.243 5.145 4.548.719.311 1.281.497 1.719.636.722.23 1.378.197 1.898.12.579-.086 1.781-.728 2.032-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351zM12.04 2C6.495 2 2 6.495 2 12.04c0 1.85.5 3.585 1.372 5.083L2 22l5.025-1.317a9.99 9.99 0 0 0 5.015 1.357c5.545 0 10.04-4.495 10.04-10.04C22.08 6.495 17.585 2 12.04 2zm0 18.243a8.195 8.195 0 0 1-4.18-1.144l-.3-.178-3.107.815.83-3.029-.196-.312A8.188 8.188 0 0 1 3.847 12.04c0-4.52 3.674-8.193 8.193-8.193 4.52 0 8.193 3.673 8.193 8.193 0 4.52-3.673 8.203-8.193 8.203z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="border-t border-[#1f4a36] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/70">
          <p>© 2026 Nela Kranthi Naturals. All rights reserved.</p>
          <p className="font-medium text-emerald-300/80">
            Sydapuram, Nellore • Andhra Pradesh
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
