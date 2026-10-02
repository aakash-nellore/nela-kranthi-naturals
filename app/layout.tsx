import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nelakranthinaturals.com"
  ),
  title: {
    default: "Nela Kranthi Naturals | Naturally Processed Foods & Powders",
    template: "%s | Nela Kranthi Naturals",
  },
  description:
    "Naturally processed fruits, vegetables, leafy greens and food powders, prepared with care in Sydapuram, Nellore District, Andhra Pradesh.",
  keywords: [
    "Nela Kranthi Naturals",
    "natural foods",
    "dehydrated foods",
    "food powders",
    "solar dehydration",
    "Sydapuram",
    "Nellore",
    "Andhra Pradesh",
  ],
  authors: [{ name: "Nela Kranthi Naturals" }],
  creator: "Nela Kranthi Naturals",
  publisher: "Nela Kranthi Naturals",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Nela Kranthi Naturals | Naturally Processed Foods & Powders",
    description:
      "Naturally processed fruits, vegetables, leafy greens and food powders, prepared with care in Sydapuram, Nellore District, Andhra Pradesh.",
    url: "https://nelakranthinaturals.com",
    siteName: "Nela Kranthi Naturals",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fcfaf6] text-[#212529]">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
