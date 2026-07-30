import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { deleteTestimonial } from "./actions";
import { requireAccess } from "@/lib/auth";
import TestimonialsManager from "./TestimonialsManager";

export default async function TestimonialsPage() {
    await requireAccess("testimonials");
    const testimonials = await prisma.testimonial.findMany({ orderBy: [{ order: "asc" }] });

    return <TestimonialsManager testimonials={testimonials} />;
    (<div className="px-8 py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Testimonials</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">{testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}</p>
            </div>
            <Link href="/admin/testimonials/new" className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition">
                + Add Testimonial
            </Link>
        </div>

        {testimonials.length === 0 ? (
            <div className="bg-white border border-black/5 rounded-xl p-12 text-center">
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No testimonials yet.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {testimonials.map((t) => (
                    <div key={t.id} className="bg-white border border-black/5 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-black/5 shrink-0 border border-black/10">
                                {t.photo && <Image src={t.photo} alt={t.clientName} fill className="object-cover" />}
                            </div>
                            <div>
                                <p className="font-[var(--font-inter)] font-medium text-sm text-[#0A0A0A]">{t.clientName}</p>
                                <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/50">
                                    {[t.clientRole, t.company].filter(Boolean).join(", ")}
                                </p>
                            </div>
                        </div>
                        <p className="font-[var(--font-inter)] text-sm text-[#0A0A0A]/70 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>

                        <div className="flex items-center gap-2 mt-4">
                            <Link href={`/admin/testimonials/${t.id}/edit`} className="flex-1 text-center font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] bg-black/5 hover:bg-black/10 py-2 rounded-lg transition">
                                Edit
                            </Link>
                            <form action={async () => { "use server"; await deleteTestimonial(t.id); }}>
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