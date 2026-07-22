"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FEATURED_SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-mc">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeading
            eyebrow="What We Do"
            title="Growth services built for every stage of the funnel"
            description="From content that stops the scroll to paid media that scales it, we cover the full growth stack under one roof."
          />
          <Reveal direction="left">
            <Link
              href="/services"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-mc-black hover:text-mc-red transition-colors shrink-0"
            >
              View all services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_SERVICES.map((service, i) => (
            <Reveal key={service.slug} direction="up" delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full rounded-3xl border border-mc-gray-200 bg-white p-7 overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mc-red/0 group-hover:bg-mc-red/10 transition-colors duration-500 blur-2xl" />
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-mc-black text-white mb-6 group-hover:bg-mc-red transition-colors duration-300"
                >
                  <service.icon className="h-5 w-5" />
                </motion.div>
                <h3 className="relative font-display text-xl font-semibold mb-2.5">{service.title}</h3>
                <p className="relative text-sm text-mc-gray-600 leading-relaxed mb-6">{service.short}</p>
                <Link
                  href="/services"
                  className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-mc-black group-hover:text-mc-red transition-colors"
                >
                  Learn More
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" className="mt-10 lg:hidden">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-mc-red">
            View all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
