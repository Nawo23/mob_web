"use client";

import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  TrendingUp,
  Users2,
  ArrowUpRight,
  Play,
  Sparkles,
  Zap,
  Target,
  BarChart3,
  Megaphone,
  Rocket,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/Button";
import CountUp from "react-countup";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const floaters = [
  { Icon: Instagram, className: "top-[8%] -left-4 animate-float", delay: 0 },
  { Icon: Facebook, className: "top-[26%] -left-10 animate-float-delay", delay: 0.2 },
  { Icon: Youtube, className: "bottom-[26%] -left-8 animate-float-slow", delay: 0.4 },
  { Icon: Linkedin, className: "top-[8%] -right-4 animate-float-slow", delay: 0.3 },
  { Icon: XIcon, className: "bottom-[8%] -right-6 animate-float", delay: 0.5 },
];

const marqueeItems = [
  { label: "Social Strategy", Icon: Sparkles },
  { label: "Paid Media", Icon: Target },
  { label: "Content Creation", Icon: Megaphone },
  { label: "Performance Ads", Icon: BarChart3 },
  { label: "Growth Systems", Icon: Rocket },
  { label: "Creative That Converts", Icon: Zap },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spotlightX = useTransform(mx, (v) => `${v * 100}%`);
  const spotlightY = useTransform(my, (v) => `${v * 100}%`);

  const tiltX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 120, damping: 20 });

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const spotlightBackground = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(229,9,20,0.07), transparent 65%)`
  );

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative min-h-screen flex flex-col justify-center pt-18 pb-20 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24 overflow-hidden"
    >
      {/* Ambient aurora + spotlight background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] w-[600px] sm:h-[680px] sm:w-[980px] rounded-full bg-gradient-to-br from-mc-red/25 via-mc-red/8 to-transparent blur-[110px] animate-aurora" />
        <div className="absolute top-1/4 -right-24 h-60 w-60 sm:h-96 sm:w-96 rounded-full bg-mc-red/15 blur-[100px] animate-aurora-slow" />
        <div className="absolute bottom-0 left-[-6%] h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-mc-ink/10 blur-[90px] animate-aurora" />

        <motion.div
          className="absolute inset-0 opacity-70 mix-blend-multiply"
          style={{ background: spotlightBackground }}
        />

        <div
          className="absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--mc-gray-100) 1px, transparent 1px), linear-gradient(to bottom, var(--mc-gray-100) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 65% 55% at 50% 15%, black 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="container-mc grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* ---------- Left: copy ---------- */}
        <div className="lg:col-span-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-2 text-[11px] sm:text-xs font-semibold text-mc-ink mb-6 sm:mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mc-red opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mc-red" />
            </span>
            Now booking Q3 2026 growth partners
          </motion.div>

          <h1 className="font-display font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] sm:leading-[1.05]">
            {["Grow Faster with", "Creative Social"].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block text-gradient"
              >
                Media Marketing
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-5 sm:mt-7 text-base sm:text-lg text-mc-gray-600 leading-relaxed max-w-lg"
          >
            MetaCraze is the strategy, content and performance-media team behind brands that turn
            attention into revenue — built for businesses ready to grow in public.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} className="relative">
              <Button
                href="/services"
                variant="primary"
                icon={<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                className="relative overflow-hidden"
              >
                View Services
              </Button>
              <span className="pointer-events-none absolute inset-0 rounded-full overflow-hidden">
                <span className="absolute inset-y-0 left-0 w-1/3 bg-white/25 animate-shine" />
              </span>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button href="/contact" variant="outline" icon={<Play className="h-4 w-4" />}>
                Start Your Growth
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 sm:mt-14 flex items-center gap-5 sm:gap-8"
          >
            <div>
              <p className="font-display text-2xl sm:text-3xl font-semibold">
                <CountUp end={140} duration={2} />+
              </p>
              <p className="text-[11px] sm:text-xs text-mc-gray-600 mt-1">Brands grown</p>
            </div>
            <div className="h-9 sm:h-10 w-px bg-mc-gray-200 shrink-0" />
            <div>
              <p className="font-display text-2xl sm:text-3xl font-semibold">
                <CountUp end={280} duration={2} />%
              </p>
              <p className="text-[11px] sm:text-xs text-mc-gray-600 mt-1">Avg. follower growth</p>
            </div>
            <div className="h-9 sm:h-10 w-px bg-mc-gray-200 shrink-0" />
            <div>
              <p className="font-display text-2xl sm:text-3xl font-semibold">
                <CountUp end={4.9} decimals={1} duration={2} />★
              </p>
              <p className="text-[11px] sm:text-xs text-mc-gray-600 mt-1">Client rating</p>
            </div>
          </motion.div>

          {/* Marquee ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-10 sm:mt-12 relative w-full max-w-lg overflow-hidden rounded-full border border-mc-gray-200 bg-mc-gray-50/80 py-2.5"
            style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <div className="flex w-max gap-6 sm:gap-8 animate-marquee" style={{ animationDuration: "22s" }}>
              {[...marqueeItems, ...marqueeItems].map(({ label, Icon }, i) => (
                <span key={i} className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-mc-gray-600 whitespace-nowrap">
                  <Icon className="h-3.5 w-3.5 text-mc-red shrink-0" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Right: bento showcase (hidden on mobile/tablet) ---------- */}
        <div className="lg:col-span-6 relative h-[600px] hidden md:block">
          {floaters.map(({ Icon, className, delay }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + delay }}
              className={`absolute z-30 flex h-12 w-12 items-center justify-center rounded-2xl glass shadow-lg ${className}`}
            >
              <Icon className="h-5 w-5 text-mc-red" />
            </motion.div>
          ))}

          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[460px] w-[460px] rounded-full border border-dashed border-mc-gray-200 animate-spin-slow" />
            <div className="absolute h-[340px] w-[340px] rounded-full border border-mc-gray-100" />
          </div>

          {/* Main video showcase card — original Pinterest embed kept as-is */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1200 }}
            className="absolute left-1/2 top-8 -translate-x-1/2 w-[280px] rounded-[2rem] border-8 border-mc-black bg-mc-black shadow-2xl z-10"
          >
            <div className="rounded-[1.4rem] overflow-hidden bg-black relative">
              <iframe
                src="https://assets.pinterest.com/ext/embed.html?id=891712794989814923"
                title="Social content showcase"
                width="280"
                height="440"
                frameBorder="0"
                scrolling="no"
                loading="lazy"
                className="w-full h-[440px] border-0"
              />
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[1.4rem]" />
            </div>
            <div className="absolute -top-4 -right-6 glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg">
              <Users2 className="h-3.5 w-3.5 text-mc-red" />
              <span className="text-[11px] font-semibold">+12.4K today</span>
            </div>
          </motion.div>

          {/* Growth chart card */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            whileHover={{ y: -4 }}
            className="absolute left-0 bottom-24 w-64 rounded-2xl glass p-5 shadow-xl z-20"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-mc-gray-600">Revenue Growth</span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" /> +64%
              </span>
            </div>
            <svg viewBox="0 0 220 70" className="w-full h-16">
              <defs>
                <linearGradient id="heroChart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e50914" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#e50914" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,55 C30,50 40,20 70,25 C100,30 110,10 140,15 C170,20 180,5 220,8"
                fill="none"
                stroke="#e50914"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 1.2, ease: "easeInOut" }}
              />
              <path
                d="M0,55 C30,50 40,20 70,25 C100,30 110,10 140,15 C170,20 180,5 220,8 L220,70 L0,70 Z"
                fill="url(#heroChart)"
              />
            </svg>
          </motion.div>

          {/* Engagement ring card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            whileHover={{ y: -4 }}
            className="absolute right-2 bottom-0 w-40 rounded-2xl glass p-4 shadow-xl z-20 text-center"
          >
            <p className="text-[11px] font-semibold text-mc-gray-600 mb-2">Engagement</p>
            <p className="font-display text-2xl font-semibold text-mc-red">
              <CountUp end={9.4} decimals={1} duration={2} />%
            </p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-mc-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 1.2, delay: 1.35 }}
                className="h-full bg-mc-red rounded-full"
              />
            </div>
          </motion.div>

          {/* Small floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="absolute right-10 top-4 glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg z-20"
          >
            <Sparkles className="h-3.5 w-3.5 text-mc-red" />
            <span className="text-[11px] font-semibold">AI-assisted content</span>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-mc-gray-400"
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-scroll-cue" />
      </motion.div>
    </section>
  );
}