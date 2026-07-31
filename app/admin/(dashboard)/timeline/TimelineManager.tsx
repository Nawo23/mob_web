"use client";

import { useState } from "react";
import Modal from "@/components/admin/Modal";
import DeleteButton from "@/components/admin/DeleteButton";
import Toast from "@/components/admin/Toast";
import { createTimelineItem, updateTimelineItem, deleteTimelineItem } from "./actions";
import { canEdit } from "@/lib/permissions";

type TimelineItemData = {
    id: string;
    year: string;
    title: string;
    text: string;
    order: number;
};

export default function TimelineManager({ items, role }: { items: TimelineItemData[]; role: string }) {
    const isEditor = canEdit(role);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TimelineItemData | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const openCreate = () => {
        setEditingItem(null);
        setModalOpen(true);
    };

    const openEdit = (item: TimelineItemData) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    return (
        <div className="px-8 py-8 max-w-3xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Our Journey (Timeline)</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                        {items.length} milestone{items.length !== 1 ? "s" : ""}
                        {!isEditor && " — view only"}
                    </p>
                </div>
                {isEditor && (
                    <button
                        onClick={openCreate}
                        className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                    >
                        + Add Milestone
                    </button>
                )}
            </div>

            {items.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No milestones yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white border border-black/5 rounded-xl p-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="font-[var(--font-inter)] text-xs font-semibold text-[#FF1F3D]">{item.year}</p>
                                <p className="font-[var(--font-outfit)] font-semibold text-[#0A0A0A] mt-0.5">{item.title}</p>
                                <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/55 mt-1">{item.text}</p>
                            </div>
                            {isEditor && (
                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        onClick={() => openEdit(item)}
                                        className="font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 px-4 py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <DeleteButton
                                        action={async () => {
                                            await deleteTimelineItem(item.id);
                                            setToast({ message: `"${item.title}" was deleted.`, type: "success" });
                                        }}
                                        itemName={item.title}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {isEditor && (
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    title={editingItem ? "Edit Milestone" : "Add Milestone"}
                >
                    <form
                        action={async (formData) => {
                            const isEditing = !!editingItem;
                            try {
                                if (isEditing) {
                                    await updateTimelineItem(editingItem.id, formData);
                                } else {
                                    await createTimelineItem(formData);
                                }
                                setModalOpen(false);
                                setToast({
                                    message: isEditing ? "Milestone was updated successfully." : "Milestone was added successfully.",
                                    type: "success",
                                });
                            } catch {
                                setToast({ message: "Something went wrong. Please try again.", type: "error" });
                            }
                        }}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Year
                            </label>
                            <input
                                name="year"
                                defaultValue={editingItem?.year}
                                required
                                placeholder="e.g. 2018"
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>
                        <div>
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Title
                            </label>
                            <input
                                name="title"
                                defaultValue={editingItem?.title}
                                required
                                placeholder="e.g. MetaCraze founded"
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>
                        <div>
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Description
                            </label>
                            <textarea
                                name="text"
                                defaultValue={editingItem?.text}
                                required
                                rows={3}
                                placeholder="e.g. Started as a two-person studio helping local businesses get online."
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                        >
                            {editingItem ? "Update Milestone" : "Add Milestone"}
                        </button>
                    </form>
                </Modal>
            )}
        </div>
    );
}