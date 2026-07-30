"use client";

import { useState } from "react";
import Image from "next/image";

type ProjectFormProps = {
    action: (formData: FormData) => Promise<void>;
    initialData?: {
        title: string;
        category: string;
        client: string | null;
        description: string;
        coverImage: string;
        images: string[];
        videoUrl: string | null;
        tags: string[];
        featured: boolean;
        order: number;
        result?: string | null;
        metricLabel?: string | null;
        metricValue?: string | null;
        year?: string | null;
        duration?: string | null;
        challenge?: string | null;
        solution?: string | null;
        results?: unknown;
        testimonialQuote?: string | null;
        testimonialName?: string | null;
        testimonialRole?: string | null;
        testimonialImage?: string | null;
    };
    onRemoveImage?: (imageUrl: string) => Promise<void>;
};

export default function ProjectForm({ action, initialData, onRemoveImage }: ProjectFormProps) {
    const [submitting, setSubmitting] = useState(false);

    const resultsText = Array.isArray(initialData?.results)
        ? (initialData!.results as { label: string; value: string }[])
            .map((r) => `${r.label}: ${r.value}`)
            .join("\n")
        : "";

    return (
        <form
            action={async (formData) => {
                setSubmitting(true);
                await action(formData);
            }}
            className="space-y-6 max-w-2xl"
        >
            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Title
                </label>
                <input
                    name="title"
                    defaultValue={initialData?.title}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Category
                    </label>
                    <input
                        name="category"
                        defaultValue={initialData?.category}
                        required
                        placeholder="e.g. Social Media, Branding"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Client
                    </label>
                    <input
                        name="client"
                        defaultValue={initialData?.client ?? ""}
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Description
                </label>
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
                    Cover Image {initialData ? "(leave empty to keep current)" : ""}
                </label>
                {initialData?.coverImage && (
                    <div className="relative w-40 aspect-video rounded-lg overflow-hidden mb-2 border border-black/10">
                        <Image src={initialData.coverImage} alt="Current cover" fill className="object-cover" />
                    </div>
                )}
                <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    required={!initialData}
                    className="w-full font-[var(--font-inter)] text-sm"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Gallery Images {initialData ? "(adds to existing gallery)" : ""}
                </label>

                {initialData?.images && initialData.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        {initialData.images.map((img) => (
                            <div key={img} className="relative group">
                                <div className="relative aspect-square rounded-lg overflow-hidden border border-black/10">
                                    <Image src={img} alt="Gallery" fill className="object-cover" />
                                </div>
                                {onRemoveImage && (
                                    <button
                                        type="button"
                                        onClick={() => onRemoveImage(img)}
                                        className="absolute top-1 right-1 bg-[#FF1F3D] text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    className="w-full font-[var(--font-inter)] text-sm"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Video URL (optional)
                </label>
                <input
                    name="videoUrl"
                    defaultValue={initialData?.videoUrl ?? ""}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Tags (comma separated)
                </label>
                <input
                    name="tags"
                    defaultValue={initialData?.tags?.join(", ")}
                    placeholder="e.g. Instagram, Reels, Growth"
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Display Order
                    </label>
                    <input
                        type="number"
                        name="order"
                        defaultValue={initialData?.order ?? 0}
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
                <label className="flex items-center gap-2 mt-6 font-[var(--font-inter)] text-sm text-[#0A0A0A]">
                    <input
                        type="checkbox"
                        name="featured"
                        defaultChecked={initialData?.featured}
                        className="w-4 h-4 accent-[#FF1F3D]"
                    />
                    Featured project
                </label>
            </div>

            <hr className="border-black/10" />
            <p className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A]">
                Case Study Details (optional)
            </p>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Result Summary (shown on grid card, e.g. &quot;Grew followers by 3,100%&quot;)
                </label>
                <input
                    name="result"
                    defaultValue={initialData?.result ?? ""}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Metric Label
                    </label>
                    <input
                        name="metricLabel"
                        defaultValue={initialData?.metricLabel ?? ""}
                        placeholder="e.g. Follower Growth"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Metric Value
                    </label>
                    <input
                        name="metricValue"
                        defaultValue={initialData?.metricValue ?? ""}
                        placeholder="e.g. +3,100%"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Year
                    </label>
                    <input
                        name="year"
                        defaultValue={initialData?.year ?? ""}
                        placeholder="e.g. 2025"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Duration
                    </label>
                    <input
                        name="duration"
                        defaultValue={initialData?.duration ?? ""}
                        placeholder="e.g. 11 months"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Challenge
                </label>
                <textarea
                    name="challenge"
                    defaultValue={initialData?.challenge ?? ""}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Solution
                </label>
                <textarea
                    name="solution"
                    defaultValue={initialData?.solution ?? ""}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div>
                <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                    Results (one per line, format: Label: Value)
                </label>
                <textarea
                    name="results"
                    defaultValue={resultsText}
                    rows={4}
                    placeholder={"Follower Growth: +3,100%\nNew Locations: 6"}
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Testimonial Quote
                    </label>
                    <textarea
                        name="testimonialQuote"
                        defaultValue={initialData?.testimonialQuote ?? ""}
                        rows={2}
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
                <div className="space-y-4">
                    <input
                        name="testimonialName"
                        defaultValue={initialData?.testimonialName ?? ""}
                        placeholder="Client name"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                    <input
                        name="testimonialRole"
                        defaultValue={initialData?.testimonialRole ?? ""}
                        placeholder="Role, Company"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                    <input
                        name="testimonialImage"
                        defaultValue={initialData?.testimonialImage ?? ""}
                        placeholder="Photo URL"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50"
            >
                {submitting ? "Saving..." : initialData ? "Update Project" : "Create Project"}
            </button>
        </form>
    );
}