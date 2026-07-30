import "dotenv/config";
import prisma from "../lib/db";
import { SERVICES, PROJECTS, TESTIMONIALS, TEAM, PRICING } from "../lib/data";

async function main() {
    console.log("Starting migration...");

    // Services
    for (let i = 0; i < SERVICES.length; i++) {
        const s = SERVICES[i];
        await prisma.service.create({
            data: {
                title: s.title,
                description: s.description,
                icon: null,
                order: i,
            },
        });
    }
    console.log(`✔ Migrated ${SERVICES.length} services`);

    // Projects
    for (let i = 0; i < PROJECTS.length; i++) {
        const p = PROJECTS[i];
        await prisma.project.create({
            data: {
                title: p.title,
                slug: p.slug,
                category: p.category,
                client: p.client,
                description: p.overview,
                coverImage: p.image,
                images: p.gallery,
                videoUrl: null,
                tags: p.servicesUsed,
                featured: false,
                order: i,
            },
        });
    }
    console.log(`✔ Migrated ${PROJECTS.length} projects`);

    // Testimonials
    for (let i = 0; i < TESTIMONIALS.length; i++) {
        const t = TESTIMONIALS[i];
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
    console.log(`✔ Migrated ${TESTIMONIALS.length} testimonials`);

    // Team
    for (let i = 0; i < TEAM.length; i++) {
        const m = TEAM[i];
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
    console.log(`✔ Migrated ${TEAM.length} team members`);

    // Pricing
    for (let i = 0; i < PRICING.length; i++) {
        const pkg = PRICING[i];
        const features = pkg.featureGroups.flatMap((g) => [
            `— ${g.title} —`,
            ...g.items,
        ]);
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
    console.log(`✔ Migrated ${PRICING.length} pricing packages`);

    console.log("🎉 Migration complete!");
}

main()
    .catch((e) => {
        console.error("Migration failed:", e);
        process.exit(1);
    })
    .finally(() => process.exit(0));