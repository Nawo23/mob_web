import type { Metadata } from "next";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesList from "@/components/sections/services/ServicesList";
import PricingPreview from "@/components/sections/home/PricingPreview";
import FAQSection from "@/components/sections/home/FAQSection";
import CTASection from "@/components/sections/home/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore MetaCraze's full range of social media marketing services — from content creation and paid media to SEO, branding and web development.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <PricingPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
