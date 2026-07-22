import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/lib/data";
import ProjectDetailHero from "@/components/sections/projects/ProjectDetailHero";
import ProjectDetailBody from "@/components/sections/projects/ProjectDetailBody";
import ProjectDetailFooterSections from "@/components/sections/projects/ProjectDetailFooterSections";
import CTASection from "@/components/sections/home/CTASection";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.result,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectDetailBody project={project} />
      <ProjectDetailFooterSections project={project} />
      <CTASection />
    </>
  );
}
