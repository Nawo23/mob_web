"use client";

import type { ReactNode } from "react";

export default function Marquee({
  children,
  speed = 30,
  reverse = false,
}: {
  children: ReactNode;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex w-max gap-16 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex items-center gap-16 shrink-0">{children}</div>
        <div className="flex items-center gap-16 shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
