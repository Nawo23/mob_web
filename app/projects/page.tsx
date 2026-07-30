import type { Metadata } from "next";
import prisma from "@/lib/db";
import { toLegacyProject } from "@/lib/project-adapter";
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

export default async function ProjectsPage() {
  const dbProjects = await prisma.project.findMany({ orderBy: [{ order: "asc" }, { createdAt: "desc" }] });
  const projects = dbProjects.map(toLegacyProject);

  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <ProjectsHero />
      <ProjectsGrid projects={projects} />
      <CaseStudySpotlight />
      <Testimonials testimonials={testimonials} />
      <CTASection />
    </>
  );
}