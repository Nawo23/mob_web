import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { FAQS } from "@/lib/data";

export default function FAQSection() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions, answered"
            description="Everything you need to know before we start working together."
          />
        </div>
        <div className="lg:col-span-8">
          <Reveal direction="up">
            <Accordion items={FAQS} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
