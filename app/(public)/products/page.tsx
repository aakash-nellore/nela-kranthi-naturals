import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/products/ProductGrid";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Natural Foods & Solar-Dehydrated Powders",
  description:
    "Explore our range of naturally processed fruits, vegetables, leafy greens, and food powders. Sourced and solar-dehydrated with care in Sydapuram, Nellore.",
  openGraph: {
    title: "Natural Foods & Solar-Dehydrated Powders | Nela Kranthi Naturals",
    description:
      "Explore our range of naturally processed fruits, vegetables, leafy greens, and food powders. Sourced and solar-dehydrated with care in Sydapuram, Nellore.",
    url: "/products",
  },
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen bg-[#fcfaf6] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e9f1ed] border border-[#cfe1d7] text-[#1b4332] text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f]" />
            <span>Farm Sourced • Naturally Dehydrated</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b4332] tracking-tight">
            Natural Foods, Carefully Dehydrated
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#3f4e46] leading-relaxed">
            Explore our range of naturally processed fruits, vegetables, leafy
            greens and food powders.
          </p>
        </div>

        {/* Interactive Filterable Products Grid */}
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
