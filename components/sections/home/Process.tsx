"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/data";

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-8 lg:py-12 bg-mc-gray-50">
      <div className="container-mc">
        <SectionHeading
          eyebrow="Our Process"
          title="A five-stage system, refined over 140+ brands"
          description="The same disciplined process behind every account — from first audit to compounding growth."
        />

        <div ref={ref} className="relative mt-20">
          <div className="hidden lg:block absolute top-6 left-12 w-[calc(80%-1.8rem)] h-px bg-mc-gray-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: inView ? "100%" : 0 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="h-px bg-mc-red"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal key={step.title} direction="up" delay={i * 0.12}>
                <div className="relative">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-mc-black text-white mb-6">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold text-mc-red tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold mt-2 mb-2">{step.title}</h3>
                  <p className="text-sm text-mc-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
