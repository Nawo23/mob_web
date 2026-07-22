import Reveal from "@/components/ui/Reveal";

export default function ContactHero() {
  return (
    <section className="relative pt-40 pb-8 lg:pt-48 lg:pb-12 text-center overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-96 w-[800px] rounded-full bg-mc-red/10 blur-[110px]" />
      <div className="container-mc relative">
        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full bg-mc-red/10 text-mc-red px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6">
            Get In Touch
          </span>
        </Reveal>
        <Reveal direction="up" delay={0.08}>
          <h1 className="font-display font-semibold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.02] max-w-3xl mx-auto">
            Let&apos;s talk about where your growth is hiding.
          </h1>
        </Reveal>
        <Reveal direction="up" delay={0.16}>
          <p className="mt-7 text-mc-gray-600 text-lg max-w-xl mx-auto">
            Tell us about your brand and goals — we&apos;ll reply within one business day with next steps.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
