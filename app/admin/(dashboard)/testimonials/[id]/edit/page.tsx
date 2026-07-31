import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { updateTestimonial } from "../../actions";
import TestimonialForm from "../../TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) notFound();

    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">Edit Testimonial</h1>
            <TestimonialForm action={updateTestimonial.bind(null, id)} initialData={testimonial} />
        </div>
    );
}