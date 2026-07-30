import "dotenv/config";
import prisma from "../lib/db";
import { COMPANY_STATS } from "../lib/data";

async function main() {
    console.log("Migrating company stats...");

    for (let i = 0; i < COMPANY_STATS.length; i++) {
        const s = COMPANY_STATS[i];
        await prisma.companyStat.create({
            data: { label: s.label, value: s.value, order: i },
        });
    }

    console.log(`✔ Migrated ${COMPANY_STATS.length} stats`);
}

main()
    .catch((e) => {
        console.error("Migration failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));