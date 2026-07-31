"use server";

import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPricingPackage(formData: FormData) {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const featuresRaw = formData.get("features") as string;
    const isPopular = formData.get("isPopular") === "on";
    const order = Number(formData.get("order")) || 0;

    const features = featuresRaw
        ? featuresRaw.split("\n").map((f) => f.trim()).filter(Boolean)
        : [];

    await prisma.pricingPackage.create({
        data: { name, price, description: description || null, features, isPopular, order },
    });
    revalidatePath("/admin/pricing");
    //redirect("/admin/pricing");
}

export async function updatePricingPackage(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const featuresRaw = formData.get("features") as string;
    const isPopular = formData.get("isPopular") === "on";
    const order = Number(formData.get("order")) || 0;

    const features = featuresRaw
        ? featuresRaw.split("\n").map((f) => f.trim()).filter(Boolean)
        : [];

    await prisma.pricingPackage.update({
        where: { id },
        data: { name, price, description: description || null, features, isPopular, order },
    });
    revalidatePath("/admin/pricing");
    //redirect("/admin/pricing");
}

export async function deletePricingPackage(id: string) {
    await prisma.pricingPackage.delete({ where: { id } });
    revalidatePath("/admin/pricing");
}