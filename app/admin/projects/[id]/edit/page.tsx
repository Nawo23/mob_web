import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { updateProject, removeGalleryImage } from "../../actions";
import ProjectForm from "../../ProjectForm";

export default async function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project) notFound();

    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">
                Edit Project
            </h1>
            <ProjectForm
                action={updateProject.bind(null, id)}
                initialData={project}
                onRemoveImage={removeGalleryImage.bind(null, id)}
            />
        </div>
    );
}