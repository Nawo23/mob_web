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

export async function createStat(formData: FormData) {
    await requireEditAccess();

    const label = formData.get("label") as string;
    const value = Number(formData.get("value"));
    const count = await prisma.companyStat.count({ where: { type: "stat" } });

    await prisma.companyStat.create({
        data: { type: "stat", label, value, order: count },
    });

    revalidatePath("/admin/stats");
    revalidatePath("/about");
}

export async function updateStat(id: string, formData: FormData) {
    await requireEditAccess();

    const label = formData.get("label") as string;
    const value = Number(formData.get("value"));

    await prisma.companyStat.update({
        where: { id },
        data: { label, value },
    });

    revalidatePath("/admin/stats");
    revalidatePath("/about");
}

export async function deleteStat(id: string) {
    await requireEditAccess();
    await prisma.companyStat.delete({ where: { id } });
    revalidatePath("/admin/stats");
    revalidatePath("/about");
}

export async function updateMissionVision(id: string, formData: FormData) {
    await requireEditAccess();

    const label = formData.get("label") as string;
    const description = formData.get("description") as string;

    await prisma.companyStat.update({
        where: { id },
        data: { label, description },
    });

    revalidatePath("/admin/stats");
    revalidatePath("/about");
}