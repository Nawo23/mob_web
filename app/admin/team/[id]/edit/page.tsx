import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { updateTeamMember } from "../../actions";
import TeamForm from "../../TeamForm";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const member = await prisma.teamMember.findUnique({ where: { id } });
    if (!member) notFound();

    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">Edit Team Member</h1>
            <TeamForm action={updateTeamMember.bind(null, id)} initialData={member} />
        </div>
    );
}