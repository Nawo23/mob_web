import prisma from "@/lib/db";
import { requireAccess, getCurrentAdmin } from "@/lib/auth";
import TimelineManager from "./TimelineManager";

export default async function TimelinePage() {
    await requireAccess("timeline");
    const admin = await getCurrentAdmin();

    const items = await prisma.timelineItem.findMany({ orderBy: { order: "asc" } });

    return <TimelineManager items={items} role={admin.role} />;
}