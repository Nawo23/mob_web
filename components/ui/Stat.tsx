"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

export default function Stat({
  value,
  suffix = "",
  prefix = "",
  label,
  light = false,
  decimals = 0,
  compact = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  light?: boolean;
  decimals?: number;
  compact?: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div ref={ref}>
      <div
        className={`font-display font-semibold tracking-tight ${compact ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"} ${
          light ? "text-white" : "text-mc-black"
        }`}
      >
        {prefix}
        {inView ? <CountUp end={value} duration={2} decimals={decimals} separator="," /> : 0}
        {suffix}
      </div>
      <div className={`mt-2 text-sm ${light ? "text-white/50" : "text-mc-gray-600"}`}>{label}</div>
    </div>
  );
}
