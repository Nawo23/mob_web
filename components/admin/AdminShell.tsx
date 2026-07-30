"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { hasAccess, type Section } from "@/lib/permissions";

const NAV_ITEMS: { href: string; label: string; icon: string; section: Section }[] = [
    { href: "/admin", label: "Dashboard", section: "dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { href: "/admin/hero", label: "Hero Section", section: "hero", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
    { href: "/admin/logos", label: "Client Logos", section: "logos", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { href: "/admin/projects", label: "Projects", section: "projects", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
    { href: "/admin/services", label: "Services", section: "services", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { href: "/admin/team", label: "Team", section: "team", icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" },
    { href: "/admin/testimonials", label: "Testimonials", section: "testimonials", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { href: "/admin/stats", label: "About", section: "stats", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { href: "/admin/footer", label: "Footer", section: "footer", icon: "M4 6h16M4 12h16M4 18h7" },
    { href: "/admin/contact-info", label: "Contact Info", section: "contact", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    { href: "/admin/messages", label: "Messages", section: "messages", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { href: "/admin/users", label: "Staff & Admins", section: "users", icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-2.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" },
];

function roleLabel(role: string) {
    if (role === "SUPER_ADMIN") return "Super Admin";
    if (role === "SERVICES_STAFF") return "Services Staff";
    return "Admin";
}

export default function AdminShell({
    children,
    messageCount,
    role,
    name,
    email,
}: {
    children: React.ReactNode;
    messageCount: number;
    role: string;
    name: string;
    email: string;
}) {
    const pathname = usePathname();

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const visibleItems = NAV_ITEMS.filter((item) => {
        if (item.section === "users") return role === "SUPER_ADMIN";
        return hasAccess(role, item.section);
    });

    const initial = name?.charAt(0)?.toUpperCase() || "?";

    return (
        <div className="flex h-screen bg-[#F7F7F5] overflow-hidden">
            <aside className="w-64 shrink-0 bg-white border-r border-black/5 flex flex-col py-6 px-4 h-screen overflow-y-auto">
                <div className="flex items-center gap-2.5 px-2 mb-8">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A0A0A]">
                        <span className="font-[var(--font-outfit)] text-sm font-bold text-[#FF1F3D]">M</span>
                    </div>
                    <div>
                        <p className="font-[var(--font-outfit)] text-[15px] font-bold text-[#0A0A0A] tracking-tight leading-none">
                            MetaCraze
                        </p>
                        <p className="font-[var(--font-inter)] text-[11px] text-[#0A0A0A]/40 mt-0.5">Admin Panel</p>
                    </div>
                </div>

                <p className="font-[var(--font-inter)] text-[11px] font-semibold text-[#0A0A0A]/30 uppercase tracking-wider px-2 mb-2">
                    Main Menu
                </p>

                <nav className="space-y-1">
                    {visibleItems.map((item) => {
                        const isActive =
                            item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl font-[var(--font-inter)] text-[13.5px] transition-all ${isActive
                                    ? "bg-[#0A0A0A] text-white font-medium shadow-sm"
                                    : "text-[#0A0A0A]/55 hover:bg-[#F7F7F5] hover:text-[#0A0A0A]"
                                    }`}
                            >
                                <span className="flex items-center gap-2.5">
                                    <svg className="w-[17px] h-[17px] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                    {item.label}
                                </span>

                                {item.section === "messages" && messageCount > 0 && (
                                    <span
                                        className={`text-[10px] font-[var(--font-inter)] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${isActive ? "bg-[#FF1F3D] text-white" : "bg-[#FF1F3D]/10 text-[#FF1F3D]"
                                            }`}
                                    >
                                        {messageCount}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-4 mt-4 border-t border-black/5 space-y-3">
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-[#F7F7F5]">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A0A0A] text-white font-[var(--font-inter)] text-sm font-semibold shrink-0">
                            {initial}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-[var(--font-inter)] text-[13px] font-medium text-[#0A0A0A] truncate">
                                {name}
                            </p>
                            <p className="font-[var(--font-inter)] text-[11px] text-[#0A0A0A]/45 truncate">{email}</p>
                        </div>
                        <span
                            className={`shrink-0 font-[var(--font-inter)] text-[10px] font-bold px-2 py-1 rounded-full ${role === "SUPER_ADMIN"
                                ? "bg-[#FF1F3D] text-white"
                                : role === "SERVICES_STAFF"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-[#0A0A0A]/10 text-[#0A0A0A]/70"
                                }`}
                        >
                            {roleLabel(role)}
                        </span>
                    </div>

                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-[var(--font-inter)] text-[13.5px] text-[#0A0A0A]/55 hover:bg-[#F7F7F5] hover:text-[#0A0A0A] transition-colors"
                    >
                        <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Site
                    </Link>

                    <form action={logout}>
                        <button
                            type="submit"
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-[var(--font-inter)] text-[13.5px] text-[#0A0A0A]/55 hover:bg-[#FF1F3D]/5 hover:text-[#FF1F3D] transition-colors"
                        >
                            <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </form>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto h-screen">{children}</main>
        </div>
    );
}