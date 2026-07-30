"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/admin/Modal";
import DeleteButton from "@/components/admin/DeleteButton";
import Toast from "@/components/admin/Toast";
import TeamForm from "./TeamForm";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "./actions";

type TeamMemberItem = {
    id: string;
    name: string;
    role: string;
    bio: string | null;
    linkedin: string | null;
    instagram: string | null;
    photo: string | null;
    order: number;
};

export default function TeamManager({ members }: { members: TeamMemberItem[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const openCreate = () => {
        setEditingMember(null);
        setModalOpen(true);
    };

    const openEdit = (member: TeamMemberItem) => {
        setEditingMember(member);
        setModalOpen(true);
    };

    return (
        <div className="px-8 py-8 max-w-5xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Team</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                        {members.length} member{members.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                >
                    + Add Member
                </button>
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
                                <button
                                    onClick={() => openEdit(member)}
                                    className="flex-1 text-center font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <DeleteButton
                                    action={async () => {
                                        await deleteTeamMember(member.id);
                                        setToast({ message: `"${member.name}" was deleted.`, type: "success" });
                                    }}
                                    itemName={member.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingMember ? "Edit Team Member" : "Add Team Member"}
            >
                <TeamForm
                    action={async (formData) => {
                        const isEditing = !!editingMember;
                        try {
                            if (isEditing) {
                                await updateTeamMember(editingMember.id, formData);
                            } else {
                                await createTeamMember(formData);
                            }
                            setModalOpen(false);
                            setToast({
                                message: isEditing ? "Team member was updated successfully." : "Team member was added successfully.",
                                type: "success",
                            });
                        } catch {
                            setToast({ message: "Something went wrong. Please try again.", type: "error" });
                        }
                    }}
                    initialData={editingMember ?? undefined}
                />
            </Modal>
        </div>
    );
}