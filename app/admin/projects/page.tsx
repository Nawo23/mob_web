import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { deleteProject } from "./actions";
import { requireAccess } from "@/lib/auth";
import ProjectsManager from "./ProjectsManager";

export default async function ProjectsPage() {
    await requireAccess("projects");

    const projects = await prisma.project.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return <ProjectsManager projects={projects} />;
    (
        <div className="px-8 py-8 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">
                        Projects
                    </h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                        {projects.length} project{projects.length !== 1 ? "s" : ""}
                    </p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                >
                    + New Project
                </Link>
            </div>

            {projects.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">
                        No projects yet. Create your first one.
                    </p>
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
                                    <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/50 mt-0.5">
                                        {project.client}
                                    </p>
                                )}

                                <div className="flex items-center gap-2 mt-4">
                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="flex-1 text-center font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2 rounded-lg transition"
                                    >
                                        Edit
                                    </Link>
                                    <form
                                        action={async () => {
                                            "use server";
                                            await deleteProject(project.id);
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="font-[var(--font-inter)] text-sm font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-4 py-2 rounded-lg transition"
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}