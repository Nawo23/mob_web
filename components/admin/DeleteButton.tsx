"use client";

import { useState } from "react";

export default function DeleteButton({
    action,
    itemName,
}: {
    action: () => Promise<void>;
    itemName?: string;
}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="font-[var(--font-inter)] text-sm font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-4 py-2 rounded-lg transition"
            >
                Delete
            </button>

            {open && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !loading && setOpen(false)} />
                    <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <p className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A] mb-2">
                            Are you sure?
                        </p>
                        <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/55 mb-6">
                            {itemName
                                ? `This will permanently delete "${itemName}". This action cannot be undone.`
                                : "This action cannot be undone."}
                        </p>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                disabled={loading}
                                className="flex-1 font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2.5 rounded-lg transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={async () => {
                                    setLoading(true);
                                    await action();
                                    setLoading(false);
                                    setOpen(false);
                                }}
                                disabled={loading}
                                className="flex-1 font-[var(--font-inter)] text-sm font-semibold text-white bg-[#FF1F3D] hover:bg-[#FF1F3D]/90 py-2.5 rounded-lg transition disabled:opacity-50"
                            >
                                {loading ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}