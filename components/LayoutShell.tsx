"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <SmoothScroll>
                <Navbar />
                <main className="flex-1">
                    <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
            </SmoothScroll>
            <FloatingWhatsApp />
        </>
    );
}