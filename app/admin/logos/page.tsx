import prisma from "@/lib/db";
import Image from "next/image";
import { createLogo, deleteLogo } from "./actions";
import { requireAccess } from "@/lib/auth";
import LogosManager from "./LogosManager";


export default async function LogosPage() {
    await requireAccess("logos");
    const logos = await prisma.clientLogo.findMany({ orderBy: { order: "asc" } });

    return <LogosManager logos={logos} />;
    (
        <div className="px-8 py-8 max-w-4xl">
            <div className="mb-8">
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Client Logos</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">{logos.length} logo{logos.length !== 1 ? "s" : ""}</p>
            </div>

            {/* Add new logo form */}
            <form
                action={createLogo}
                className="bg-white border border-black/5 rounded-xl p-5 mb-8 flex items-end gap-4"
            >
                <div className="flex-1">
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Client Name</label>
                    <input
                        name="name"
                        required
                        placeholder="e.g. Orbit Coffee Co."
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>
                <div className="flex-1">
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">Logo Image</label>
                    <input type="file" name="logo" accept="image/*" required className="w-full font-[var(--font-inter)] text-sm" />
                </div>
                <button
                    type="submit"
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                >
                    Add Logo
                </button>
            </form>

            {/* Logo grid */}
            {logos.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No logos yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {logos.map((logo) => (
                        <div key={logo.id} className="bg-white border border-black/5 rounded-xl p-4 text-center relative group">
                            <div className="relative w-full h-16">
                                <Image src={logo.logoUrl} alt={logo.name} fill className="object-contain" />
                            </div>
                            <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/50 mt-2 truncate">{logo.name}</p>

                            <form action={async () => { "use server"; await deleteLogo(logo.id); }} className="mt-2">
                                <button
                                    type="submit"
                                    className="font-[var(--font-inter)] text-xs font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-3 py-1.5 rounded-lg transition w-full"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}