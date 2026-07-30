import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/db";
import { toLegacyProject } from "@/lib/project-adapter";
import ProjectDetailHero from "@/components/sections/projects/ProjectDetailHero";
import ProjectDetailBody from "@/components/sections/projects/ProjectDetailBody";
import ProjectDetailFooterSections from "@/components/sections/projects/ProjectDetailFooterSections";
import CTASection from "@/components/sections/home/CTASection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbProject = await prisma.project.findUnique({ where: { slug } });
  if (!dbProject) return { title: "Project Not Found" };

  return {
    title: dbProject.title,
    description: dbProject.result ?? dbProject.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbProject = await prisma.project.findUnique({ where: { slug } });

  if (!dbProject) notFound();

  const project = toLegacyProject(dbProject);

  const relatedDb = await prisma.project.findMany({
    where: { slug: { not: slug }, category: dbProject.category },
    take: 3,
  });

  let related = relatedDb;
  if (related.length === 0) {
    related = await prisma.project.findMany({ where: { slug: { not: slug } }, take: 3 });
  }

  const relatedProjects = related.map(toLegacyProject);

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectDetailBody project={project} />
      <ProjectDetailFooterSections project={project} relatedProjects={relatedProjects} />
      <CTASection />
    </>
  );
}