"use client";

import { useState } from "react";
import Image from "next/image";

type ServiceFormProps = {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        title: string;
        short: string | null;
        description: string;
        icon: string | null;
        image: string | null;
        features: string[];
        order: number;
    };
};

export default function ServiceForm({ action, initialData }: ServiceFormProps) {
    const [submitting, setSubmitting] = useState(false);

    return (
        <form
            action={async (formData) => {
                setSubmitting(true);
                await action(formData);
            }}
            className="space-y-6 max-w-2xl"
        >
            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Title</label>
                <input
                    name="title"
                    defaultValue={initialData?.title}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Short Summary (one line, optional)
                </label>
                <input
                    name="short"
                    defaultValue={initialData?.short ?? ""}
                    placeholder="e.g. Full-funnel content, scheduling & community care."
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Description</label>
                <textarea
                    name="description"
                    defaultValue={initialData?.description}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Features (one per line)
                </label>
                <textarea
                    name="features"
                    defaultValue={initialData?.features?.join("\n")}
                    rows={4}
                    placeholder={"Content calendars\nDaily publishing\nCommunity management"}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Icon (small, optional) {initialData ? "— leave empty to keep current" : ""}
                </label>
                {initialData?.icon && (
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden mb-2 border border-black/10">
                        <Image src={initialData.icon} alt="Current icon" fill className="object-cover" />
                    </div>
                )}
                <input type="file" name="icon" accept="image/*" className="w-full font-[var(--font-inter)] text-sm" />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Showcase Image (background image, optional) {initialData ? "— leave empty to keep current" : ""}
                </label>
                {initialData?.image && (
                    <div className="relative w-40 aspect-video rounded-lg overflow-hidden mb-2 border border-black/10">
                        <Image src={initialData.image} alt="Current image" fill className="object-cover" />
                    </div>
                )}
                <input type="file" name="image" accept="image/*" className="w-full font-[var(--font-inter)] text-sm" />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Display Order</label>
                <input
                    type="number"
                    name="order"
                    defaultValue={initialData?.order ?? 0}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50"
            >
                {submitting ? "Saving..." : initialData ? "Update Service" : "Create Service"}
            </button>
        </form>
    );
}