import prisma from "@/lib/db";
import { requireAccess } from "@/lib/auth";
import { updateContactInfo } from "./actions";

export default async function ContactInfoPage() {
    await requireAccess("contact");

    const info = await prisma.contactInfo.findUnique({ where: { id: "main" } });

    return (
        <div className="px-8 py-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Contact Info</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                    Office address, email, phone and working hours shown on the Contact page.
                </p>
            </div>

            <form action={updateContactInfo} className="bg-white border border-black/5 rounded-2xl p-6 space-y-5">
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Office Address
                    </label>
                    <textarea
                        name="address"
                        defaultValue={info?.address ?? ""}
                        rows={2}
                        placeholder="e.g. 42 Marine Drive, Colombo 03, Sri Lanka"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            defaultValue={info?.email ?? ""}
                            placeholder="hello@metacraze.agency"
                            className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                        />
                    </div>
                    <div>
                        <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                            Phone
                        </label>
                        <input
                            name="phone"
                            defaultValue={info?.phone ?? ""}
                            placeholder="+94 11 234 5678"
                            className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        WhatsApp Number
                    </label>
                    <input
                        name="whatsappNumber"
                        defaultValue={info?.whatsappNumber ?? ""}
                        placeholder="94712492183 (country code, no + or spaces)"
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                    <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/40 mt-1">
                        Used for the floating WhatsApp button and contact form. Format: country code + number, no + or spaces (e.g. Sri Lanka 0771234567 → 94771234567).
                    </p>
                </div>

                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Working Hours
                    </label>
                    <textarea
                        name="workingHours"
                        defaultValue={info?.workingHours ?? ""}
                        rows={2}
                        placeholder={"Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 2:00 PM"}
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>

                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Google Maps Embed URL (optional)
                    </label>
                    <input
                        name="mapEmbedUrl"
                        defaultValue={info?.mapEmbedUrl ?? ""}
                        placeholder="https://www.google.com/maps/embed?..."
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}