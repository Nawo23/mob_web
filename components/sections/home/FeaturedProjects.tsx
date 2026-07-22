"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS } from "@/lib/data";

const CATEGORIES = ["All", "Social Growth", "Paid Media", "Branding", "Content", "Web"] as const;

export default function FeaturedProjects() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = active === "All" ? PROJECTS.slice(0, 6) : PROJECTS.filter((p) => p.category === active).slice(0, 6);

  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <SectionHeading
            eyebrow="Featured Work"
            title="Campaigns that moved real business numbers"
            description="A glimpse at the brands we've helped grow — from first strategy call to compounding results."
          />
        </div>

        <Reveal direction="up" className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === cat ? "bg-mc-black text-white" : "bg-mc-gray-100 text-mc-gray-600 hover:bg-mc-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5]"
            >
              <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View case study for ${project.client}`} />
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mc-black via-mc-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="rounded-full glass-dark px-3 py-1.5 text-[11px] font-semibold text-white">
                  {project.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-white/60 mb-1">{project.client}</p>
                <h3 className="font-display text-lg font-semibold text-white mb-3">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-display font-semibold text-mc-red-glow">{project.metric.value}</p>
                    <p className="text-[11px] text-white/50">{project.metric.label}</p>
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-mc-black opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`View case study for ${project.client}`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Reveal direction="up" className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-mc-gray-200 px-6 py-3.5 text-sm font-semibold hover:border-mc-red hover:text-mc-red transition-colors"
          >
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
