import type { Metadata } from "next";
import prisma from "@/lib/db";
import ServicesHero from "@/components/sections/services/ServicesHero";
import ServicesList from "@/components/sections/services/ServicesList";
import PricingPreview from "@/components/sections/home/PricingPreview";
import FAQSection from "@/components/sections/home/FAQSection";
import CTASection from "@/components/sections/home/CTASection";
import { requireAccess } from "@/lib/auth";


export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore MetaCraze's full range of social media marketing services — from content creation and paid media to SEO, branding and web development.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const pricingPackages = await prisma.pricingPackage.findMany({ orderBy: { order: "asc" } });
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <PricingPreview packages={pricingPackages} />
      <FAQSection />
      <CTASection />
    </>
  );
}
