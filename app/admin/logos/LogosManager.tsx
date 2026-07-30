"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/admin/Modal";
import DeleteButton from "@/components/admin/DeleteButton";
import Toast from "@/components/admin/Toast";
import { createLogo, updateLogo, deleteLogo } from "./actions";

type LogoItem = {
    id: string;
    name: string;
    logoUrl: string;
};

export default function LogosManager({ logos }: { logos: LogoItem[] }) {
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editingLogo, setEditingLogo] = useState<LogoItem | null>(null);
    const [editSubmitting, setEditSubmitting] = useState(false);

    const openEdit = (logo: LogoItem) => {
        setEditingLogo(logo);
        setEditModalOpen(true);
    };

    return (
        <div className="px-8 py-8 max-w-4xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="mb-8">
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Client Logos</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                    {logos.length} logo{logos.length !== 1 ? "s" : ""}
                </p>
            </div>

            <form
                action={async (formData) => {
                    setSubmitting(true);
                    try {
                        await createLogo(formData);
                        setToast({ message: "Logo was added successfully.", type: "success" });
                        const form = document.getElementById("logo-form") as HTMLFormElement;
                        form?.reset();
                    } catch {
                        setToast({ message: "Something went wrong. Please try again.", type: "error" });
                    }
                    setSubmitting(false);
                }}
                id="logo-form"
                className="bg-white border border-black/5 rounded-xl p-5 mb-8 flex items-end gap-4"
            >
                <div className="flex-1">
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Client Name
                    </label>
                    <input
                        name="name"
                        required
                        placeholder="e.g. Orbit Coffee Co."
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Logo Image
                    </label>
                    <input type="file" name="logo" accept="image/*" required className="w-full font-[var(--font-inter)] text-sm" />
                </div>
                <button
                    type="submit"
                    disabled={submitting}
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50"
                >
                    {submitting ? "Adding..." : "Add Logo"}
                </button>
            </form>

            {logos.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No logos yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {logos.map((logo) => (
                        <div key={logo.id} className="bg-white border border-black/5 rounded-xl p-4 text-center">
                            <div className="relative w-full h-16">
                                <Image src={logo.logoUrl} alt={logo.name} fill className="object-contain" />
                            </div>
                            <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/50 mt-2 truncate">{logo.name}</p>

                            <div className="flex items-center gap-2 mt-3">
                                <button
                                    onClick={() => openEdit(logo)}
                                    className="flex-1 font-[var(--font-inter)] text-xs font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-lg transition"
                                >
                                    Edit
                                </button>
                                <DeleteButton
                                    action={async () => {
                                        await deleteLogo(logo.id);
                                        setToast({ message: `"${logo.name}" was deleted.`, type: "success" });
                                    }}
                                    itemName={logo.name}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                title="Edit Logo"
            >
                {editingLogo && (
                    <form
                        action={async (formData) => {
                            setEditSubmitting(true);
                            try {
                                await updateLogo(editingLogo.id, formData);
                                setEditModalOpen(false);
                                setToast({ message: "Logo was updated successfully.", type: "success" });
                            } catch {
                                setToast({ message: "Something went wrong. Please try again.", type: "error" });
                            }
                            setEditSubmitting(false);
                        }}
                        className="space-y-5"
                    >
                        <div className="relative w-24 h-16 mx-auto">
                            <Image src={editingLogo.logoUrl} alt={editingLogo.name} fill className="object-contain" />
                        </div>

                        <div>
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Client Name
                            </label>
                            <input
                                name="name"
                                defaultValue={editingLogo.name}
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>

                        <div>
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Replace Logo Image (optional — leave empty to keep current)
                            </label>
                            <input type="file" name="logo" accept="image/*" className="w-full font-[var(--font-inter)] text-sm" />
                        </div>

                        <button
                            type="submit"
                            disabled={editSubmitting}
                            className="w-full bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50"
                        >
                            {editSubmitting ? "Saving..." : "Update Logo"}
                        </button>
                    </form>
                )}
            </Modal>
        </div>
    );
}