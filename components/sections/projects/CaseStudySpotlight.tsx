import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

export default function CaseStudySpotlight() {
  return (
    <section className="py-8 lg:py-12 bg-mc-gray-50">
      <div className="container-mc">
        <SectionHeading
          eyebrow="Case Study"
          title="Orbit Coffee Co. — a full brand refresh"
          description="Drag the slider to see the shift from a generic storefront feed to a content-first brand presence."
        />

        <Reveal direction="scale" className="mt-12">
          <BeforeAfterSlider
            before="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=60"
            after="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1400&q=80"
            beforeLabel="Before MetaCraze"
            afterLabel="After MetaCraze"
          />
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {[
            { label: "Follower Growth", value: "+3,100%" },
            { label: "Monthly Revenue", value: "+212%" },
            { label: "Engagement Rate", value: "8.7%" },
          ].map((stat) => (
            <Reveal key={stat.label} direction="up">
              <div className="rounded-2xl bg-white border border-mc-gray-200 p-6 text-center">
                <p className="font-display text-3xl font-semibold text-mc-red">{stat.value}</p>
                <p className="text-sm text-mc-gray-600 mt-2">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" className="mt-10 text-center">
          <Link
            href="/projects/orbit-coffee"
            className="inline-flex items-center gap-2 rounded-full bg-mc-black text-white px-6 py-3.5 text-sm font-semibold hover:bg-mc-red transition-colors"
          >
            View Full Case Study <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
