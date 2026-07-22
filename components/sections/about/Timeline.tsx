import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { TIMELINE } from "@/lib/data";

export default function Timeline() {
  return (
    <section className="py-8 lg:py-12 bg-mc-gray-50">
      <div className="container-mc">
        <SectionHeading eyebrow="Our Journey" title="Eight years of building brand growth engines" />

        <div className="mt-16 relative">
          <div className="absolute left-[7px] sm:left-1/2 top-0 bottom-0 w-px bg-mc-gray-200 sm:-translate-x-1/2" />
          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.year} direction={i % 2 === 0 ? "right" : "left"}>
                <div
                  className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10 ${
                    i % 2 === 1 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  <div className="absolute left-0 sm:left-1/2 top-1.5 h-4 w-4 rounded-full bg-mc-red ring-4 ring-white sm:-translate-x-1/2" />
                  <div className="pl-10 sm:pl-0 sm:w-1/2" />
                  <div className={`pl-10 sm:pl-0 sm:w-1/2 ${i % 2 === 1 ? "sm:text-right" : ""}`}>
                    <span className="text-mc-red font-display font-semibold text-sm">{item.year}</span>
                    <h3 className="font-display text-xl font-semibold mt-1 mb-2">{item.title}</h3>
                    <p className="text-mc-gray-600 text-sm leading-relaxed max-w-sm sm:ml-0">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
