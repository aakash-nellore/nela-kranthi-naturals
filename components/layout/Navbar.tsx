"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Solar Dehydration", href: "/solar-dehydration" },
  { label: "Bulk Orders", href: "/bulk-orders" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full shadow-xs">
      {/* Top Announcement & Contact Bar */}
      <div className="bg-[#1b4332] text-[#f4efe6] px-4 py-2 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="font-medium tracking-wide">
              100% Pure, Chemical-Free Natural Foods • Sourced from Sydapuram, Nellore
            </p>
          </div>
          <div className="flex items-center gap-4 text-emerald-100">
            <a
              href="tel:+917207717966"
              className="hover:text-white transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 rounded-sm"
              aria-label="Call Nela Kranthi Naturals at +91 72077 17966"
            >
              <svg
                className="w-3.5 h-3.5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
              </svg>
              <span>+91 72077 17966</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className="bg-[#fcfaf6] border-b border-[#e8dfd1] backdrop-blur-md bg-opacity-95"
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo / Brand Name */}
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-[#2d6a4f] focus-visible:outline-offset-4 rounded-md"
              aria-label="Nela Kranthi Naturals Home"
            >
              <div className="w-11 h-11 rounded-full bg-[#2d6a4f] flex items-center justify-center text-[#fcfaf6] shadow-sm transition-transform group-hover:scale-105">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1b4332] leading-tight">
                  Nela Kranthi
                </span>
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#52796f]">
                  Naturals • Sydapuram
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <ul className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative focus-visible:outline-2 focus-visible:outline-[#2d6a4f] focus-visible:outline-offset-2 ${
                        isActive
                          ? "text-[#1b4332] font-semibold bg-[#e9f1ed]"
                          : "text-[#3f4e46] hover:text-[#1b4332] hover:bg-[#f3ede3]"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2d6a4f] rounded-full" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop Action Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-full bg-[#2d6a4f] text-[#fcfaf6] hover:bg-[#1b4332] transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#2d6a4f] focus-visible:outline-offset-2"
              >
                Inquire Now
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-md text-[#1b4332] hover:bg-[#f3ede3] focus-visible:outline-2 focus-visible:outline-[#2d6a4f] focus-visible:outline-offset-2 transition-colors"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close main menu" : "Open main menu"}
              >
                <span className="sr-only">
                  {isOpen ? "Close menu" : "Open menu"}
                </span>
                {isOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t border-[#e8dfd1] bg-[#fcfaf6] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200"
          >
            <ul className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? "bg-[#e9f1ed] text-[#1b4332] font-semibold"
                          : "text-[#3f4e46] hover:bg-[#f3ede3] hover:text-[#1b4332]"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 pt-4 border-t border-[#e8dfd1] flex flex-col gap-2">
              <a
                href="tel:+917207717966"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#2d6a4f] text-[#2d6a4f] font-semibold text-sm hover:bg-[#e9f1ed] transition-colors"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                Call: +91 72077 17966
              </a>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#2d6a4f] text-[#fcfaf6] font-semibold text-sm hover:bg-[#1b4332] transition-colors shadow-xs"
              >
                Contact & Inquiries
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;

