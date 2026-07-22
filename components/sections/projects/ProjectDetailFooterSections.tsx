import Image from "next/image";
import Link from "next/link";
import { Quote, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS, type Project } from "@/lib/data";

export default function ProjectDetailFooterSections({ project }: { project: Project }) {
  const related = PROJECTS.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 3);
  const fallback = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);
  const relatedProjects = related.length > 0 ? related : fallback;

  return (
    <>
      <section className="py-8 lg:py-12">
        <div className="container-mc">
          <Reveal direction="scale">
            <div className="relative rounded-3xl bg-mc-gray-50 p-10 lg:p-16 text-center max-w-3xl mx-auto">
              <Quote className="h-10 w-10 text-mc-red/30 mx-auto mb-6" />
              <p className="font-display text-xl sm:text-2xl leading-relaxed text-mc-ink">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Image
                  src={project.testimonial.image}
                  alt={project.testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover h-12 w-12"
                />
                <div className="text-left">
                  <p className="text-sm font-semibold">{project.testimonial.name}</p>
                  <p className="text-xs text-mc-gray-600">{project.testimonial.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-mc-gray-50">
        <div className="container-mc">
          <Reveal direction="up">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-10">More projects</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedProjects.map((p, i) => (
              <Reveal key={p.slug} direction="up" delay={i * 0.08}>
                <Link href={`/projects/${p.slug}`} className="group relative block aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-mc-black via-mc-black/20 to-transparent opacity-85" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs text-white/60 mb-1">{p.client}</p>
                    <h3 className="font-display text-base font-semibold text-white flex items-center justify-between gap-2">
                      {p.title}
                      <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
