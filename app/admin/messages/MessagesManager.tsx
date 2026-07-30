"use client";

import { useState } from "react";
import { markAsRead, markAsReplied, deleteMessage } from "./actions";

type Message = {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: string;
    createdAt: Date;
};

export default function MessagesManager({ messages }: { messages: Message[] }) {
    const [busyId, setBusyId] = useState<string | null>(null);

    async function handleMarkRead(id: string) {
        setBusyId(id);
        await markAsRead(id);
        setBusyId(null);
    }

    async function handleMarkReplied(id: string) {
        setBusyId(id);
        await markAsReplied(id);
        setBusyId(null);
    }

    async function handleDelete(id: string) {
        if (!confirm("Delete this message?")) return;
        setBusyId(id);
        await deleteMessage(id);
        setBusyId(null);
    }

    return (
        <div className="px-8 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Messages</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                    {messages.length} message{messages.length !== 1 ? "s" : ""}
                </p>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No messages yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {messages.map((msg) => (
                        <div key={msg.id} className="bg-white border border-black/5 rounded-xl p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-[var(--font-inter)] font-semibold text-[#0A0A0A]">{msg.name}</p>
                                        <span
                                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${msg.status === "new"
                                                ? "bg-[#FF1F3D]/10 text-[#FF1F3D]"
                                                : msg.status === "read"
                                                    ? "bg-amber-100 text-amber-700"
                                                    : "bg-emerald-100 text-emerald-700"
                                                }`}
                                        >
                                            {msg.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/50 mt-0.5">
                                        {msg.email} {msg.phone ? `· ${msg.phone}` : ""}
                                    </p>
                                    <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/80 mt-3 whitespace-pre-line">
                                        {msg.message}
                                    </p>
                                    <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/30 mt-3">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 shrink-0">
                                    {msg.status !== "read" && msg.status !== "replied" && (
                                        <button
                                            onClick={() => handleMarkRead(msg.id)}
                                            disabled={busyId === msg.id}
                                            className="text-xs font-medium text-[#0A0A0A]/70 bg-[#F7F7F5] hover:bg-[#F0F0EE] px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                                        >
                                            Mark Read
                                        </button>
                                    )}
                                    {msg.status !== "replied" && (
                                        <button
                                            onClick={() => handleMarkReplied(msg.id)}
                                            disabled={busyId === msg.id}
                                            className="text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                                        >
                                            Mark Replied
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(msg.id)}
                                        disabled={busyId === msg.id}
                                        className="text-xs font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}