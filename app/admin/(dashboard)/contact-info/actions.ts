"use server";

import prisma from "@/lib/db";
import { requireAccess } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateContactInfo(formData: FormData) {
    await requireAccess("contact");

    const address = formData.get("address") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const whatsappNumber = formData.get("whatsappNumber") as string;
    const workingHours = formData.get("workingHours") as string;
    const mapEmbedUrl = formData.get("mapEmbedUrl") as string;

    await prisma.contactInfo.upsert({
        where: { id: "main" },
        update: {
            address: address || null,
            email: email || null,
            phone: phone || null,
            whatsappNumber: whatsappNumber || null,
            workingHours: workingHours || null,
            mapEmbedUrl: mapEmbedUrl || null,
        },
        create: {
            id: "main",
            address: address || null,
            email: email || null,
            phone: phone || null,
            whatsappNumber: whatsappNumber || null,
            workingHours: workingHours || null,
            mapEmbedUrl: mapEmbedUrl || null,
        },
    });

    revalidatePath("/admin/contact-info");
    revalidatePath("/contact");
    revalidatePath("/");
}