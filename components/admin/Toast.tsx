"use client";

import { useEffect } from "react";

export default function Toast({
    message,
    type = "success",
    onClose,
}: {
    message: string;
    type?: "success" | "error";
    onClose: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-6 right-6 z-[1000] animate-in slide-in-from-top-2 fade-in duration-300">
            <div
                className={`flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-lg font-[var(--font-inter)] text-sm font-medium ${type === "success" ? "bg-[#0A0A0A] text-white" : "bg-[#FF1F3D] text-white"
                    }`}
            >
                <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 ${type === "success" ? "bg-emerald-500" : "bg-white/20"
                        }`}
                >
                    {type === "success" ? "✓" : "✕"}
                </span>
                {message}
            </div>
        </div>
    );
}