"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function markAsRead(id: string) {
    await prisma.contactSubmission.update({
        where: { id },
        data: { status: "read" },
    });
    revalidatePath("/admin/messages");
}

export async function markAsReplied(id: string) {
    await prisma.contactSubmission.update({
        where: { id },
        data: { status: "replied" },
    });
    revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
    await prisma.contactSubmission.delete({ where: { id } });
    revalidatePath("/admin/messages");
}