import "dotenv/config";
import fs from "fs";
import path from "path";
import prisma from "../lib/db";
import { supabaseAdmin } from "../lib/supabase";
import { SERVICES as SERVICE_DATA } from "../lib/data";
import { Prisma } from "../app/generated/prisma/client";
import {
    SERVICES,
    PROJECTS,
    TESTIMONIALS,
    TEAM,
    PRICING,
    COMPANY_STATS,
    CLIENT_LOGOS,
} from "../lib/data";

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

function getContentType(filename: string) {
    const ext = path.extname(filename).toLowerCase();
    if (ext === ".png") return "image/png";
    if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
    if (ext === ".webp") return "image/webp";
    return "application/octet-stream";
}

async function main() {
    console.log("🌱 Seeding ALL data from lib/data.ts...\n");

    // ---------- Services ----------
    for (let i = 0; i < SERVICES.length; i++) {
        const s = SERVICE_DATA[i];
        await prisma.service.upsert({
            where: { slug: s.slug },
            update: {},
            create: {
                title: s.title,
                slug: s.slug,
                short: s.short,
                description: s.description,
                icon: typeof s.icon === "string" ? s.icon : (s.icon as any)?.name || null,
                image: s.image,
                features: s.features,
                order: i,
            },
        });
    }
    console.log(`✔ ${SERVICES.length} Services seeded`);

    // ---------- Projects ----------
    for (let i = 0; i < PROJECTS.length; i++) {
        const p = PROJECTS[i];
        await prisma.project.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                title: p.title,
                slug: p.slug,
                category: p.category,
                client: p.client,
                result: p.result,
                description: p.overview,
                coverImage: p.image,
                images: p.gallery,
                videoUrl: null,
                tags: p.servicesUsed,
                featured: i === 0,
                order: i,
                metricLabel: p.metric.label,
                metricValue: p.metric.value,
                year: p.year,
                duration: p.duration,
                challenge: p.challenge,
                solution: p.solution,
                results: p.results as unknown as Prisma.InputJsonValue,
                testimonialQuote: p.testimonial.quote,
                testimonialName: p.testimonial.name,
                testimonialRole: p.testimonial.role,
                testimonialImage: p.testimonial.image,
            },
        });
    }
    console.log(`✔ ${PROJECTS.length} Projects seeded`);

    // ---------- Testimonials ----------
    for (let i = 0; i < TESTIMONIALS.length; i++) {
        const t = TESTIMONIALS[i];
        const exists = await prisma.testimonial.findFirst({ where: { clientName: t.name, quote: t.quote } });
        if (exists) continue;

        await prisma.testimonial.create({
            data: {
                clientName: t.name,
                clientRole: t.role,
                company: null,
                photo: t.image,
                quote: t.quote,
                rating: t.rating,
                order: i,
            },
        });
    }
    console.log(`✔ ${TESTIMONIALS.length} Testimonials seeded (duplicates skipped)`);

    // ---------- Team ----------
    for (let i = 0; i < TEAM.length; i++) {
        const m = TEAM[i];
        const exists = await prisma.teamMember.findFirst({ where: { name: m.name, role: m.role } });
        if (exists) continue;

        await prisma.teamMember.create({
            data: {
                name: m.name,
                role: m.role,
                photo: m.image,
                bio: m.bio,
                linkedin: null,
                instagram: null,
                order: i,
            },
        });
    }
    console.log(`✔ ${TEAM.length} Team members seeded (duplicates skipped)`);

    // ---------- Pricing ----------
    for (let i = 0; i < PRICING.length; i++) {
        const pkg = PRICING[i];
        const exists = await prisma.pricingPackage.findFirst({ where: { name: pkg.name, price: `${pkg.price}${pkg.period}` } });
        if (exists) continue;

        const features = pkg.featureGroups.flatMap((g) => [`— ${g.title} —`, ...g.items]);

        await prisma.pricingPackage.create({
            data: {
                name: pkg.name,
                price: `${pkg.price}${pkg.period}`,
                description: pkg.description,
                features,
                isPopular: pkg.featured,
                order: i,
            },
        });
    }
    console.log(`✔ ${PRICING.length} Pricing packages seeded (duplicates skipped)`);

    // ---------- Company Stats ----------
    for (let i = 0; i < COMPANY_STATS.length; i++) {
        const s = COMPANY_STATS[i];
        const exists = await prisma.companyStat.findFirst({ where: { label: s.label } });
        if (exists) continue;

        await prisma.companyStat.create({
            data: { label: s.label, value: s.value, order: i },
        });
    }
    console.log(`✔ ${COMPANY_STATS.length} Company stats seeded (duplicates skipped)`);

    // ---------- Client Logos (local files -> Supabase Storage) ----------
    let logoSuccess = 0;
    let logoFail = 0;

    for (let i = 0; i < CLIENT_LOGOS.length; i++) {
        const item = CLIENT_LOGOS[i];

        const exists = await prisma.clientLogo.findFirst({ where: { name: item.name } });
        if (exists) {
            logoSuccess++;
            continue;
        }

        const localPath = path.join(process.cwd(), "public", item.logo);
        if (!fs.existsSync(localPath)) {
            console.warn(`  ⚠ Skipped logo "${item.name}" — file not found: ${localPath}`);
            logoFail++;
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
            console.warn(`  ⚠ Upload failed for "${item.name}": ${uploadError.message}`);
            logoFail++;
            continue;
        }

        const { data: publicUrlData } = supabaseAdmin.storage.from("media").getPublicUrl(storagePath);

        await prisma.clientLogo.create({
            data: { name: item.name, logoUrl: publicUrlData.publicUrl, order: i },
        });
        logoSuccess++;
    }
    console.log(`✔ Client logos: ${logoSuccess} seeded/existing, ${logoFail} failed`);

    console.log("\n🎉 Full seed complete!");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));