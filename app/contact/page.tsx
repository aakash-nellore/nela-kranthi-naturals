import type { Metadata } from "next";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact & Inquiries",
  description:
    "Get in touch with Nela Kranthi Naturals, Sydapuram, Nellore District, Andhra Pradesh. Send your product requirements and wholesale enquiries directly.",
  openGraph: {
    title: "Contact & Inquiries | Nela Kranthi Naturals",
    description:
      "Get in touch with Nela Kranthi Naturals, Sydapuram, Nellore District, Andhra Pradesh. Send your product requirements and wholesale enquiries directly.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fcfaf6]">
      <ContactSection />
    </main>
  );
}
