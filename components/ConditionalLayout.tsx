"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";


export default function ConditionalLayout({
    children,
    footer,
    whatsapp,
}: {
    children: React.ReactNode;
    footer: React.ReactNode;
    whatsapp: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) {
        return <main className="min-h-screen">{children}</main>;
    }

    return (
        <SmoothScroll>
            <Navbar />
            <main className="flex-1">
                <PageTransition>{children}</PageTransition>
            </main>
            {footer}
            {whatsapp}
        </SmoothScroll>
    );
}