"use server";

import prisma from "@/lib/db";
import { uploadFile, deleteFile } from "@/lib/storage";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData: FormData) {
    const clientName = formData.get("clientName") as string;
    const clientRole = formData.get("clientRole") as string;
    const company = formData.get("company") as string;
    const quote = formData.get("quote") as string;
    const rating = Number(formData.get("rating")) || 5;
    const order = Number(formData.get("order")) || 0;
    const photoFile = formData.get("photo") as File;

    let photo: string | null = null;
    if (photoFile && photoFile.size > 0) {
        photo = await uploadFile(photoFile, "testimonials");
    }

    await prisma.testimonial.create({
        data: {
            clientName,
            clientRole: clientRole || null,
            company: company || null,
            quote,
            rating,
            photo,
            order,
        },
    });
    revalidatePath("/admin/testimonials");
    //redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
    const clientName = formData.get("clientName") as string;
    const clientRole = formData.get("clientRole") as string;
    const company = formData.get("company") as string;
    const quote = formData.get("quote") as string;
    const rating = Number(formData.get("rating")) || 5;
    const order = Number(formData.get("order")) || 0;

    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (!existing) throw new Error("Testimonial not found");

    const photoFile = formData.get("photo") as File;
    let photo = existing.photo;
    if (photoFile && photoFile.size > 0) {
        photo = await uploadFile(photoFile, "testimonials");
        if (existing.photo) await deleteFile(existing.photo).catch(() => { });
    }

    await prisma.testimonial.update({
        where: { id },
        data: {
            clientName,
            clientRole: clientRole || null,
            company: company || null,
            quote,
            rating,
            photo,
            order,
        },
    });
    revalidatePath("/admin/testimonials");
    //redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) return;
    if (testimonial.photo) await deleteFile(testimonial.photo).catch(() => { });
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/admin/testimonials");
}