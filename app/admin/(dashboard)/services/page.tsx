import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { deleteService } from "./actions";
import { requireAccess } from "@/lib/auth";
import ServicesManager from "./ServicesManager";

export default async function ServicesPage() {
    await requireAccess("services");

    const services = await prisma.service.findMany({ orderBy: [{ order: "asc" }] });

    return <ServicesManager services={services} />;
    (
        <div className="px-8 py-8 max-w-5xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Services</h1>
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">{services.length} service{services.length !== 1 ? "s" : ""}</p>
                </div>
                <Link href="/admin/services/new" className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition">
                    + New Service
                </Link>
            </div>

            {services.length === 0 ? (
                <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                    <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No services yet.</p>
                </div>
            ) : (
                <div className="bg-white border border-black/5 rounded-xl divide-y divide-black/5">
                    {services.map((service) => (
                        <div key={service.id} className="flex items-center gap-4 px-5 py-4">
                            {service.icon ? (
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/10">
                                    <Image src={service.icon} alt={service.title} fill className="object-cover" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-[#0A0A0A]/5 shrink-0" />
                            )}
                            <div className="flex-1">
                                <p className="font-[var(--font-inter)] font-medium text-[#0A0A0A]">{service.title}</p>
                                <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/50 line-clamp-1">{service.description}</p>
                            </div>
                            <Link href={`/admin/services/${service.id}/edit`} className="font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 px-4 py-2 rounded-lg transition">
                                Edit
                            </Link>
                            <form action={async () => { "use server"; await deleteService(service.id); }}>
                                <button type="submit" className="font-[var(--font-inter)] text-sm font-medium text-[#FF1F3D] bg-[#FF1F3D]/10 hover:bg-[#FF1F3D]/20 px-4 py-2 rounded-lg transition">
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