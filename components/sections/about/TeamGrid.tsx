"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

type TeamMemberItem = {
  id: string;
  name: string;
  role: string;
  photo: string | null;
  bio: string | null;
  linkedin: string | null;
  instagram: string | null;
};

export default function TeamGrid({ members }: { members: TeamMemberItem[] }) {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc">
        <SectionHeading
          eyebrow="Meet The Team"
          title="The people behind the growth"
          description="A tight, senior team — no juniors learning on your budget."
          align="center"
          className="mx-auto"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {members.map((member, i) => (
            <Reveal key={member.id} direction="up" delay={i * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-mc-gray-100">
                {member.photo && (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">{member.name}</h3>
                      <p className="text-sm text-white/60">{member.role}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {member.linkedin && (

                        <a href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {member.instagram && (

                        <a href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Instagram`}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  {member.bio && (
                    <p className="text-sm text-white/80 leading-relaxed mt-3 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3 overflow-hidden transition-all duration-500 ease-out">
                      {member.bio}
                    </p>
                  )}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div >
    </section >
  );
}