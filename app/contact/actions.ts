"use server";

import prisma from "@/lib/db";

export async function submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    budget?: string;
    message: string;
}) {
    const fullMessage = [
        data.company ? `Company: ${data.company}` : null,
        data.budget ? `Budget: ${data.budget}` : null,
        data.message,
    ]
        .filter(Boolean)
        .join("\n\n");

    await prisma.contactSubmission.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            message: fullMessage,
            status: "new",
        },
    });
}