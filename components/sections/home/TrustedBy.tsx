import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import { CLIENT_LOGOS } from "@/lib/data";

export default function TrustedBy() {
  return (
    <section className="py-14 border-y border-mc-gray-200">
      <div className="container-mc">
        <Reveal direction="up">
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-mc-gray-600 mb-10">
            Trusted by brands scaling with MetaCraze
          </p>
        </Reveal>
      </div>
      <Marquee speed={20}>
        {CLIENT_LOGOS.map((logo) => (
          <span
            key={logo}
            className="font-display text-2xl sm:text-3xl font-semibold text-text-mc-black"
          >
            {logo}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
