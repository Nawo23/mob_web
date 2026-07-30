"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        window.location.href = "/admin";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5] px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <p className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A] tracking-tight">
                        META<span className="text-[#FF1F3D]">CRAZE</span>
                    </p>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 mt-1 text-sm">
                        Admin Portal
                    </p>
                </div>

                <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                    <h2 className="font-[var(--font-outfit)] text-xl font-semibold text-[#0A0A0A] mb-6">
                        Sign in to your account
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block font-[var(--font-inter)] text-sm text-[#0A0A0A]/70 mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@metacraze.agency"
                                className="w-full px-4 py-3 rounded-lg bg-[#F7F7F5] border border-black/10 text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] transition font-[var(--font-inter)]"
                            />
                        </div>

                        <div>
                            <label className="block font-[var(--font-inter)] text-sm text-[#0A0A0A]/70 mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg bg-[#F7F7F5] border border-black/10 text-[#0A0A0A] placeholder:text-[#0A0A0A]/30 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] transition font-[var(--font-inter)]"
                            />
                        </div>

                        {error && (
                            <p className="font-[var(--font-inter)] text-sm text-[#FF1F3D] bg-[#FF1F3D]/10 border border-[#FF1F3D]/20 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold hover:bg-[#FF1F3D]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center font-[var(--font-inter)] text-[#0A0A0A]/30 text-xs mt-6">
                    MetaCraze internal use only
                </p>
            </div>
        </div>
    );
}