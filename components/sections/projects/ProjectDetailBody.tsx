import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Stat from "@/components/ui/Stat";
import type { Project } from "@/lib/data";

function parseStatValue(raw: string): { value: number; prefix: string; suffix: string; decimals: number } {
  const match = raw.match(/^([^0-9.]*)([0-9.,]+)(.*)$/);
  if (!match) return { value: 0, prefix: "", suffix: raw, decimals: 0 };
  const [, prefix, numeric, suffix] = match;
  const clean = numeric.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return { value: parseFloat(clean), prefix, suffix, decimals };
}

export default function ProjectDetailBody({ project }: { project: Project }) {
  return (
    <>
      <section className="py-8 lg:py-12">
        <div className="container-mc grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-8 space-y-14">
            <Reveal direction="up">
              <div>
                <span className="text-xs font-semibold text-mc-red tracking-widest uppercase">The Challenge</span>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-3 mb-4">Where things stood</h2>
                <p className="text-mc-gray-600 leading-relaxed text-lg">{project.challenge}</p>
              </div>
            </Reveal>
            <Reveal direction="up">
              <div>
                <span className="text-xs font-semibold text-mc-red tracking-widest uppercase">The Solution</span>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold mt-3 mb-4">What we did</h2>
                <p className="text-mc-gray-600 leading-relaxed text-lg">{project.solution}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal direction="left">
              <div className="rounded-3xl border border-mc-gray-200 p-7 sticky top-28">
                <h3 className="font-display text-lg font-semibold mb-5">Services Used</h3>
                <ul className="space-y-3">
                  {project.servicesUsed.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-mc-ink">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-mc-gray-50">
        <div className="container-mc grid sm:grid-cols-3 gap-6">
          {project.gallery.map((img, i) => (
            <Reveal key={img} direction="up" delay={i * 0.08}>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={img} alt={`${project.title} visual ${i + 1}`} fill className="object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-mc-black text-white">
        <div className="container-mc">
          <Reveal direction="up">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-12 text-center">
              The results, by the numbers
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-10 text-center">
            {project.results.map((r) => {
              const { value, prefix, suffix, decimals } = parseStatValue(r.value);
              return (
                <Reveal key={r.label} direction="up">
                  <Stat value={value} prefix={prefix} suffix={suffix} decimals={decimals} label={r.label} light />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
