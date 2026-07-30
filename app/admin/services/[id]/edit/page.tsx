import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { updateService } from "../../actions";
import ServiceForm from "../../ServiceForm";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) notFound();

    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">Edit Service</h1>
            <ServiceForm action={updateService.bind(null, id)} initialData={service} />
        </div>
    );
}