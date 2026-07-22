import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/data";

export default function ServicesHero() {
  return (
    <section className="relative pt-20 pb-24 lg:pt-24 lg:pb-28 bg-mc-black text-white overflow-hidden noise-bg">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-mc-red/25 blur-[130px]" />

      <div className="container-mc relative">
        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6">
            Services
          </span>
        </Reveal>
        <Reveal direction="up" delay={0.08}>
          <h1 className="font-display font-semibold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-3xl">
            Every discipline your growth needs, under one roof.
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.16}>
          <p className="mt-7 text-white/60 text-lg max-w-xl">
            {SERVICES.length} specialised services working as one system — strategy, content and paid
            media that compound instead of competing for credit.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.24}>
          <div className="mt-12 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/70 hover:border-mc-red hover:text-white transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
