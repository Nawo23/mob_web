import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { Project } from "@/lib/data";

export default function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-10%] right-0 h-96 w-96 rounded-full bg-mc-red/10 blur-[110px]" />
      </div>

      <div className="container-mc">
        <Reveal direction="up">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-mc-gray-600 hover:text-mc-red transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Link>
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full bg-mc-red/10 text-mc-red px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-6">
                {project.category}
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.1}>
              <h1 className="font-display font-semibold tracking-tight text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
                {project.title}
              </h1>
            </Reveal>
            <Reveal direction="up" delay={0.18}>
              <p className="mt-6 text-lg text-mc-gray-600 leading-relaxed max-w-xl">{project.overview}</p>
            </Reveal>
            <Reveal direction="up" delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-mc-gray-600">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-mc-red" /> {project.year}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-mc-red" /> {project.duration}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="scale" delay={0.15}>
              <div className="rounded-3xl glass p-6 shadow-xl">
                <p className="text-xs font-semibold text-mc-gray-600 mb-1">{project.client}</p>
                <p className="font-display text-4xl font-semibold text-mc-red mb-1">{project.metric.value}</p>
                <p className="text-sm text-mc-gray-600">{project.metric.label}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal direction="scale" delay={0.2} className="mt-14">
          <div className="relative aspect-[16/8] rounded-3xl overflow-hidden">
            <Image src={project.image} alt={project.title} fill priority className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
