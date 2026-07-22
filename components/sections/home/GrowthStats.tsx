"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "@/components/ui/SectionHeading";
import Stat from "@/components/ui/Stat";
import Reveal from "@/components/ui/Reveal";
import { GROWTH_STATS } from "@/lib/data";

const bars = [40, 58, 46, 70, 62, 85, 78, 96];

export default function GrowthStats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-20 lg:py-28 bg-mc-black text-white relative overflow-hidden noise-bg">
      <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-mc-red/20 blur-[120px]" />
      <div className="container-mc relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              eyebrow="Business Growth"
              title="Growth you can point to on a graph"
              description="Every campaign is measured against real business outcomes — not vanity metrics. Here's what the average MetaCraze client sees."
              light
            />
            <div className="grid grid-cols-4 gap-4 mt-12 max-w-xl">
              {GROWTH_STATS.map((s) => (
                <Reveal key={s.label} direction="up">
                  <Stat value={s.value} suffix={s.suffix} label={s.label} light compact />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal direction="scale">
            <div className="relative rounded-3xl glass-dark p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs text-white/40 mb-1">Monthly conversions</p>
                  <p className="font-display text-3xl font-semibold">+186%</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold px-3 py-1.5">
                  On track
                </span>
              </div>

              <div ref={ref} className="flex items-end gap-3 h-40">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: inView ? `${h}%` : 0 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-mc-red to-mc-red-glow"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[11px] text-white/30">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
