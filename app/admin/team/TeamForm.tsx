"use client";

import { useState } from "react";
import Image from "next/image";

type TeamFormProps = {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        name: string; role: string; bio: string | null;
        linkedin: string | null; instagram: string | null; photo: string | null; order: number;
    };
};

export default function TeamForm({ action, initialData }: TeamFormProps) {
    const [submitting, setSubmitting] = useState(false);

    return (
        <form
            action={async (formData) => { setSubmitting(true); await action(formData); }}
            className="space-y-6 max-w-2xl"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Name</label>
                    <input name="name" defaultValue={initialData?.name} required className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Role</label>
                    <input name="role" defaultValue={initialData?.role} required placeholder="e.g. Creative Director" className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Bio (optional)</label>
                <textarea name="bio" defaultValue={initialData?.bio ?? ""} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">LinkedIn URL (optional)</label>
                    <input name="linkedin" defaultValue={initialData?.linkedin ?? ""} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Instagram URL (optional)</label>
                    <input name="instagram" defaultValue={initialData?.instagram ?? ""} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                </div>
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Photo {initialData ? "— leave empty to keep current" : ""}
                </label>
                {initialData?.photo && (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-2 border border-black/10">
                        <Image src={initialData.photo} alt="Current photo" fill className="object-cover" />
                    </div>
                )}
                <input type="file" name="photo" accept="image/*" className="w-full font-[var(--font-inter)] text-sm" />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Display Order</label>
                <input type="number" name="order" defaultValue={initialData?.order ?? 0} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
            </div>

            <button type="submit" disabled={submitting} className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50">
                {submitting ? "Saving..." : initialData ? "Update Member" : "Add Member"}
            </button>
        </form>
    );
}