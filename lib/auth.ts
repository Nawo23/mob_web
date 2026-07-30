import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function getCurrentAdmin() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) redirect("/admin/login");

    let dbUser = await prisma.user.findUnique({
        where: { id: user.id },
    });

    if (!dbUser && user.email) {
        dbUser = await prisma.user.findUnique({
            where: { email: user.email },
        });
    }

    if (!dbUser && user.email) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name || user.user_metadata?.full_name || user.email.split("@")[0],
                password: "",
                role: "ADMIN",
            },
        });
    }

    if (!dbUser) redirect("/admin/login");

    return dbUser;
}

export async function requireAccess(section: string) {
    const admin = await getCurrentAdmin();
    const { hasAccess, getDefaultRoute } = await import("./permissions");

    if (!hasAccess(admin.role, section as any)) {
        redirect(getDefaultRoute(admin.role));
    }

    return admin;
}