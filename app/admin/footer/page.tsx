import prisma from "@/lib/db";
import { requireAccess, getCurrentAdmin } from "@/lib/auth";
import FooterManager from "./FooterManager";

export default async function FooterPage() {
    await requireAccess("footer");
    const admin = await getCurrentAdmin();

    const settings = await prisma.footerSettings.findUnique({ where: { id: "main" } });
    const socialLinks = await prisma.socialLink.findMany({ orderBy: { order: "asc" } });

    return <FooterManager settings={settings} socialLinks={socialLinks} role={admin.role} />;
}