"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  short: string | null;
  icon: string | null;
};

export default function Services({ services }: { services: ServiceItem[] }) {
  if (services.length === 0) return null;

  return (
    <section className="py-10 lg:py-18 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-mc-red/[0.03] blur-[120px] -z-10" />

      <div className="container-mc">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-mc-red bg-mc-red/10 px-4 py-2 rounded-full mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-mc-red" />
            WHAT WE DO
          </span>

          <motion.h2
            initial={{ opacity: 0, x: 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-mc-black max-w-3xl"
          >
            Growth services built for every stage of the funnel
          </motion.h2>

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative h-full rounded-2xl bg-white p-7 overflow-hidden border border-mc-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-mc-red/30 hover:shadow-[0_24px_48px_-16px_rgba(229,9,20,0.18)] transition-all duration-500"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-mc-red/0 group-hover:bg-mc-red/10 transition-colors duration-500 blur-3xl" />

              <span className="absolute top-5 right-6 font-display text-3xl font-bold text-mc-gray-100 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <motion.div
                whileHover={{ rotate: 6, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-mc-black to-mc-black/80 text-white mb-5 group-hover:from-mc-red group-hover:to-mc-red/80 transition-colors duration-300 shadow-lg overflow-hidden"
              >
                {service.icon ? (
                  <Image src={service.icon} alt="" fill className="object-cover" />
                ) : (
                  <Sparkles className="h-5 w-5" />
                )}
              </motion.div>

              <h3 className="relative font-display text-lg font-semibold mb-2 tracking-tight">
                {service.title}
              </h3>
              {service.short && (
                <p className="relative text-sm text-mc-gray-600 leading-relaxed mb-5">
                  {service.short}
                </p>
              )}

              <Link
                href="/services"
                className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-mc-black group-hover:text-mc-red transition-colors"
              >
                Learn More
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <span className="absolute bottom-0 left-0 h-1 w-0 bg-mc-red group-hover:w-full transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}