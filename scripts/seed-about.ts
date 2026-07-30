import "dotenv/config";
import prisma from "../lib/db";

async function main() {
    console.log("🌱 Seeding About section (Mission, Vision, Stats)...\n");

    // ---------- Mission & Vision ----------
    const missionVisionCount = await prisma.companyStat.count({ where: { type: "vision_mission" } });

    if (missionVisionCount === 0) {
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
        console.log("✔ Mission & Vision seeded");
    } else {
        console.log("⏭ Mission & Vision already exists, skipped");
    }

    // ---------- Company Stats ----------
    const statCount = await prisma.companyStat.count({ where: { type: "stat" } });

    if (statCount === 0) {
        await prisma.companyStat.createMany({
            data: [
                { type: "stat", label: "Years in Business", value: 8, order: 0 },
                { type: "stat", label: "Brands Grown", value: 140, order: 1 },
                { type: "stat", label: "Campaigns Launched", value: 620, order: 2 },
                { type: "stat", label: "Team Members", value: 32, order: 3 },
            ],
        });
        console.log("✔ Company Stats seeded");
    } else {
        console.log("⏭ Company Stats already exists, skipped");
    }

    console.log("\n🎉 Done!");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));