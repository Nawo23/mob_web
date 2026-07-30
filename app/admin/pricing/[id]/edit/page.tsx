import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { updatePricingPackage } from "../../actions";
import PricingForm from "../../PricingForm";

export default async function EditPricingPackagePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const pkg = await prisma.pricingPackage.findUnique({ where: { id } });
    if (!pkg) notFound();

    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">Edit Pricing Package</h1>
            <PricingForm action={updatePricingPackage.bind(null, id)} initialData={pkg} />
        </div>
    );
}