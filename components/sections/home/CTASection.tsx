import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="py-8 lg:py-12">
      <div className="container-mc">
        <div className="relative rounded-[2.5rem] bg-mc-black text-white overflow-hidden noise-bg px-8 py-20 sm:px-16 sm:py-28 text-center">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-mc-red/30 blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-mc-red/20 blur-[100px]" />

          <Reveal direction="scale">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-8">
              Let&apos;s build something great
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl mx-auto leading-[1.05]">
              Ready to make your brand impossible to scroll past?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <p className="mt-6 text-white/60 max-w-xl mx-auto text-lg">
              Book a free consultation and we&apos;ll map out exactly where the growth is hiding in your
              current strategy.
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact" variant="primary" icon={<ArrowUpRight className="h-4 w-4" />}>
                Book Consultation
              </Button>
              <Button href="/projects" variant="ghost-light">
                See Our Work
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
