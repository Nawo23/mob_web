import "dotenv/config";
import fs from "fs";
import path from "path";
import prisma from "../lib/db";
import { supabaseAdmin } from "../lib/supabase";
import { CLIENT_LOGOS } from "../lib/data";

function getContentType(filename: string) {
    const ext = path.extname(filename).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
    if (ext === ".webp") return "image/webp";
    return "application/octet-stream";
}

async function main() {
    console.log("Starting logo migration...");
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < CLIENT_LOGOS.length; i++) {
        const item = CLIENT_LOGOS[i];
        const localPath = path.join(process.cwd(), "public", item.logo);

        if (!fs.existsSync(localPath)) {
            console.warn(`⚠ Skipped "${item.name}" — file not found: ${localPath}`);
            failCount++;
            continue;
        }

        const fileBuffer = fs.readFileSync(localPath);
        const filename = path.basename(item.logo);
        const storagePath = `logos/${Date.now()}-${i}-${filename}`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from("media")
            .upload(storagePath, fileBuffer, {
                contentType: getContentType(filename),
                upsert: false,
            });

        if (uploadError) {
            console.error(`✗ Upload failed for "${item.name}":`, uploadError.message);
            failCount++;
            continue;
        }

        const { data: publicUrlData } = supabaseAdmin.storage.from("media").getPublicUrl(storagePath);

        await prisma.clientLogo.create({
            data: {
                name: item.name,
                logoUrl: publicUrlData.publicUrl,
                order: i,
            },
        });

        console.log(`✔ Migrated "${item.name}"`);
        successCount++;
    }

    console.log(`\n🎉 Done. ${successCount} migrated, ${failCount} failed/skipped.`);
}

main()
    .catch((e) => {
        console.error("Migration failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));