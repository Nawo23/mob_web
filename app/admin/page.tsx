import prisma from "@/lib/db";
import Link from "next/link";
import { requireAccess } from "@/lib/auth";
import ContentChart from "@/components/admin/ContentChart";

export default async function AdminDashboard() {
  await requireAccess("dashboard");

  const [projects, services, testimonials, pricingPackages, teamMembers, logos] =
    await Promise.all([
      prisma.project.count(),
      prisma.service.count(),
      prisma.testimonial.count(),
      prisma.pricingPackage.count(),
      prisma.teamMember.count(),
      prisma.clientLogo.count(),
    ]);

  const stats = [
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Team Members", value: teamMembers, href: "/admin/team" },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials" },
  ];

  const chartData = [
    { name: "Projects", count: projects },
    { name: "Services", count: services },
    { name: "Team", count: teamMembers },
    { name: "Reviews", count: testimonials },
    { name: "Pricing", count: pricingPackages },
    { name: "Logos", count: logos },
  ];

  const totalItems = projects + services + teamMembers + testimonials + pricingPackages + logos;

  return (
    <div className="px-10 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-outfit)] text-[26px] font-bold text-[#0A0A0A] tracking-tight">
            Dashboard
          </h1>
          <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/45 mt-1">
            An overview of everything on your site.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left column — stat cards + chart */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="rounded-2xl bg-white border border-black/5 p-5 hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow"
              >
                <p className="font-[var(--font-inter)] text-[12px] text-[#0A0A0A]/45 mb-3">{stat.label}</p>
                <p className="font-[var(--font-outfit)] text-[28px] font-bold text-[#0A0A0A] leading-none">
                  {stat.value}
                </p>
              </Link>
            ))}
          </div>

          {/* Progress chart card */}
          <div className="rounded-2xl bg-white border border-black/5 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[var(--font-outfit)] text-base font-semibold text-[#0A0A0A]">
                Content Overview
              </h2>
              <span className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/45">
                {totalItems} total items
              </span>
            </div>
            <ContentChart data={chartData} />
          </div>
        </div>

        {/* Right column — highlight card + quick links */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <div className="rounded-2xl bg-[#0A0A0A] p-6 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#FF1F3D]/20 blur-2xl" />
            <p className="font-[var(--font-inter)] text-xs text-white/50 mb-2">Total Content Items</p>
            <p className="font-[var(--font-outfit)] text-4xl font-bold mb-1">{totalItems}</p>
            <p className="font-[var(--font-inter)] text-xs text-white/40 mb-5">
              Across all managed sections
            </p>
            <Link
              href="/admin/projects"
              className="inline-flex items-center justify-center w-full rounded-full bg-[#FF1F3D] text-white text-sm font-[var(--font-inter)] font-semibold py-2.5 hover:bg-[#FF1F3D]/90 transition"
            >
              Manage Content
            </Link>
          </div>

          <div className="rounded-2xl bg-white border border-black/5 p-6">
            <p className="font-[var(--font-inter)] text-xs font-semibold text-[#0A0A0A]/35 uppercase tracking-wider mb-4">
              Quick Links
            </p>
            <div className="space-y-1">
              {[
                { label: "Add Project", href: "/admin/projects/new" },
                { label: "Add Team Member", href: "/admin/team/new" },
                { label: "Manage Pricing", href: "/admin/pricing" },
                { label: "Site Hero Settings", href: "/admin/hero" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl font-[var(--font-inter)] text-[13.5px] text-[#0A0A0A]/70 hover:bg-[#F7F7F5] hover:text-[#0A0A0A] transition-colors"
                >
                  {link.label}
                  <span className="text-[#0A0A0A]/25">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}