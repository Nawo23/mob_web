"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/admin/Modal";
import DeleteButton from "@/components/admin/DeleteButton";
import Toast from "@/components/admin/Toast";
import TestimonialForm from "./TestimonialForm";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "./actions";

type TestimonialItem = {
    id: string;
    clientName: string;
    clientRole: string | null;
    company: string | null;
    quote: string;
    rating: number;
    photo: string | null;
    order: number;
};

export default function TestimonialsManager({ testimonials }: { testimonials: TestimonialItem[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const openCreate = () => {
        setEditingTestimonial(null);
        setModalOpen(true);
    };

    const openEdit = (t: TestimonialItem) => {
        setEditingTestimonial(t);
        setModalOpen(true);
    };

    return (
        <div className="px-8 py-8 max-w-5xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Testimonials</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                        {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                >
                    + Add Testimonial
                </button>
            </div>

            {testimonials.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No testimonials yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white border border-black/5 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black/5 shrink-0 border border-black/10">
                                    {t.photo && <Image src={t.photo} alt={t.clientName} fill className="object-cover" />}
                                </div>
                                <div>
                                    <p className="font-[var(--font-inter)] font-medium text-sm text-[#0A0A0A]">{t.clientName}</p>
                                    <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/50">
                                        {[t.clientRole, t.company].filter(Boolean).join(", ")}
                                    </p>
                                </div>
                            </div>
                            <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/70 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>

                            <div className="flex items-center gap-2 mt-4">
                                <button
                                    onClick={() => openEdit(t)}
                                    className="flex-1 text-center font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <DeleteButton
                                    action={async () => {
                                        await deleteTestimonial(t.id);
                                        setToast({ message: `Testimonial from "${t.clientName}" was deleted.`, type: "success" });
                                    }}
                                    itemName={`testimonial from ${t.clientName}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            >
                <TestimonialForm
                    action={async (formData) => {
                        const isEditing = !!editingTestimonial;
                        try {
                            if (isEditing) {
                                await updateTestimonial(editingTestimonial.id, formData);
                            } else {
                                await createTestimonial(formData);
                            }
                            setModalOpen(false);
                            setToast({
                                message: isEditing ? "Testimonial was updated successfully." : "Testimonial was added successfully.",
                                type: "success",
                            });
                        } catch {
                            setToast({ message: "Something went wrong. Please try again.", type: "error" });
                        }
                    }}
                    initialData={editingTestimonial ?? undefined}
                />
            </Modal>
        </div>
    );
}