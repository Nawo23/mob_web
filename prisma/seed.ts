import "dotenv/config";
import prisma from "../lib/db";

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

async function main() {
    console.log("🌱 Seeding database (10+ records per table)...\n");

    // ---------- Services (10) ----------
    if ((await prisma.service.count()) === 0) {
        const serviceNames = [
            "Social Media Management", "Paid Advertising", "Content Creation",
            "Graphic Design", "Brand Identity", "SEO & Google Ads",
            "Video Production", "Market Research", "Influencer Marketing",
            "Analytics & Reporting",
        ];
        await prisma.service.createMany({
            data: serviceNames.map((title, i) => ({
                title,
                slug: slugify(title) + "-" + i,
                short: `Short summary for ${title}.`,
                description: `We handle ${title.toLowerCase()} end to end — strategy, execution and reporting, tailored to your brand's goals.`,
                features: [`${title} planning`, `${title} execution`, `Monthly ${title.toLowerCase()} report`],
                order: i,
            })),
        });
        console.log("✔ 10 Services seeded");
    } else {
        console.log("⏭ Services already has data, skipped");
    }

    // ---------- Client Logos (10) ----------
    if ((await prisma.clientLogo.count()) === 0) {
        await prisma.clientLogo.createMany({
            data: Array.from({ length: 10 }).map((_, i) => ({
                name: `Client ${i + 1}`,
                logoUrl: `https://placehold.co/200x80/f5f5f0/0a0a0a?text=LOGO+${i + 1}`,
                order: i,
            })),
        });
        console.log("✔ 10 Client logos seeded (placeholders — replace via admin)");
    } else {
        console.log("⏭ Client logos already has data, skipped");
    }

    // ---------- Pricing Packages (10) ----------
    if ((await prisma.pricingPackage.count()) === 0) {
        const tierNames = [
            "Bronze", "Silver", "Gold", "Platinum", "Diamond",
            "Starter", "Growth", "Pro", "Enterprise", "Custom",
        ];
        await prisma.pricingPackage.createMany({
            data: tierNames.map((name, i) => ({
                name: `${name} Package`,
                price: `${(30 + i * 8).toLocaleString()},000 LKR/month`,
                description: `The ${name} tier — built for businesses at this stage of growth.`,
                features: [
                    "— Content Creation —",
                    `${4 + i} posts/month`,
                    `${4 + i} reels/month`,
                    "— Advertising —",
                    "Unlimited boosting support",
                ],
                isPopular: i === 2,
                order: i,
            })),
        });
        console.log("✔ 10 Pricing packages seeded");
    } else {
        console.log("⏭ Pricing packages already has data, skipped");
    }

    // ---------- Team Members (10) ----------
    if ((await prisma.teamMember.count()) === 0) {
        const roles = [
            "Founder & Creative Director", "Head of Strategy", "Head of Paid Media",
            "Lead Content Producer", "Senior Designer", "Analytics Lead",
            "Social Media Manager", "Video Editor", "Copywriter", "Client Success Manager",
        ];
        await prisma.teamMember.createMany({
            data: roles.map((role, i) => ({
                name: `Team Member ${i + 1}`,
                role,
                photo: `https://placehold.co/500x500/0a0a0a/f5f5f0?text=Photo+${i + 1}`,
                bio: `Brings expertise in ${role.toLowerCase()} to every client account.`,
                order: i,
            })),
        });
        console.log("✔ 10 Team members seeded (placeholders — replace via admin)");
    } else {
        console.log("⏭ Team members already has data, skipped");
    }

    // ---------- Testimonials (10) ----------
    if ((await prisma.testimonial.count()) === 0) {
        await prisma.testimonial.createMany({
            data: Array.from({ length: 10 }).map((_, i) => ({
                clientName: `Client Name ${i + 1}`,
                clientRole: "Founder",
                company: `Sample Company ${i + 1}`,
                photo: `https://placehold.co/300x300/0a0a0a/f5f5f0?text=C${i + 1}`,
                quote: `MetaCraze delivered real results for our brand — testimonial sample ${i + 1}.`,
                rating: 5,
                order: i,
            })),
        });
        console.log("✔ 10 Testimonials seeded (placeholders — replace via admin)");
    } else {
        console.log("⏭ Testimonials already has data, skipped");
    }

    // ---------- Company Stats (10) ----------
    if ((await prisma.companyStat.count()) === 0) {
        const stats = [
            { label: "Years in Business", value: 8 },
            { label: "Brands Grown", value: 140 },
            { label: "Campaigns Launched", value: 620 },
            { label: "Team Members", value: 32 },
            { label: "Countries Served", value: 6 },
            { label: "Client Retention Rate", value: 94 },
            { label: "Avg. Follower Growth", value: 280 },
            { label: "Total Ad Spend Managed ($M)", value: 12 },
            { label: "Awards Won", value: 5 },
            { label: "Five-Star Reviews", value: 210 },
        ];
        await prisma.companyStat.createMany({
            data: stats.map((s, i) => ({ ...s, order: i })),
        });
        console.log("✔ 10 Company stats seeded");
    } else {
        console.log("⏭ Company stats already has data, skipped");
    }

    // ---------- Site Settings (singleton — 1 only, not 10) ----------
    const existingSettings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (!existingSettings) {
        await prisma.siteSettings.create({
            data: { id: "main", heroVideoUrl: null, heroImageUrl: null },
        });
        console.log("✔ Site settings initialized (empty — set via admin)");
    } else {
        console.log("⏭ Site settings already exists, skipped");
    }

    // ---------- Projects (10) ----------
    if ((await prisma.project.count()) === 0) {
        const categories = ["Social Growth", "Paid Media", "Branding", "Content", "Web"];
        await prisma.project.createMany({
            data: Array.from({ length: 10 }).map((_, i) => {
                const title = `Sample Project ${i + 1}`;
                return {
                    title,
                    slug: slugify(title) + "-" + Date.now().toString(36) + i,
                    category: categories[i % categories.length],
                    client: `Sample Client ${i + 1}`,
                    result: `Achieved strong measurable growth for client ${i + 1}.`,
                    description: `A sample project overview describing the work done for project ${i + 1}.`,
                    coverImage: `https://placehold.co/1200x800/0a0a0a/f5f5f0?text=Cover+${i + 1}`,
                    images: [`https://placehold.co/1200x800/0a0a0a/f5f5f0?text=Gallery+${i + 1}`],
                    tags: ["Social Media Management", "Content Creation"],
                    featured: i === 0,
                    order: i,
                    metricLabel: "Growth",
                    metricValue: `+${100 + i * 20}%`,
                    year: "2026",
                    duration: `${3 + i} months`,
                    challenge: `Sample challenge description for project ${i + 1}.`,
                    solution: `Sample solution description for project ${i + 1}.`,
                    results: [{ label: "Growth", value: `+${100 + i * 20}%` }],
                };
            }),
        });
        console.log("✔ 10 Projects seeded (placeholders — replace via admin)");
    } else {
        console.log("⏭ Projects already has data, skipped");
    }

    console.log("\n🎉 Seed complete!");
}

main()
    .catch((e) => {
        console.error("Seed failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));