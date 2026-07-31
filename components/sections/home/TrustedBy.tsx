"use client";

import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";

type LogoItem = {
  id: string;
  name: string;
  logoUrl: string;
  size: number;
};

export default function TrustedBy({ logos }: { logos: LogoItem[] }) {
  if (logos.length === 0) return null;

  return (
    <section className="py-14 border-y border-mc-gray-200">
      <div className="container-mc">
        <Reveal direction="up">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-mc-gray-600 mb-10">
            Brands We've Proudly Served
          </p>
        </Reveal>
      </div>

      <Marquee speed={50}>
        {logos.map((c) => {
          const baseSize = 80;
          const scaledSize = (baseSize * c.size) / 100;

          return (
            <div
              key={c.id}
              className="px-10 flex items-center justify-center shrink-0"
              style={{ minWidth: `${scaledSize}px` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logoUrl}
                alt={c.name}
                style={{ height: `${scaledSize}px`, width: `${scaledSize}px` }}
                className="object-contain"
              />
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}