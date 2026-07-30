import "dotenv/config";
import prisma from "../lib/db";

async function main() {
    console.log("🌱 Seeding contact info...\n");

    const existing = await prisma.contactInfo.findUnique({ where: { id: "main" } });

    if (existing) {
        console.log("⏭ Contact info already exists, skipped");
    } else {
        await prisma.contactInfo.create({
            data: {
                id: "main",
                address: "292/2 Kandy Rd, Kurunegala, Sri Lanka",
                phone: "+94 77 553 8871",
                email: "contact@mobsolutions.lk",
                workingHours: "Mon – Fri, 9:00 AM – 5:00 PM",
                mapEmbedUrl: null,
            },
        });
        console.log("✔ Contact info seeded");
    }

    console.log("\n🎉 Done!");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));