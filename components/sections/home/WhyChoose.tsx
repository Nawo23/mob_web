import { Zap, ShieldCheck, Users, Gauge } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const REASONS = [
  {
    icon: Zap,
    title: "Built for speed",
    text: "Campaigns launch in days, not months — content pods work in weekly sprints, not quarterly plans.",
  },
  {
    icon: ShieldCheck,
    title: "Numbers you can trust",
    text: "Live dashboards and honest reporting — no vanity metrics, no dressed-up screenshots.",
  },
  {
    icon: Users,
    title: "A dedicated pod",
    text: "One strategist, one creator, one designer — a small team that actually knows your brand.",
  },
  {
    icon: Gauge,
    title: "Performance-first",
    text: "Every piece of content is judged by what it does for the business, not how it looks alone.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-8 lg:py-12 relative">
      <div className="container-mc">
        <SectionHeading
          eyebrow="Why MetaCraze"
          title="An agency that treats your growth like our own"
          description="No account managers relaying messages. No recycled strategy decks. Just a team obsessed with what moves the needle."
          align="center"
          className="mx-auto"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} direction="up" delay={i * 0.08}>
              <div className="relative h-full rounded-3xl p-px bg-gradient-to-b from-mc-gray-200 to-transparent">
                <div className="relative h-full rounded-3xl glass p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md border border-mc-gray-100 mb-6">
                    <r.icon className="h-5 w-5 text-mc-red" />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2.5">{r.title}</h3>
                  <p className="text-sm text-mc-gray-600 leading-relaxed">{r.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
