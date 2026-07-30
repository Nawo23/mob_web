"use server";

import prisma from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createTeamMember(formData: FormData) {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const linkedin = formData.get("linkedin") as string;
    const instagram = formData.get("instagram") as string;
    const order = Number(formData.get("order")) || 0;
    const photoFile = formData.get("photo") as File;

    let photo: string | null = null;
    if (photoFile && photoFile.size > 0) {
        photo = await uploadFile(photoFile, "team");
    }

    await prisma.teamMember.create({
        data: { name, role, bio: bio || null, linkedin: linkedin || null, instagram: instagram || null, photo, order },
    });
    revalidatePath("/admin/team");
    //redirect("/admin/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const bio = formData.get("bio") as string;
    const linkedin = formData.get("linkedin") as string;
    const instagram = formData.get("instagram") as string;
    const order = Number(formData.get("order")) || 0;

    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) throw new Error("Team member not found");

    const photoFile = formData.get("photo") as File;
    let photo = existing.photo;
    if (photoFile && photoFile.size > 0) {
        photo = await uploadFile(photoFile, "team");
        if (existing.photo) await deleteFile(existing.photo).catch(() => { });
    }

    await prisma.teamMember.update({
        where: { id },
        data: { name, role, bio: bio || null, linkedin: linkedin || null, instagram: instagram || null, photo, order },
    });
    revalidatePath("/admin/team");
    //redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (!member) return;
    if (member.photo) await deleteFile(member.photo).catch(() => { });
    await prisma.teamMember.delete({ where: { id } });
    revalidatePath("/admin/team");
}