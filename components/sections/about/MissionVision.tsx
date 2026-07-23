import { Compass, Telescope } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function MissionVision() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc grid md:grid-cols-2 gap-6">
        <Reveal direction="right">
          <div className="h-full rounded-3xl border border-mc-gray-200 p-9 lg:p-11">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mc-black text-white mb-7">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-mc-gray-600 leading-relaxed">
              To give ambitious brands the same calibre of creative and strategic firepower usually
              reserved for companies ten times their size — without the agency bloat.
            </p>
          </div>
        </Reveal>
        <Reveal direction="left">
          <div className="h-full rounded-3xl bg-mc-black text-white p-9 lg:p-11">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mc-red mb-7">
              <Telescope className="h-5 w-5" />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-white/60 leading-relaxed">
              We help your business build a strong online presence that attracts new customers, keeps them engaged, and increases sales.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
