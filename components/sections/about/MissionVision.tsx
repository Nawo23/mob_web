import { Compass, Telescope } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

type MissionVisionItem = {
  id: string;
  label: string;
  description: string | null;
};

export default function MissionVision({ items }: { items: MissionVisionItem[] }) {
  const mission = items.find((i) => i.label.toLowerCase().includes("mission"));
  const vision = items.find((i) => i.label.toLowerCase().includes("vision"));

  if (!mission && !vision) return null;

  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc grid md:grid-cols-2 gap-6">
        {mission && (
          <Reveal direction="right">
            <div className="h-full rounded-3xl border border-mc-gray-200 p-9 lg:p-11">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mc-black text-white mb-7">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">{mission.label}</h3>
              <p className="text-mc-gray-600 leading-relaxed">{mission.description}</p>
            </div>
          </Reveal>
        )}
        {vision && (
          <Reveal direction="left">
            <div className="h-full rounded-3xl bg-mc-black text-white p-9 lg:p-11">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mc-red mb-7">
                <Telescope className="h-5 w-5" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4">{vision.label}</h3>
              <p className="text-white/60 leading-relaxed">{vision.description}</p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}