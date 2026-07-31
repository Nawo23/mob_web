"use server";

import prisma from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { getCurrentAdmin } from "@/lib/auth";
import { canEdit } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

async function requireEditAccess() {
    const admin = await getCurrentAdmin();
    if (!canEdit(admin.role)) {
        throw new Error("You don't have permission to make changes.");
    }
}

export async function updateFooterSettings(formData: FormData) {
    await requireEditAccess();

    const existing = await prisma.footerSettings.findUnique({ where: { id: "main" } });

    const description = formData.get("description") as string;
    const copyrightText = formData.get("copyrightText") as string;

    const logoFile = formData.get("logo") as File;
    const bgFile = formData.get("backgroundImage") as File;

    let logoUrl = existing?.logoUrl ?? null;
    if (logoFile && logoFile.size > 0) {
        logoUrl = await uploadFile(logoFile, "footer");
        if (existing?.logoUrl) await deleteFile(existing.logoUrl).catch(() => { });
    }

    let backgroundImage = existing?.backgroundImage ?? null;
    if (bgFile && bgFile.size > 0) {
        backgroundImage = await uploadFile(bgFile, "footer");
        if (existing?.backgroundImage) await deleteFile(existing.backgroundImage).catch(() => { });
    }

    await prisma.footerSettings.upsert({
        where: { id: "main" },
        update: { description, copyrightText, logoUrl, backgroundImage },
        create: { id: "main", description, copyrightText, logoUrl, backgroundImage },
    });

    revalidatePath("/admin/footer");
    revalidatePath("/", "layout");
}

export async function removeBackgroundImage() {
    await requireEditAccess();

    const existing = await prisma.footerSettings.findUnique({ where: { id: "main" } });
    if (existing?.backgroundImage) {
        await deleteFile(existing.backgroundImage).catch(() => { });
        await prisma.footerSettings.update({ where: { id: "main" }, data: { backgroundImage: null } });
    }

    revalidatePath("/admin/footer");
    revalidatePath("/", "layout");
}

export async function removeLogo() {
    await requireEditAccess();

    const existing = await prisma.footerSettings.findUnique({ where: { id: "main" } });
    if (existing?.logoUrl) {
        await deleteFile(existing.logoUrl).catch(() => { });
        await prisma.footerSettings.update({ where: { id: "main" }, data: { logoUrl: null } });
    }

    revalidatePath("/admin/footer");
    revalidatePath("/", "layout");
}

export async function createSocialLink(formData: FormData) {
    await requireEditAccess();

    const platform = formData.get("platform") as string;
    const url = formData.get("url") as string;
    const count = await prisma.socialLink.count();

    await prisma.socialLink.create({ data: { platform, url, order: count } });

    revalidatePath("/admin/footer");
    revalidatePath("/", "layout");
}

export async function deleteSocialLink(id: string) {
    await requireEditAccess();
    await prisma.socialLink.delete({ where: { id } });
    revalidatePath("/admin/footer");
    revalidatePath("/", "layout");
}