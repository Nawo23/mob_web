import { createTeamMember } from "../actions";
import TeamForm from "../TeamForm";

export default function NewTeamMemberPage() {
    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">Add Team Member</h1>
            <TeamForm action={createTeamMember} />
        </div>
    );
}