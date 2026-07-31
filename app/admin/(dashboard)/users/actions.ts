"use server";

import prisma from "@/lib/db";
import { supabaseAdmin } from "@/lib/supabase";
import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function requireSuperAdmin() {
    const admin = await getCurrentAdmin();
    if (admin.role !== "SUPER_ADMIN") redirect("/admin");
    return admin;
}

export async function createStaffUser(formData: FormData) {
    await requireSuperAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
    });

    if (error || !data.user) {
        throw new Error(error?.message || "Failed to create account");
    }

    await prisma.user.create({
        data: {
            id: data.user.id,
            email,
            name,
            password: "",
            role: role as "ADMIN" | "SUPER_ADMIN",
        },
    });

    revalidatePath("/admin/users");
    redirect("/admin/users");
}

export async function deleteStaffUser(id: string) {
    const superAdmin = await requireSuperAdmin();
    if (id === superAdmin.id) throw new Error("You can't delete your own account");

    await supabaseAdmin.auth.admin.deleteUser(id).catch(() => { });
    await prisma.user.delete({ where: { id } });
    revalidatePath("/admin/users");
}