import Reveal from "@/components/ui/Reveal";
import Stat from "@/components/ui/Stat";

type CompanyStatItem = {
  id: string;
  label: string;
  value: number | null;
};

export default function Achievements({ stats }: { stats: CompanyStatItem[] }) {
  if (stats.length === 0) return null;

  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc">
        <div className="rounded-[2rem] bg-mc-black text-white p-10 lg:p-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <Reveal key={s.id} direction="up" delay={i * 0.08}>
              <Stat value={s.value ?? 0} suffix="+" label={s.label} light />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}