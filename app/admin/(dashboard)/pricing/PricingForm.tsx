"use client";

import { useState } from "react";

type PricingFormProps = {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        name: string;
        price: string;
        description: string | null;
        features: string[];
        isPopular: boolean;
        order: number;
    };
};

export default function PricingForm({ action, initialData }: PricingFormProps) {
    const [submitting, setSubmitting] = useState(false);

    return (
        <form
            action={async (formData) => { setSubmitting(true); await action(formData); }}
            className="space-y-6 max-w-2xl"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Package Name</label>
                    <input name="name" defaultValue={initialData?.name} required placeholder="e.g. Starter, Growth, Premium" className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Price</label>
                    <input name="price" defaultValue={initialData?.price} required placeholder="e.g. Rs. 25,000/mo" className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Description (optional)</label>
                <textarea name="description" defaultValue={initialData?.description ?? ""} rows={2} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Features (one per line)
                </label>
                <textarea
                    name="features"
                    defaultValue={initialData?.features?.join("\n")}
                    rows={6}
                    placeholder={"e.g.\n10 posts per month\n2 platforms\nMonthly report"}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Display Order</label>
                    <input type="number" name="order" defaultValue={initialData?.order ?? 0} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
                <label className="flex items-center gap-2 mt-6 font-[var(--font-inter)] text-sm text-[#0A0A0A]">
                    <input type="checkbox" name="isPopular" defaultChecked={initialData?.isPopular} className="w-4 h-4 accent-[#FF1F3D]" />
                    Mark as "Most Popular"
                </label>
            </div>

            <button type="submit" disabled={submitting} className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50">
                {submitting ? "Saving..." : initialData ? "Update Package" : "Create Package"}
            </button>
        </form>
    );
}