"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { TEAM } from "@/lib/data";

export default function TeamGrid() {
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
          {TEAM.map((member, i) => (
            <Reveal key={member.name} direction="up" delay={i * 0.06}>
              <motion.div whileHover={{ y: -6 }} className="group relative rounded-3xl overflow-hidden aspect-[3/4]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
  <div className="flex items-end justify-between">
    <div>
      <h3 className="font-display text-lg font-semibold text-white">{member.name}</h3>
      <p className="text-sm text-white/60">{member.role}</p>
    </div>
    <a href="#" aria-label={`${member.name} on LinkedIn`}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
      <Linkedin className="h-4 w-4" />
    </a>
  </div>
  <p className="text-sm text-white/80 leading-relaxed mt-3 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-3 overflow-hidden transition-all duration-500 ease-out">
    {member.bio}
  </p>
</div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
