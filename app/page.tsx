import Hero from "@/components/sections/home/Hero";
import TrustedBy from "@/components/sections/home/TrustedBy";
import Services from "@/components/sections/home/Services";
import GrowthStats from "@/components/sections/home/GrowthStats";
import WhyChoose from "@/components/sections/home/WhyChoose";
import Process from "@/components/sections/home/Process";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import Testimonials from "@/components/sections/home/Testimonials";
import PricingPreview from "@/components/sections/home/PricingPreview";
import FAQSection from "@/components/sections/home/FAQSection";
import CTASection from "@/components/sections/home/CTASection";
import prisma from "@/lib/db";

export default async function HomePage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  const logos = await prisma.clientLogo.findMany({ orderBy: { order: "asc" } });
  const pricingPackages = await prisma.pricingPackage.findMany({ orderBy: { order: "asc" } });
  const featuredServices = await prisma.service.findMany({ orderBy: { order: "asc" }, take: 6 });
  return (
    <>
      <Hero />
      <TrustedBy logos={logos} />
      <Services services={featuredServices} />
      <GrowthStats />
      <WhyChoose />
      <Process />
      <FeaturedProjects />
      <Testimonials testimonials={testimonials} />
      <PricingPreview packages={pricingPackages} />
      <FAQSection />
      <CTASection />
    </>
  );
}
