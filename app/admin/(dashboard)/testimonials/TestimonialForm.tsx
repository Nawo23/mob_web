"use client";

import { useState } from "react";
import Image from "next/image";

type TestimonialFormProps = {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        clientName: string;
        clientRole: string | null;
        company: string | null;
        quote: string;
        rating: number;
        photo: string | null;
        order: number;
    };
};

export default function TestimonialForm({ action, initialData }: TestimonialFormProps) {
    const [submitting, setSubmitting] = useState(false);

    return (
        <form
            action={async (formData) => { setSubmitting(true); await action(formData); }}
            className="space-y-6 max-w-2xl"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Client Name</label>
                    <input name="clientName" defaultValue={initialData?.clientName} required className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Role (optional)</label>
                    <input name="clientRole" defaultValue={initialData?.clientRole ?? ""} placeholder="e.g. Founder" className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Company (optional)</label>
                <input name="company" defaultValue={initialData?.company ?? ""} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Quote</label>
                <textarea name="quote" defaultValue={initialData?.quote} required rows={4} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Rating (1-5)</label>
                    <input type="number" name="rating" min={1} max={5} defaultValue={initialData?.rating ?? 5} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Display Order</label>
                    <input type="number" name="order" defaultValue={initialData?.order ?? 0} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Photo (optional) {initialData ? "— leave empty to keep current" : ""}
                </label>
                {initialData?.photo && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 border border-black/10">
                        <Image src={initialData.photo} alt="Current photo" fill className="object-cover" />
                    </div>
                )}
                <input type="file" name="photo" accept="image/*" className="w-full font-[var(--font-inter)] text-sm" />
            </div>

            <button type="submit" disabled={submitting} className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50">
                {submitting ? "Saving..." : initialData ? "Update Testimonial" : "Add Testimonial"}
            </button>
        </form>
    );
}