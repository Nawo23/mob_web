import Reveal from "@/components/ui/Reveal";
import Stat from "@/components/ui/Stat";
import { COMPANY_STATS } from "@/lib/data";

export default function Achievements() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc">
        <div className="rounded-[2rem] bg-mc-black text-white p-10 lg:p-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {COMPANY_STATS.map((s, i) => (
            <Reveal key={s.label} direction="up" delay={i * 0.08}>
              <Stat value={s.value} suffix="+" label={s.label} light />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
