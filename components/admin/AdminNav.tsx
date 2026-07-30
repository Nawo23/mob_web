"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  MessageSquareQuote,
  Tag,
  Inbox,
  Settings,
  LogOut,
} from "lucide-react";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: ImageIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
  { href: "/admin/leads", label: "Leads  ", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [newLeads, setNewLeads] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => (res.ok ? res.json() : []))
      .then((leads: { status: string }[]) => {
        setNewLeads(leads.filter((l) => l.status === "new").length);
      })
      .catch(() => setNewLeads(null));
  }, [pathname]);

  async function logout() {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <aside className="w-full lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-mc-gray-200 bg-white">
      <div className="p-5 font-display font-semibold text-[15px]">MetaCraze admin</div>
      <nav className="flex lg:flex-col gap-0.5 px-3 pb-4 overflow-x-auto lg:overflow-visible">
        {LINKS.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                active ? "bg-mc-red text-white" : "text-mc-gray-600 hover:bg-mc-gray-100"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {link.label}
              {link.href === "/admin/leads" && !!newLeads && (
                <span
                  className={`ml-auto rounded-full px-1.5 py-0.5 text-[11px] leading-none ${
                    active ? "bg-white/20 text-white" : "bg-red-100 text-mc-red"
                  }`}
                >
                  {newLeads}
                </span>
              )}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="mt-2 flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-2 text-left text-[13px] font-medium text-mc-gray-400 hover:bg-mc-gray-100 hover:text-mc-red"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </nav>
    </aside>
  );
}