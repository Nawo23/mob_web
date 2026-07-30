

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/lib/data";
import prisma from "@/lib/db";

const ICON_MAP: Record<string, string> = {
  instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  facebook: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.558V9h3.556v11.452z",
  tiktok: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .58.05.85.14V9.4a6.33 6.33 0 00-.85-.06A6.34 6.34 0 108.6 21.62a6.34 6.34 0 006.3-6.33V8.79a8.16 8.16 0 004.69 1.5V6.87a4.85 4.85 0 01-.001-.18z",
  youtube: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  twitter: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};

export default async function Footer() {
  const settings = await prisma.footerSettings.findUnique({ where: { id: "main" } });
  const socialLinks = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });
  const contactInfo = await prisma.contactInfo.findUnique({ where: { id: "main" } });

  return (
    <footer className="relative bg-gray-900 text-white noise-bg overflow-hidden">
      {settings?.backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <Image src={settings.backgroundImage} alt="" fill className="object-cover" />
        </div>
      )}
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-mc-red/20 blur-[120px]" />

      <div className="container-mc relative pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2 mb-2">
              <Image
                src={settings?.logoUrl || "/logoLight.png"}
                alt="MetaCraze"
                width={400}
                height={140}
                className="h-32 w-auto"
              />
            </Link>
            <p className="text-white/60 max-w-sm leading-relaxed mb-8">
              {settings?.description ||
                "A social-first growth studio helping ambitious brands turn attention into revenue — through strategy, content and performance media that actually compound."}
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
                  <Link href="/services" className="text-white/70 hover:text-mc-red transition-colors text-sm">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white/40 tracking-wide uppercase mb-5">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-white/70">
              {contactInfo?.address && (
                <li className="flex gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                  {contactInfo.address}
                </li>
              )}
              {contactInfo?.phone && (
                <li className="flex gap-3">
                  <Phone className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                  {contactInfo.phone}
                </li>
              )}
              {contactInfo?.email && (
                <li className="flex gap-3">
                  <Mail className="h-4 w-4 mt-0.5 text-mc-red shrink-0" />
                  {contactInfo.email}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          <p className="text-white/40 text-sm">
            {settings?.copyrightText || `© ${new Date().getFullYear()} MetaCraze. All rights reserved.`}
          </p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const iconPath = ICON_MAP[link.platform.toLowerCase()];
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 hover:border-mc-red hover:text-mc-red hover:-translate-y-0.5 transition-all"
                  >
                    {iconPath ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d={iconPath} />
                      </svg>
                    ) : (
                      <span className="text-[10px] font-semibold">
                        {link.platform.charAt(0)}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div >
    </footer >
  );
}