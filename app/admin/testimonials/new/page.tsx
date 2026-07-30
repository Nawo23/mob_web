import { createTestimonial } from "../actions";
import TestimonialForm from "../TestimonialForm";

export default function NewTestimonialPage() {
    return (
        <div className="px-8 py-8">
            <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] mb-8">Add Testimonial</h1>
            <TestimonialForm action={createTestimonial} />
        </div>
    );
}