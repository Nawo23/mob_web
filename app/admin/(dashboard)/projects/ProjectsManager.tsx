"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/admin/Modal";
import DeleteButton from "@/components/admin/DeleteButton";
import Toast from "@/components/admin/Toast";
import ProjectForm from "./ProjectForm";
import { createProject, updateProject, deleteProject, removeGalleryImage } from "./actions";

type ProjectItem = {
    id: string;
    title: string;
    category: string;
    client: string | null;
    description: string;
    coverImage: string;
    images: string[];
    videoUrl: string | null;
    tags: string[];
    featured: boolean;
    order: number;
    result?: string | null;
    metricLabel?: string | null;
    metricValue?: string | null;
    year?: string | null;
    duration?: string | null;
    challenge?: string | null;
    solution?: string | null;
    results?: unknown;
    testimonialQuote?: string | null;
    testimonialName?: string | null;
    testimonialRole?: string | null;
    testimonialImage?: string | null;
};

export default function ProjectsManager({ projects }: { projects: ProjectItem[] }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const openCreate = () => {
        setEditingProject(null);
        setModalOpen(true);
    };

    const openEdit = (project: ProjectItem) => {
        setEditingProject(project);
        setModalOpen(true);
    };

    return (
        <div className="px-8 py-8 max-w-6xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Projects</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                        {projects.length} project{projects.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                >
                    + New Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No projects yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white border border-black/5 rounded-xl overflow-hidden">
                            <div className="relative aspect-video bg-black/5">
                                <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
                                {project.featured && (
                                    <span className="absolute top-3 left-3 bg-[#FF1F3D] text-white text-xs font-[var(--font-inter)] font-semibold px-2 py-1 rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <div className="p-4">
                                <p className="font-[var(--font-inter)] text-xs text-[#FF1F3D] font-medium uppercase tracking-wide">
                                    {project.category}
                                </p>
                                <h3 className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A] mt-1">
                                    {project.title}
                                </h3>
                                {project.client && (
                                    <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/50 mt-0.5">{project.client}</p>
                                )}

                                <div className="flex items-center gap-2 mt-4">
                                    <button
                                        onClick={() => openEdit(project)}
                                        className="flex-1 text-center font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </button>
                                    <DeleteButton
                                        action={async () => {
                                            await deleteProject(project.id);
                                            setToast({ message: `"${project.title}" was deleted.`, type: "success" });
                                        }}
                                        itemName={project.title}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={editingProject ? "Edit Project" : "New Project"}
            >
                <ProjectForm
                    action={async (formData) => {
                        const isEditing = !!editingProject;
                        try {
                            if (isEditing) {
                                await updateProject(editingProject.id, formData);
                            } else {
                                await createProject(formData);
                            }
                            setModalOpen(false);
                            setToast({
                                message: isEditing ? "Project was updated successfully." : "Project was created successfully.",
                                type: "success",
                            });
                        } catch {
                            setToast({ message: "Something went wrong. Please try again.", type: "error" });
                        }
                    }}
                    initialData={editingProject ?? undefined}
                    onRemoveImage={
                        editingProject
                            ? async (imageUrl: string) => {
                                await removeGalleryImage(editingProject.id, imageUrl);
                            }
                            : undefined
                    }
                />
            </Modal>
        </div>
    );
}