import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Portal | Nela Kranthi Naturals",
    template: "%s | Admin | Nela Kranthi Naturals",
  },
  description:
    "Administration portal for managing Nela Kranthi Naturals solar-dehydrated products, catalogue availability, and content.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex flex-col bg-[#fcfaf6]">
      {children}
    </div>
  );
}
