import prisma from "@/lib/db";
import { requireAccess } from "@/lib/auth";
import MessagesManager from "./MessagesManager";

export default async function MessagesPage() {
    await requireAccess("messages");
    const messages = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
    });

    return <MessagesManager messages={messages} />;
}