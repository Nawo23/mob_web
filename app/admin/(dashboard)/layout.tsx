export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import AdminShell from "@/components/admin/AdminShell";
import { getCurrentAdmin } from "@/lib/auth";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const admin = await getCurrentAdmin();

    const messageCount = await prisma.contactSubmission.count({
        where: { status: "new" },
    });

    return (
        <AdminShell
            messageCount={messageCount}
            role={admin.role}
            name={admin.name}
            email={admin.email}
        >
            {children}
        </AdminShell>
    );
}