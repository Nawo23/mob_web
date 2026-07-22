import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { PRICING } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function PricingPreview() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc">
        <SectionHeading
          eyebrow="Pricing"
          title="Straightforward plans, real growth"
          description="Pick the tier that matches your ambitions today — every plan scales with you."
          align="center"
          className="mx-auto"
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-16 items-stretch">
          {PRICING.map((plan, i) => (
            <Reveal key={plan.name} direction="up" delay={i * 0.1}>
              <div
                className={cn(
                  "relative h-full rounded-3xl p-8 flex flex-col",
                  plan.featured
                    ? "bg-mc-black text-white shadow-2xl lg:-translate-y-4"
                    : "bg-white border border-mc-gray-200"
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mc-red px-4 py-1 text-xs font-semibold">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold mb-2">{plan.name}</h3>
                <p className={cn("text-sm mb-6", plan.featured ? "text-white/60" : "text-mc-gray-600")}>
                  {plan.description}
                </p>
                <div className="mb-8">
                  <span className="font-display text-4xl font-semibold">{plan.price}</span>
                  <span className={cn("text-sm", plan.featured ? "text-white/50" : "text-mc-gray-600")}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={cn("h-4 w-4 mt-0.5 shrink-0", plan.featured ? "text-mc-red-glow" : "text-mc-red")} />
                      <span className={plan.featured ? "text-white/80" : "text-mc-ink"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant={plan.featured ? "primary" : "outline"} className="w-full">
                  Get Started
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
