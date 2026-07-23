"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track scroll progress through the section (0 = entering viewport, 1 = leaving viewport)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Map scroll progress to a 0 -> 100 -> 0 sweep, so it slides across and back
  const autoPos = useTransform(scrollYProgress, [0, 0.5, 1], [15, 85, 15]);

  useMotionValueEvent(autoPos, "change", (latest) => {
    if (!userInteracted) {
      setPos(latest);
    }
  });

  const updatePos = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden select-none cursor-ew-resize"
      onMouseDown={(e) => {
        dragging.current = true;
        setUserInteracted(true);
        updatePos(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && updatePos(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={() => setUserInteracted(true)}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      <Image src={after} alt={afterLabel} fill className="object-cover" />
      <span className="absolute bottom-4 right-4 rounded-full glass-dark px-3 py-1.5 text-[11px] font-semibold text-white">
        {afterLabel}
      </span>

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: width || "100%" }}>
          <Image src={before} alt={beforeLabel} fill className="object-cover" />
        </div>
        <span className="absolute bottom-4 left-4 rounded-full glass-dark px-3 py-1.5 text-[11px] font-semibold text-white">
          {beforeLabel}
        </span>
      </div>

      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xl text-mc-black">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}