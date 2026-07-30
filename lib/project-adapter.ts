import type { Project as DbProject } from "@/app/generated/prisma/client";

export type Project = {
    slug: string;
    title: string;
    client: string;
    category: string;
    result: string;
    image: string;
    metric: { label: string; value: string };
    year: string;
    duration: string;
    servicesUsed: string[];
    overview: string;
    challenge: string;
    solution: string;
    gallery: string[];
    results: { label: string; value: string }[];
    testimonial: { quote: string; name: string; role: string; image: string };
};

export function toLegacyProject(p: DbProject): Project {
    return {
        slug: p.slug,
        title: p.title,
        client: p.client ?? "",
        category: p.category,
        result: p.result ?? p.description,
        image: p.coverImage,
        metric: { label: p.metricLabel ?? "", value: p.metricValue ?? "" },
        year: p.year ?? new Date(p.createdAt).getFullYear().toString(),
        duration: p.duration ?? "",
        servicesUsed: p.tags,
        overview: p.description,
        challenge: p.challenge ?? "",
        solution: p.solution ?? "",
        gallery: p.images.length > 0 ? p.images : [p.coverImage],
        results: (p.results as { label: string; value: string }[] | null) ?? [],
        testimonial: {
            quote: p.testimonialQuote ?? "",
            name: p.testimonialName ?? "",
            role: p.testimonialRole ?? "",
            image: p.testimonialImage ?? "",
        },
    };
}