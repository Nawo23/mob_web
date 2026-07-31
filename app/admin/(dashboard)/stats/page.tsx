import prisma from "@/lib/db";
import { requireAccess, getCurrentAdmin } from "@/lib/auth";
import StatsManager from "./StatsManager";

export default async function StatsPage() {
    await requireAccess("stats");
    const admin = await getCurrentAdmin();

    const stats = await prisma.companyStat.findMany({
        where: { type: "stat" },
        orderBy: { order: "asc" },
    });

    let missionVision = await prisma.companyStat.findMany({
        where: { type: "vision_mission" },
        orderBy: { order: "asc" },
    });

    // First-time setup — Mission/Vision records dekak nathnam auto-create karanawa
    if (missionVision.length === 0) {
        await prisma.companyStat.createMany({
            data: [
                {
                    type: "vision_mission",
                    label: "Our Mission",
                    description:
                        "To give ambitious brands the same calibre of creative and strategic firepower usually reserved for companies ten times their size — without the agency bloat.",
                    order: 0,
                },
                {
                    type: "vision_mission",
                    label: "Our Vision",
                    description:
                        "We help your business build a strong online presence that attracts new customers, keeps them engaged, and increases sales.",
                    order: 1,
                },
            ],
        });
        missionVision = await prisma.companyStat.findMany({
            where: { type: "vision_mission" },
            orderBy: { order: "asc" },
        });
    }

    return <StatsManager stats={stats} missionVision={missionVision} role={admin.role} />;
}