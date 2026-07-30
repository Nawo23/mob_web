"use server";

import prisma from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/app/generated/prisma/client";

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

function parseResults(raw: string) {
    if (!raw) return [];
    return raw
        .split("\n")
        .map((line) => {
            const [label, value] = line.split(":").map((s) => s.trim());
            return label && value ? { label, value } : null;
        })
        .filter((r): r is { label: string; value: string } => r !== null);
}

export async function createProject(formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const client = formData.get("client") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const tagsRaw = formData.get("tags") as string;
    const featured = formData.get("featured") === "on";
    const order = Number(formData.get("order")) || 0;

    const result = formData.get("result") as string;
    const metricLabel = formData.get("metricLabel") as string;
    const metricValue = formData.get("metricValue") as string;
    const year = formData.get("year") as string;
    const duration = formData.get("duration") as string;
    const challenge = formData.get("challenge") as string;
    const solution = formData.get("solution") as string;
    const testimonialQuote = formData.get("testimonialQuote") as string;
    const testimonialName = formData.get("testimonialName") as string;
    const testimonialRole = formData.get("testimonialRole") as string;
    const testimonialImage = formData.get("testimonialImage") as string;
    const results = parseResults(formData.get("results") as string);

    const coverImageFile = formData.get("coverImage") as File;
    const galleryFiles = formData.getAll("images") as File[];

    if (!coverImageFile || coverImageFile.size === 0) {
        throw new Error("Cover image is required");
    }

    const coverImage = await uploadFile(coverImageFile, "projects/covers");

    const images: string[] = [];
    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            images.push(await uploadFile(file, "projects/gallery"));
        }
    }

    const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

    await prisma.project.create({
        data: {
            title,
            slug: slugify(title) + "-" + Date.now().toString(36),
            category,
            client: client || null,
            description,
            coverImage,
            images,
            videoUrl: videoUrl || null,
            tags,
            featured,
            order,
            result: result || null,
            metricLabel: metricLabel || null,
            metricValue: metricValue || null,
            year: year || null,
            duration: duration || null,
            challenge: challenge || null,
            solution: solution || null,
            results: results.length > 0 ? (results as Prisma.InputJsonValue) : Prisma.JsonNull,
            testimonialQuote: testimonialQuote || null,
            testimonialName: testimonialName || null,
            testimonialRole: testimonialRole || null,
            testimonialImage: testimonialImage || null,
        },
    });

    revalidatePath("/admin/projects");
    //redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const client = formData.get("client") as string;
    const description = formData.get("description") as string;
    const videoUrl = formData.get("videoUrl") as string;
    const tagsRaw = formData.get("tags") as string;
    const featured = formData.get("featured") === "on";
    const order = Number(formData.get("order")) || 0;

    const result = formData.get("result") as string;
    const metricLabel = formData.get("metricLabel") as string;
    const metricValue = formData.get("metricValue") as string;
    const year = formData.get("year") as string;
    const duration = formData.get("duration") as string;
    const challenge = formData.get("challenge") as string;
    const solution = formData.get("solution") as string;
    const testimonialQuote = formData.get("testimonialQuote") as string;
    const testimonialName = formData.get("testimonialName") as string;
    const testimonialRole = formData.get("testimonialRole") as string;
    const testimonialImage = formData.get("testimonialImage") as string;
    const results = parseResults(formData.get("results") as string);

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) throw new Error("Project not found");

    const coverImageFile = formData.get("coverImage") as File;
    let coverImage = existing.coverImage;
    if (coverImageFile && coverImageFile.size > 0) {
        coverImage = await uploadFile(coverImageFile, "projects/covers");
        await deleteFile(existing.coverImage).catch(() => { });
    }

    const galleryFiles = formData.getAll("images") as File[];
    const newImages: string[] = [];
    for (const file of galleryFiles) {
        if (file && file.size > 0) {
            newImages.push(await uploadFile(file, "projects/gallery"));
        }
    }
    const images = [...existing.images, ...newImages];

    const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

    await prisma.project.update({
        where: { id },
        data: {
            title,
            category,
            client: client || null,
            description,
            coverImage,
            images,
            videoUrl: videoUrl || null,
            tags,
            featured,
            order,
            result: result || null,
            metricLabel: metricLabel || null,
            metricValue: metricValue || null,
            year: year || null,
            duration: duration || null,
            challenge: challenge || null,
            solution: solution || null,
            results: results.length > 0 ? (results as Prisma.InputJsonValue) : Prisma.JsonNull,
            testimonialQuote: testimonialQuote || null,
            testimonialName: testimonialName || null,
            testimonialRole: testimonialRole || null,
            testimonialImage: testimonialImage || null,
        },
    });

    revalidatePath("/admin/projects");
    //redirect("/admin/projects");
}

export async function deleteProject(id: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return;

    await deleteFile(project.coverImage).catch(() => { });
    for (const img of project.images) {
        await deleteFile(img).catch(() => { });
    }

    await prisma.project.delete({ where: { id } });
    revalidatePath("/admin/projects");
}

export async function removeGalleryImage(id: string, imageUrl: string) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return;

    await deleteFile(imageUrl).catch(() => { });
    await prisma.project.update({
        where: { id },
        data: { images: project.images.filter((img) => img !== imageUrl) },
    });
    revalidatePath(`/admin/projects/${id}/edit`);
}