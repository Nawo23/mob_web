import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto" : "text-left", "max-w-2xl", className)}>
      {eyebrow && (
        <Reveal direction="up">
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5",
              light ? "bg-white/10 text-white/80" : "bg-mc-red/10 text-mc-red"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mc-red" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.08}>
        <h2
          className={cn(
            "font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.1]",
            light ? "text-white" : "text-mc-black"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.16}>
          <p className={cn("mt-5 text-base sm:text-lg leading-relaxed", light ? "text-white/60" : "text-mc-gray-600")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
