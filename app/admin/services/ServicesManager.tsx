"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/admin/Modal";
import DeleteButton from "@/components/admin/DeleteButton";
import ServiceForm from "./ServiceForm";
import Toast from "@/components/admin/Toast";
import { createService, updateService, deleteService } from "./actions";

type ServiceItem = {
    id: string;
    title: string;
    short: string | null;
    description: string;
    icon: string | null;
    image: string | null;
    features: string[];
    order: number;
};

export default function ServicesManager({ services }: { services: ServiceItem[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const openCreate = () => {
        setEditingService(null);
        setModalOpen(true);
    };

    const openEdit = (service: ServiceItem) => {
        setEditingService(service);
        setModalOpen(true);
    };

    return (
        <div className="px-8 py-8 max-w-5xl">
            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Services</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                        {services.length} service{services.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                >
                    + New Service
                </button>
            </div>

            {services.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No services yet.</p>
                </div>
            ) : (
                <div className="bg-white border border-black/5 rounded-xl divide-y divide-black/5">
                    {services.map((service) => (
                        <div key={service.id} className="flex items-center gap-4 px-5 py-4">
                            {service.icon ? (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/10">
                                    <Image src={service.icon} alt={service.title} fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-[#0A0A0A]/5 shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="font-[var(--font-inter)] font-medium text-[#0A0A0A]">{service.title}</p>
                                <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/50 line-clamp-1">
                                    {service.description}
                                </p>
                            </div>
                            <button
                                onClick={() => openEdit(service)}
                                className="font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 px-4 py-2 rounded-lg transition"
                            >
                                Edit
                            </button>
                            <DeleteButton
                                action={async () => {
                                    await deleteService(service.id);
                                }}
                                itemName={service.title}
                            />
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingService ? "Edit Service" : "New Service"}
            >
                <ServiceForm
                    action={async (formData) => {
                        if (editingService) {
                            await updateService(editingService.id, formData);
                        } else {
                            await createService(formData);
                        }
                        setModalOpen(false);
                    }}
                    initialData={editingService ?? undefined}
                />
            </Modal>
        </div>
    );
}