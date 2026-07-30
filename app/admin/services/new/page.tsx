import { createService } from "../actions";
import ServiceForm from "../ServiceForm";

export default function NewServicePage() {
    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">New Service</h1>
            <ServiceForm action={createService} />
        </div>
    );
}