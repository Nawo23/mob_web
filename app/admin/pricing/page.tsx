import prisma from "@/lib/db";
import Link from "next/link";
import { deletePricingPackage } from "./actions";
import { requireAccess } from "@/lib/auth";
import PricingManager from "./PricingManager";

export default async function PricingPage() {
    await requireAccess("pricing");
    const packages = await prisma.pricingPackage.findMany({ orderBy: [{ order: "asc" }] });

    return <PricingManager packages={packages} />;
    (
        <div className="px-8 py-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Pricing Packages</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">{packages.length} package{packages.length !== 1 ? "s" : ""}</p>
                </div>
                <Link href="/admin/pricing/new" className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition">
                    + New Package
                </Link>
            </div>

            {packages.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No pricing packages yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="bg-white border border-black/5 rounded-xl p-5 relative">
                            {pkg.isPopular && (
                                <span className="absolute top-3 right-3 bg-[#FF1F3D] text-white text-xs font-[var(--font-inter)] font-semibold px-2 py-1 rounded-full">
                                    Popular
                                </span>
                            )}
                            <p className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A]">{pkg.name}</p>
                            <p className="font-[var(--font-inter)] text-xl font-bold text-[#FF1F3D] mt-1">{pkg.price}</p>
                            <ul className="mt-3 space-y-1">
                                {pkg.features.slice(0, 3).map((f, i) => (
                                    <li key={i} className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/60">• {f}</li>
                                ))}
                                {pkg.features.length > 3 && (
                                    <li className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/40">+{pkg.features.length - 3} more</li>
                                )}
                            </ul>

                            <div className="flex items-center gap-2 mt-4">
                                <Link href={`/admin/pricing/${pkg.id}/edit`} className="flex-1 text-center font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2 rounded-lg transition">
                                    Edit
                                </Link>
                                <form action={async () => { "use server"; await deletePricingPackage(pkg.id); }}>
                                    <button type="submit" className="font-[var(--font-inter)] text-sm font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-4 py-2 rounded-lg transition">
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}