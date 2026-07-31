import prisma from "@/lib/db";
import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { createStaffUser, deleteStaffUser } from "./actions";

export default async function UsersPage() {
    const currentAdmin = await getCurrentAdmin();
    if (currentAdmin.role !== "SUPER_ADMIN") redirect("/admin");

    const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });

    return (
        <div className="px-8 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Staff & Admins</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                    {users.length} account{users.length !== 1 ? "s" : ""}
                </p>
            </div>

            <form action={createStaffUser} className="bg-white border border-black/5 rounded-xl p-6 mb-8 space-y-4">
                <h2 className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A]">Add New Account</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Name</label>
                        <input name="name" required className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                    </div>
                    <div>
                        <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Email</label>
                        <input name="email" type="email" required className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Password</label>
                        <input name="password" type="password" required minLength={6} className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]" />
                    </div>
                    <div>
                        <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Role</label>
                        <select name="role" required className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]">
                            <option value="ADMIN">Admin (full access)</option>
                            <option value="SUPER_ADMIN">Super Admin (full access + manage staff)</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition">
                    Create Account
                </button>
            </form>

            <div className="bg-white border border-black/5 rounded-xl divide-y divide-black/5">
                {users.map((u) => (
                    <div key={u.id} className="flex items-center justify-between px-5 py-4">
                        <div>
                            <p className="font-[var(--font-inter)] font-medium text-[#0A0A0A]">{u.name}</p>
                            <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/50">{u.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-[var(--font-inter)] text-xs font-semibold text-[#0A0A0A]/60 bg-black/5 px-2.5 py-1 rounded-full">
                                {u.role.replace("_", " ")}
                            </span>
                            {u.id !== currentAdmin.id && (
                                <form action={async () => { "use server"; await deleteStaffUser(u.id); }}>
                                    <button type="submit" className="font-[var(--font-inter)] text-sm font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-4 py-2 rounded-lg transition">
                                        Remove
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}