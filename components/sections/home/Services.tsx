"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FEATURED_SERVICES } from "@/lib/data";

export default function Services() {
  const sectionRef = useRef(null);

  // Track scroll progress across the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // RIGHT image: scroll down -> moves up, scroll up -> moves down
  const rightY = useTransform(scrollYProgress, [0, 1], ["18%", "-18%"]);
  // LEFT image: opposite -> scroll down -> moves down, scroll up -> moves up
  const leftY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  return (
    <section
      ref={sectionRef}
      className="py-10 lg:py-18 relative overflow-hidden"
    >
      {/* subtle ambient backdrop for a more premium feel */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-mc-red/[0.03] blur-[120px] -z-10" />

      <div className="container-mc">
        {/* Centered heading block */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* eyebrow */}
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-mc-red bg-mc-red/10 px-4 py-2 rounded-full mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-mc-red" />
            WHAT WE DO
          </span>

          {/* Title — animates in from the right */}
          <motion.h2
            initial={{ opacity: 0, x: 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-mc-black max-w-3xl"
          >
            Growth services built for every stage of the funnel
          </motion.h2>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-mc-gray-600 leading-relaxed max-w-xl mt-5"
          >
            From content that stops the scroll to paid media that scales it,
            we cover the full growth stack under one roof.
          </motion.p>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-mc-black hover:text-mc-red transition-colors mt-6"
          >
            View all services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Left image | 2x3 service card grid | Right image */}
        <div className="grid lg:grid-cols-[1fr_2.2fr_1fr] gap-8 lg:gap-10 items-start">
          {/* LEFT parallax image — fixed height, not affected by card sizing */}
          <motion.div
            style={{ y: leftY }}
            className="hidden lg:block relative h-[560px] rounded-3xl overflow-hidden shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)]"
          >
            <Image
              src="/images/left side.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, 0vw"
              className="object-cover"
            />
          </motion.div>

          {/* MIDDLE — 2 columns x 3 rows of service cards (smaller) */}
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURED_SERVICES.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="group relative h-full rounded-2xl bg-white p-5 overflow-hidden shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_-12px_rgba(229,9,20,0.15)] transition-shadow duration-500"
              >
                {/* decorative glow on hover */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mc-red/0 group-hover:bg-mc-red/10 transition-colors duration-500 blur-3xl" />

                {/* faint corner number */}
                <span className="absolute top-4 right-5 font-display text-2xl font-bold text-mc-gray-100 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <motion.div
                  whileHover={{ rotate: 6, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mc-black to-mc-black/80 text-white mb-4 group-hover:from-mc-red group-hover:to-mc-red/80 transition-colors duration-300 shadow-lg"
                >
                  <service.icon className="h-4.5 w-4.5" />
                </motion.div>

                <h3 className="relative font-display text-base font-semibold mb-1.5 tracking-tight">
                  {service.title}
                </h3>
                <p className="relative text-xs text-mc-gray-600 leading-relaxed mb-4">
                  {service.short}
                </p>

                <Link
                  href="/services"
                  className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-mc-black group-hover:text-mc-red transition-colors"
                >
                  Learn More
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>

                {/* bottom accent line */}
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-mc-red group-hover:w-full transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* RIGHT parallax image — fixed height, not affected by card sizing */}
          <motion.div
            style={{ y: rightY }}
            className="hidden lg:block relative h-[560px] rounded-3xl overflow-hidden shadow-[0_2px_16px_-4px_rgba(0,0,0,0.06)]"
          >
            <Image
              src="/images/rightside.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 20vw, 0vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}