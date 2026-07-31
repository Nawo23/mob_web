"use server";

import prisma from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { revalidatePath } from "next/cache";

export async function createLogo(formData: FormData) {
    const name = formData.get("name") as string;
    const size = Number(formData.get("size")) || 100;
    const logoFile = formData.get("logo") as File;

    if (!logoFile || logoFile.size === 0) throw new Error("Logo image is required");

    const logoUrl = await uploadFile(logoFile, "logos");
    const count = await prisma.clientLogo.count();

    await prisma.clientLogo.create({
        data: { name, logoUrl, size, order: count },
    });

    revalidatePath("/admin/logos");
}

export async function deleteLogo(id: string) {
    const logo = await prisma.clientLogo.findUnique({ where: { id } });
    if (!logo) return;

    await deleteFile(logo.logoUrl).catch(() => { });
    await prisma.clientLogo.delete({ where: { id } });
    revalidatePath("/admin/logos");
}

export async function updateLogo(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const size = Number(formData.get("size")) || 100;
    const logoFile = formData.get("logo") as File;

    const existing = await prisma.clientLogo.findUnique({ where: { id } });
    if (!existing) throw new Error("Logo not found");

    let logoUrl = existing.logoUrl;
    if (logoFile && logoFile.size > 0) {
        logoUrl = await uploadFile(logoFile, "logos");
        await deleteFile(existing.logoUrl).catch(() => { });
    }

    await prisma.clientLogo.update({
        where: { id },
        data: { name, logoUrl, size },
    });

    revalidatePath("/admin/logos");
}