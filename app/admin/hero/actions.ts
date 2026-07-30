"use server";

import prisma from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

function getContentType(filename: string) {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "png") return "image/png";
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "webp") return "image/webp";
    if (ext === "mp4") return "video/mp4";
    if (ext === "webm") return "video/webm";
    return "application/octet-stream";
}

async function uploadFile(file: File, folder: string) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const storagePath = `${folder}/${Date.now()}-${file.name}`;

    const { error } = await supabaseAdmin.storage
        .from("media")
        .upload(storagePath, buffer, {
            contentType: getContentType(file.name),
            upsert: false,
        });

    if (error) throw new Error(error.message);

    const { data } = supabaseAdmin.storage.from("media").getPublicUrl(storagePath);
    return data.publicUrl;
}

async function deleteFileFromStorage(url: string) {
    // extract storage path from public URL
    const marker = "/media/";
    const idx = url.indexOf(marker);
    if (idx === -1) return;
    const storagePath = url.slice(idx + marker.length);
    await supabaseAdmin.storage.from("media").remove([storagePath]);
}

export async function uploadHeroImage(formData: FormData) {
    const file = formData.get("image") as File;
    if (!file || file.size === 0) throw new Error("No file provided");

    const current = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (current?.heroImageUrl) {
        await deleteFileFromStorage(current.heroImageUrl);
    }

    const url = await uploadFile(file, "hero");

    await prisma.siteSettings.upsert({
        where: { id: "main" },
        update: { heroImageUrl: url },
        create: { id: "main", heroImageUrl: url },
    });

    revalidatePath("/admin/hero");
    revalidatePath("/");
}

export async function uploadHeroVideo(formData: FormData) {
    const file = formData.get("video") as File;
    if (!file || file.size === 0) throw new Error("No file provided");

    const current = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (current?.heroVideoUrl) {
        await deleteFileFromStorage(current.heroVideoUrl);
    }

    const url = await uploadFile(file, "hero");

    await prisma.siteSettings.upsert({
        where: { id: "main" },
        update: { heroVideoUrl: url },
        create: { id: "main", heroVideoUrl: url },
    });

    revalidatePath("/admin/hero");
    revalidatePath("/");
}

export async function deleteHeroImage() {
    const current = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (current?.heroImageUrl) {
        await deleteFileFromStorage(current.heroImageUrl);
    }

    await prisma.siteSettings.update({
        where: { id: "main" },
        data: { heroImageUrl: null },
    });

    revalidatePath("/admin/hero");
    revalidatePath("/");
}

export async function deleteHeroVideo() {
    const current = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    if (current?.heroVideoUrl) {
        await deleteFileFromStorage(current.heroVideoUrl);
    }

    await prisma.siteSettings.update({
        where: { id: "main" },
        data: { heroVideoUrl: null },
    });

    revalidatePath("/admin/hero");
    revalidatePath("/");
}