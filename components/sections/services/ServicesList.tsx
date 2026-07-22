import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ServicesList() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc space-y-20 lg:space-y-28">
        {SERVICES.map((service, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={service.slug}
              id={service.slug}
              className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-32"
            >
              <Reveal
                direction={reversed ? "left" : "right"}
                className={cn("lg:col-span-6", reversed ? "lg:order-2" : "")}
              >
                <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                  <Image src={service.image} alt={service.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-mc-black/40 to-transparent" />
                  <div className="absolute top-6 left-6 flex h-14 w-14 items-center justify-center rounded-2xl glass">
                    <service.icon className="h-6 w-6 text-mc-red" />
                  </div>
                </div>
              </Reveal>

              <Reveal direction={reversed ? "right" : "left"} className={cn("lg:col-span-6", reversed ? "lg:order-1" : "")}>
                <span className="text-xs font-semibold text-mc-red tracking-widest">
                  {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold mt-3 mb-5">{service.title}</h2>
                <p className="text-mc-gray-600 leading-relaxed mb-7">{service.description}</p>
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-mc-black hover:text-mc-red transition-colors"
                >
                  Get Started
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
