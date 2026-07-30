"use server";

import prisma from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

export async function createService(formData: FormData) {
    const title = formData.get("title") as string;
    const short = formData.get("short") as string;
    const description = formData.get("description") as string;
    const featuresRaw = formData.get("features") as string;
    const order = Number(formData.get("order")) || 0;

    const iconFile = formData.get("icon") as File;
    const imageFile = formData.get("image") as File;

    let icon: string | null = null;
    if (iconFile && iconFile.size > 0) {
        icon = await uploadFile(iconFile, "services/icons");
    }

    let image: string | null = null;
    if (imageFile && imageFile.size > 0) {
        image = await uploadFile(imageFile, "services/images");
    }

    const features = featuresRaw
        ? featuresRaw.split("\n").map((f) => f.trim()).filter(Boolean)
        : [];

    await prisma.service.create({
        data: {
            title,
            slug: slugify(title) + "-" + Date.now().toString(36),
            short: short || null,
            description,
            icon,
            image,
            features,
            order,
        },
    });


    redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const short = formData.get("short") as string;
    const description = formData.get("description") as string;
    const featuresRaw = formData.get("features") as string;
    const order = Number(formData.get("order")) || 0;

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) throw new Error("Service not found");

    const iconFile = formData.get("icon") as File;
    let icon = existing.icon;
    if (iconFile && iconFile.size > 0) {
        icon = await uploadFile(iconFile, "services/icons");
        if (existing.icon) await deleteFile(existing.icon).catch(() => { });
    }

    const imageFile = formData.get("image") as File;
    let image = existing.image;
    if (imageFile && imageFile.size > 0) {
        image = await uploadFile(imageFile, "services/images");
        if (existing.image) await deleteFile(existing.image).catch(() => { });
    }

    const features = featuresRaw
        ? featuresRaw.split("\n").map((f) => f.trim()).filter(Boolean)
        : [];

    await prisma.service.update({
        where: { id },
        data: { title, short: short || null, description, icon, image, features, order },
    });

    revalidatePath("/admin/services");
    //redirect("/admin/services");
}

export async function deleteService(id: string) {
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return;
    if (service.icon) await deleteFile(service.icon).catch(() => { });
    if (service.image) await deleteFile(service.image).catch(() => { });
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
}