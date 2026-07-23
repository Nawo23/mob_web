"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SOCIAL_ICONS, SERVICES } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white noise-bg overflow-hidden">
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-mc-red/20 blur-[120px]" />

      <div className="container-mc relative pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
  <Image 
    src="/logoLight.png" 
    alt="MetaCraze" 
    width={400} 
    height={140} 
    className="h-32 w-auto" 
  />
</Link>
            <p className="text-white/60 max-w-sm leading-relaxed mb-8">
              A social-first growth studio helping ambitious brands turn attention into revenue —
              through strategy, content and performance media that actually compound.
            </p>
            
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white/40 tracking-wide uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-mc-red transition-colors text-sm">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white/40 tracking-wide uppercase mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href="/services"
                    className="text-white/70 hover:text-mc-red transition-colors text-sm"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white/40 tracking-wide uppercase mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                42 Marine Drive, Colombo 03, Sri Lanka
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                +94 11 234 5678
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                hello@metacraze.agency
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-white/40 text-sm">© {new Date().getFullYear()} MetaCraze. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {SOCIAL_ICONS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:border-mc-red hover:text-mc-red hover:-translate-y-0.5 transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
