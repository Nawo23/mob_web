import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function AboutHero() {
  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
      <div className="container-mc">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 rounded-full bg-mc-red/10 text-mc-red px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6">
                About MetaCraze
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 className="font-display font-semibold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
                We build brands people <span className="text-gradient">actually follow.</span>
              </h1>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal direction="left" delay={0.2}>
              <p className="text-mc-gray-600 text-lg leading-relaxed">
                Founded in 2018, MetaCraze has grown from a two-person studio into a full-service
                growth partner for 140+ brands across e-commerce, hospitality and finance.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <Reveal direction="scale" delay={0.3}>
        <div className="container-mc mt-14">
          <div className="relative rounded-[2rem] overflow-hidden h-[380px] sm:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
              alt="MetaCraze creative team collaborating in the studio"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-mc-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 glass-dark rounded-2xl px-5 py-4 text-white max-w-xs">
              <p className="text-sm text-white/70">Studio HQ</p>
              <p className="font-display text-lg font-semibold">Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
