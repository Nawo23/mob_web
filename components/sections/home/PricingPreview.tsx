"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { PRICING } from "@/lib/data";
import { cn } from "@/lib/utils";

const PREVIEW_COUNT = 2;

function getBorderGradient(name: string) {
  const n = name.toLowerCase();
  if (n.includes("gold")) {
    return "conic-gradient(from var(--angle), transparent 0%, #f5c94b 8%, #fff3c4 12%, #f5c94b 16%, transparent 26%)";
  }
  if (n.includes("platinum")) {
    return "conic-gradient(from var(--angle), transparent 0%, #d8d8dc 8%, #ffffff 12%, #d8d8dc 16%, transparent 26%)";
  }
  if (n.includes("silver")) {
    return "conic-gradient(from var(--angle), transparent 0%, #b8bcc4 8%, #f1f2f4 12%, #b8bcc4 16%, transparent 26%)";
  }
  return "conic-gradient(from var(--angle), transparent 0%, #E50914 8%, #ff6b6b 12%, #E50914 16%, transparent 26%)";
}

export default function PricingPreview() {
  // now tracks the plan's id instead of its array index
  const [openPlanId, setOpenPlanId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openPlanId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openPlanId]);

  const fullPlan = openPlanId ? PRICING.find((p) => p.id === openPlanId) ?? null : null;

  const fullPlanModal =
    fullPlan ? (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        onClick={() => setOpenPlanId(null)}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl bg-white shadow-2xl overflow-hidden flex flex-col"
        >
          <button
            onClick={() => setOpenPlanId(null)}
            className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-mc-gray-100 text-mc-gray-600 hover:bg-mc-gray-200 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="overflow-y-auto p-8">
            <h3 className="font-display text-2xl font-semibold mb-1 text-mc-black">
              {fullPlan.name}
            </h3>
            <p className="text-sm text-mc-gray-600 mb-4">{fullPlan.description}</p>

            <div className="mb-6">
              <span className="font-display text-3xl font-semibold text-mc-black">
                {fullPlan.price}
              </span>
              <span className="text-sm text-mc-gray-600">{fullPlan.period}</span>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              {fullPlan.featureGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-mc-gray-400 mb-3">
                    {group.title}
                  </p>
                  <ul className="space-y-2.5">
                    {group.items.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 mt-0.5 shrink-0 text-mc-red" />
                        <span className="text-mc-ink">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Button href="/contact" variant="primary" className="w-full mt-8">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <section className="py-8 lg:py-12">
      <style jsx global>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes border-spin {
          to {
            --angle: 360deg;
          }
        }
        .shimmer-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.5px;
          background: var(--shimmer-gradient);
          animation: border-spin 4s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <div className="container-mc">
        <SectionHeading
          eyebrow="Pricing"
          title="Straightforward plans, real growth"
          description="Pick the tier that matches your ambitions today — every plan scales with you."
          align="center"
          className="mx-auto"
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-16 items-stretch">
          {PRICING.map((plan) => (
            <Reveal key={plan.id} direction="up" delay={0.1}>
              <div
                className={cn(
                  "shimmer-border isolate relative h-full rounded-3xl p-8 flex flex-col",
                  plan.featured
                    ? "bg-mc-black text-white shadow-2xl lg:-translate-y-4"
                    : "bg-white border border-mc-gray-200"
                )}
                style={
                  {
                    "--shimmer-gradient": getBorderGradient(plan.name),
                  } as React.CSSProperties
                }
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mc-red px-4 py-1 text-xs font-semibold pointer-events-none">
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

                <div className="relative z-10 space-y-6 mb-8 flex-1">
                  {plan.featureGroups.map((group) => {
                    const preview = group.items.slice(0, PREVIEW_COUNT);
                    const remaining = group.items.length - PREVIEW_COUNT;

                    return (
                      <div key={group.title}>
                        <p
                          className={cn(
                            "text-xs font-semibold uppercase tracking-wider mb-3",
                            plan.featured ? "text-white/50" : "text-mc-gray-400"
                          )}
                        >
                          {group.title}
                        </p>
                        <ul className="space-y-3">
                          {preview.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm">
                              <Check
                                className={cn(
                                  "h-4 w-4 mt-0.5 shrink-0",
                                  plan.featured ? "text-mc-red-glow" : "text-mc-red"
                                )}
                              />
                              <span className={plan.featured ? "text-white/80" : "text-mc-ink"}>
                                {f}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {remaining > 0 && (
                          <button
                            type="button"
                            onClick={() => setOpenPlanId(plan.id)}
                            className={cn(
                              "relative z-20 mt-2 text-xs font-semibold underline underline-offset-2 transition-colors cursor-pointer",
                              plan.featured
                                ? "text-white/60 hover:text-white"
                                : "text-mc-gray-500 hover:text-mc-red"
                            )}
                          >
                            View more...
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="relative z-20 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenPlanId(plan.id)}
                    className={cn(
                      "shrink-0 rounded-full px-5 py-3 text-sm font-semibold border transition-colors cursor-pointer",
                      plan.featured
                        ? "border-white/25 text-white/80 hover:bg-white/10"
                        : "border-mc-gray-200 text-mc-gray-600 hover:border-mc-gray-300 hover:text-mc-black"
                    )}
                  >
                    Details
                  </button>
                  <Button
                    href="/contact"
                    variant={plan.featured ? "primary" : "outline"}
                    className="flex-1"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {mounted && fullPlanModal && createPortal(fullPlanModal, document.body)}
    </section>
  );
}