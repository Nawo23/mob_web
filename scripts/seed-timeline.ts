import "dotenv/config";
import prisma from "../lib/db";
import { TIMELINE } from "../lib/data";

async function main() {
    console.log("🌱 Seeding timeline...\n");

    const existingCount = await prisma.timelineItem.count();
    if (existingCount > 0) {
        console.log("⏭ Timeline already has data, skipped");
        return;
    }

    for (let i = 0; i < TIMELINE.length; i++) {
        const t = TIMELINE[i];
        await prisma.timelineItem.create({
            data: { year: t.year, title: t.title, text: t.text, order: i },
        });
    }

    console.log(`✔ ${TIMELINE.length} timeline items seeded`);
    console.log("\n🎉 Done!");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));