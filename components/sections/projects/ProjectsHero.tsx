import Reveal from "@/components/ui/Reveal";
import Stat from "@/components/ui/Stat";

export default function ProjectsHero() {
  return (
    <section className="relative pt-20 pb-20 lg:pt-28 lg:pb-24">
      <div className="container-mc">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <span className="inline-flex items-center gap-2 rounded-full bg-mc-red/10 text-mc-red px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6">
                Our Work
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h1 className="font-display font-semibold tracking-tight text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
                Proof, not promises.
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <p className="mt-7 text-mc-gray-600 text-lg max-w-lg">
                A selection of campaigns across social growth, paid media, branding and web —
                each one measured against a number that mattered to the business.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-6 border-t border-mc-gray-200 pt-8 lg:border-t-0 lg:pt-0">
            <Reveal direction="up" delay={0.2}>
              <Stat value={140} suffix="+" label="Brands grown" />
            </Reveal>
            <Reveal direction="up" delay={0.28}>
              <Stat value={620} suffix="+" label="Campaigns" />
            </Reveal>
            <Reveal direction="up" delay={0.36}>
              <Stat value={58} suffix="M+" label="Views generated" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
