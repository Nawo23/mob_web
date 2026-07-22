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

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Services />
      <GrowthStats />
      <WhyChoose />
      <Process />
      <FeaturedProjects />
      <Testimonials />
      <PricingPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
