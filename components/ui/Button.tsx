import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost-light";
  icon?: ReactNode;
  className?: string;
};

export default function Button({ href, children, variant = "primary", icon, className }: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-95";

  const variants: Record<string, string> = {
    primary: "bg-mc-red text-white hover:shadow-[0_16px_40px_-12px_rgba(229,9,20,0.55)] hover:-translate-y-0.5",
    secondary: "bg-mc-black text-white hover:bg-mc-ink hover:-translate-y-0.5",
    outline: "border border-mc-gray-200 text-mc-black hover:border-mc-red hover:text-mc-red",
    "ghost-light": "border border-white/25 text-white hover:bg-white hover:text-mc-black",
  };

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      {icon}
    </Link>
  );
}
