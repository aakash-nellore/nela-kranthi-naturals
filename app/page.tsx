import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SolarDehydration from "@/components/home/SolarDehydration";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutPreview from "@/components/home/AboutPreview";
import BulkOrders from "@/components/home/BulkOrders";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturedProducts />
      <SolarDehydration />
      <WhyChooseUs />
      <AboutPreview />
      <BulkOrders />
      <ContactSection />
    </main>
  );
}
