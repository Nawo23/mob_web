import type { Metadata } from "next";
import ProjectsHero from "@/components/sections/projects/ProjectsHero";
import ProjectsGrid from "@/components/sections/projects/ProjectsGrid";
import CaseStudySpotlight from "@/components/sections/projects/CaseStudySpotlight";
import Testimonials from "@/components/sections/home/Testimonials";
import CTASection from "@/components/sections/home/CTASection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse MetaCraze's portfolio of social growth, paid media, branding, content and web projects — with real client results.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsGrid />
      <CaseStudySpotlight />
      <Testimonials />
      <CTASection />
    </>
  );
}
