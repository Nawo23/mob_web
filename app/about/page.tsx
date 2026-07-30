import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import MissionVision from "@/components/sections/about/MissionVision";
import Timeline from "@/components/sections/about/Timeline";
import Achievements from "@/components/sections/about/Achievements";
import TeamGrid from "@/components/sections/about/TeamGrid";
import prisma from "@/lib/db";
import CreativeCulture from "@/components/sections/about/CreativeCulture";
import CTASection from "@/components/sections/home/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "MetaCraze is a social-first growth studio founded in 2018, now a full-service partner for 140+ brands. Meet the team and the story behind the work.",
};

export default async function AboutPage() {
  const teamMembers = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  const companyStats = await prisma.companyStat.findMany({
    where: { type: "stat" },
    orderBy: { order: "asc" },
  });
  const missionVision = await prisma.companyStat.findMany({
    where: { type: "vision_mission" },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <AboutHero />
      <MissionVision items={missionVision} />
      <Timeline />
      <Achievements stats={companyStats} />
      <TeamGrid members={teamMembers} />
      <CreativeCulture />
      <CTASection />
    </>
  );
}