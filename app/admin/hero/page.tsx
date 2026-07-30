import prisma from "@/lib/db";
import HeroForm from "./HeroForm";

export default async function HeroSectionPage() {
    const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">Hero Section</h1>
            <p className="text-[#0A0A0A]/50 mb-8">
                Upload the background image and video shown on the homepage hero.
            </p>

            <HeroForm
                heroImageUrl={settings?.heroImageUrl ?? null}
                heroVideoUrl={settings?.heroVideoUrl ?? null}
            />
        </div>
    );
}