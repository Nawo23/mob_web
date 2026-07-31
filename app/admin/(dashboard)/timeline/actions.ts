"use server";

import prisma from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { canEdit } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

async function requireEditAccess() {
    const admin = await getCurrentAdmin();
    if (!canEdit(admin.role)) {
        throw new Error("You don't have permission to make changes.");
    }
}

export async function createTimelineItem(formData: FormData) {
    await requireEditAccess();

    const year = formData.get("year") as string;
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;
    const count = await prisma.timelineItem.count();

    await prisma.timelineItem.create({
        data: { year, title, text, order: count },
    });

    revalidatePath("/admin/timeline");
    revalidatePath("/about");
}

export async function updateTimelineItem(id: string, formData: FormData) {
    await requireEditAccess();

    const year = formData.get("year") as string;
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;

    await prisma.timelineItem.update({
        where: { id },
        data: { year, title, text },
    });

    revalidatePath("/admin/timeline");
    revalidatePath("/about");
}

export async function deleteTimelineItem(id: string) {
    await requireEditAccess();
    await prisma.timelineItem.delete({ where: { id } });
    revalidatePath("/admin/timeline");
    revalidatePath("/about");
}