"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";

const CATEGORIES = ["All", "Social Growth", "Paid Media", "Branding", "Content", "Web"] as const;

export default function ProjectsGrid() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="py-10 lg:py-12">
      <div className="container-mc">
        <Reveal direction="up" className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === cat ? "bg-mc-red text-white" : "bg-mc-gray-100 text-mc-gray-600 hover:bg-mc-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 [&>*]:mb-6">
          {filtered.map((project, i) => (
            <motion.div
              layout
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="group relative rounded-3xl overflow-hidden break-inside-avoid"
            >
              <Link href={`/projects/${project.slug}`} className={`relative block ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/4.4]"}`}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mc-black via-mc-black/10 to-transparent opacity-90" />

                <span className="absolute top-5 left-5 rounded-full glass-dark px-3 py-1.5 text-[11px] font-semibold text-white">
                  {project.category}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs text-white/60 mb-1">{project.client}</p>
                  <h3 className="font-display text-lg font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 overflow-hidden">
                    {project.result}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-display font-semibold text-mc-red-glow">{project.metric.value}</p>
                      <p className="text-[11px] text-white/50">{project.metric.label}</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-mc-black opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
