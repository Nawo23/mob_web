import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { deleteTeamMember } from "./actions";
import { requireAccess } from "@/lib/auth";
import TeamManager from "./TeamManager";

export default async function TeamPage() {
    await requireAccess("team");
    const members = await prisma.teamMember.findMany({ orderBy: [{ order: "asc" }] });

    return <TeamManager members={members} />;
    (
        <div className="px-8 py-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Team</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">{members.length} member{members.length !== 1 ? "s" : ""}</p>
                </div>
                <Link href="/admin/team/new" className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition">
                    + Add Member
                </Link>
            </div>

            {members.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No team members yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {members.map((member) => (
                        <div key={member.id} className="bg-white border border-black/5 rounded-xl p-5 text-center">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border border-black/10 bg-black/5">
                                {member.photo && <Image src={member.photo} alt={member.name} fill className="object-cover" />}
                            </div>
                            <p className="font-[var(--font-outfit)] font-semibold text-[#0A0A0A]">{member.name}</p>
                            <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/50">{member.role}</p>

                            <div className="flex items-center gap-2 mt-4">
                                <Link href={`/admin/team/${member.id}/edit`} className="flex-1 text-center font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2 rounded-lg transition">
                                    Edit
                                </Link>
                                <form action={async () => { "use server"; await deleteTeamMember(member.id); }}>
                                    <button type="submit" className="font-[var(--font-inter)] text-sm font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-4 py-2 rounded-lg transition">
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}