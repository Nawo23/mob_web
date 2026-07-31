"use client";

import { useState } from "react";
import Toast from "@/components/admin/Toast";
import DeleteButton from "@/components/admin/DeleteButton";
import { createStat, updateStat, deleteStat, updateMissionVision } from "./actions";
import { canEdit } from "@/lib/permissions";

type StatItem = { id: string; label: string; value: number | null };
type MissionVisionItem = { id: string; label: string; description: string | null };

export default function StatsManager({
    stats,
    missionVision,
    role,
}: {
    stats: StatItem[];
    missionVision: MissionVisionItem[];
    role: string;
}) {
    const isEditor = canEdit(role);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    return (
        <div className="px-8 py-8 max-w-3xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="mb-8">
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">About</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                    Vision, Mission and company numbers shown on the About page.
                    {!isEditor && " — view only"}
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="mb-10">
                <h2 className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A] mb-4">
                    Mission & Vision
                </h2>
                <div className="space-y-4">
                    {missionVision.map((item) => (
                        <form
                            key={item.id}
                            action={async (formData) => {
                                if (!isEditor) return;
                                try {
                                    await updateMissionVision(item.id, formData);
                                    setToast({ message: `"${item.label}" was updated successfully.`, type: "success" });
                                } catch {
                                    setToast({ message: "Something went wrong.", type: "error" });
                                }
                            }}
                            className="bg-white border border-black/5 rounded-xl p-5"
                        >
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Title
                            </label>
                            <input
                                name="label"
                                defaultValue={item.label}
                                disabled={!isEditor}
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)] mb-4 disabled:bg-black/5 disabled:text-[#0A0A0A]/50"
                            />
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Description
                            </label>
                            <textarea
                                name="description"
                                defaultValue={item.description ?? ""}
                                disabled={!isEditor}
                                rows={3}
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)] disabled:bg-black/5 disabled:text-[#0A0A0A]/50"
                            />
                            {isEditor && (
                                <button
                                    type="submit"
                                    className="mt-4 bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                                >
                                    Save
                                </button>
                            )}
                        </form>
                    ))}
                </div>
                <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/35 mt-2">
                    Mission and Vision are fixed items — they can be edited but not deleted or duplicated.
                </p>
            </div>

            {/* Company Stats */}
            <div>
                <h2 className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A] mb-4">
                    Company Stats
                </h2>

                {isEditor && (
                    <form
                        action={async (formData) => {
                            try {
                                await createStat(formData);
                                setToast({ message: "Stat was added successfully.", type: "success" });
                                const form = document.getElementById("stat-form") as HTMLFormElement;
                                form?.reset();
                            } catch {
                                setToast({ message: "Something went wrong.", type: "error" });
                            }
                        }}
                        id="stat-form"
                        className="bg-white border border-black/5 rounded-xl p-5 mb-6 flex items-end gap-4"
                    >
                        <div className="flex-1">
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Label
                            </label>
                            <input
                                name="label"
                                required
                                placeholder="e.g. Years in Business"
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>
                        <div className="w-32">
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Value
                            </label>
                            <input
                                type="number"
                                name="value"
                                required
                                placeholder="e.g. 8"
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                        >
                            Add Stat
                        </button>
                    </form>
                )}

                {stats.length === 0 ? (
                    <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                        <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No stats yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {stats.map((stat) => (
                            <form
                                key={stat.id}
                                action={async (formData) => {
                                    if (!isEditor) return;
                                    try {
                                        await updateStat(stat.id, formData);
                                        setToast({ message: "Stat was updated successfully.", type: "success" });
                                    } catch {
                                        setToast({ message: "Something went wrong.", type: "error" });
                                    }
                                }}
                                className="bg-white border border-black/5 rounded-xl p-4 flex items-end gap-4"
                            >
                                <div className="flex-1">
                                    <label className="block font-[var(--font-inter)] text-xs text-[#0A0A0A]/50 mb-1">Label</label>
                                    <input
                                        name="label"
                                        defaultValue={stat.label}
                                        disabled={!isEditor}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)] text-sm disabled:bg-black/5"
                                    />
                                </div>
                                <div className="w-28">
                                    <label className="block font-[var(--font-inter)] text-xs text-[#0A0A0A]/50 mb-1">Value</label>
                                    <input
                                        type="number"
                                        name="value"
                                        defaultValue={stat.value ?? 0}
                                        disabled={!isEditor}
                                        required
                                        className="w-full px-3 py-2 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)] text-sm disabled:bg-black/5"
                                    />
                                </div>
                                {isEditor && (
                                    <>
                                        <button
                                            type="submit"
                                            className="font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 px-4 py-2 rounded-lg transition"
                                        >
                                            Save
                                        </button>
                                        <DeleteButton
                                            action={async () => {
                                                await deleteStat(stat.id);
                                                setToast({ message: `"${stat.label}" was deleted.`, type: "success" });
                                            }}
                                            itemName={stat.label}
                                        />
                                    </>
                                )}
                            </form>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}