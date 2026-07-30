"use client";

import { useEffect } from "react";

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header - fixed, doesn't scroll */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 shrink-0">
                    <h2 className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A]">{title}</h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0A]/60 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body - scrolls independently */}
                <div className="p-6 overflow-y-auto flex-1">{children}</div>
            </div>
        </div>
    );
}