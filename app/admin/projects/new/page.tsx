import { createProject } from "../actions";
import ProjectForm from "../ProjectForm";

export default function NewProjectPage() {
    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">
                New Project
            </h1>
            <ProjectForm action={createProject} />
        </div>
    );
}