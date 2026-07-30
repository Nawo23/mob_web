"use client";

import { useState } from "react";
import Image from "next/image";
import Toast from "@/components/admin/Toast";
import DeleteButton from "@/components/admin/DeleteButton";
import { canEdit } from "@/lib/permissions";
import {
    updateFooterSettings,
    removeBackgroundImage,
    removeLogo,
    createSocialLink,
    deleteSocialLink,
} from "./actions";

type FooterSettingsData = {
    description: string | null;
    logoUrl: string | null;
    backgroundImage: string | null;
    copyrightText: string | null;
} | null;

type SocialLinkItem = { id: string; platform: string; url: string };

export default function FooterManager({
    settings,
    socialLinks,
    role,
}: {
    settings: FooterSettingsData;
    socialLinks: SocialLinkItem[];
    role: string;
}) {
    const isEditor = canEdit(role);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [submitting, setSubmitting] = useState(false);

    return (
        <div className="px-8 py-8 max-w-3xl">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="mb-8">
                <h1 className="font-[var(--font-outfit)] text-3xl font-bold text-[#0A0A0A]">Footer</h1>
                <p className="font-[var(--font-inter)] text-[#0A0A0A]/50 mt-1">
                    Description, logo, background texture, copyright and social links.
                    {!isEditor && " — view only"}
                </p>
            </div>

            {/* General settings */}
            <form
                action={async (formData) => {
                    if (!isEditor) return;
                    setSubmitting(true);
                    try {
                        await updateFooterSettings(formData);
                        setToast({ message: "Footer settings updated successfully.", type: "success" });
                    } catch {
                        setToast({ message: "Something went wrong.", type: "error" });
                    }
                    setSubmitting(false);
                }}
                className="bg-white border border-black/5 rounded-2xl p-6 space-y-5 mb-8"
            >
                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Description
                    </label>
                    <textarea
                        name="description"
                        defaultValue={settings?.description ?? ""}
                        disabled={!isEditor}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)] disabled:bg-black/5"
                    />
                </div>

                <div>
                    <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                        Copyright Text
                    </label>
                    <input
                        name="copyrightText"
                        defaultValue={settings?.copyrightText ?? ""}
                        disabled={!isEditor}
                        placeholder="e.g. © 2026 MetaCraze. All rights reserved."
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)] disabled:bg-black/5"
                    />
                </div>

                {isEditor && (
                    <>
                        <div>
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Logo Image {settings?.logoUrl ? "(leave empty to keep current)" : ""}
                            </label>
                            {settings?.logoUrl && (
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="relative w-32 h-16 bg-[#0A0A0A] rounded-lg overflow-hidden">
                                        <Image src={settings.logoUrl} alt="Footer logo" fill className="object-contain p-2" />
                                    </div>
                                    <DeleteButton
                                        action={async () => {
                                            await removeLogo();
                                            setToast({ message: "Logo removed.", type: "success" });
                                        }}
                                        itemName="footer logo"
                                    />
                                </div>
                            )}
                            <input type="file" name="logo" accept="image/*" className="w-full font-[var(--font-inter)] text-sm" />
                        </div>

                        <div>
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Background Texture Image (optional) {settings?.backgroundImage ? "— leave empty to keep current" : ""}
                            </label>
                            {settings?.backgroundImage && (
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="relative w-32 h-16 bg-[#0A0A0A] rounded-lg overflow-hidden">
                                        <Image src={settings.backgroundImage} alt="Footer background" fill className="object-cover" />
                                    </div>
                                    <DeleteButton
                                        action={async () => {
                                            await removeBackgroundImage();
                                            setToast({ message: "Background image removed.", type: "success" });
                                        }}
                                        itemName="footer background image"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                name="backgroundImage"
                                accept="image/*"
                                className="w-full font-[var(--font-inter)] text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-[#FF1F3D] text-white font-[var(--font-inter)] font-semibold px-6 py-3 rounded-lg hover:bg-[#FF1F3D]/90 transition disabled:opacity-50"
                        >
                            {submitting ? "Saving..." : "Save Changes"}
                        </button>
                    </>
                )}
            </form>

            {/* Social links */}
            <div>
                <h2 className="font-[var(--font-outfit)] text-lg font-semibold text-[#0A0A0A] mb-4">Social Links</h2>

                {isEditor && (
                    <form
                        action={async (formData) => {
                            try {
                                await createSocialLink(formData);
                                setToast({ message: "Social link added.", type: "success" });
                                const form = document.getElementById("social-form") as HTMLFormElement;
                                form?.reset();
                            } catch {
                                setToast({ message: "Something went wrong.", type: "error" });
                            }
                        }}
                        id="social-form"
                        className="bg-white border border-black/5 rounded-xl p-5 mb-6 flex items-end gap-4"
                    >
                        <div className="flex-1">
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                Platform
                            </label>
                            <input
                                name="platform"
                                required
                                placeholder="e.g. Instagram"
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A] mb-1.5">
                                URL
                            </label>
                            <input
                                name="url"
                                required
                                placeholder="https://instagram.com/..."
                                className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#FF1F3D] font-[var(--font-inter)]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#FF1F3D] text-white font-[var(--font-inter)] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#FF1F3D]/90 transition"
                        >
                            Add
                        </button>
                    </form>
                )}

                {socialLinks.length === 0 ? (
                    <div className="bg-white border border-black/5 rounded-xl p-8 text-center">
                        <p className="font-[var(--font-inter)] text-[#0A0A0A]/40 text-sm">No social links yet.</p>
                    </div>
                ) : (
                    <div className="bg-white border border-black/5 rounded-xl divide-y divide-black/5">
                        {socialLinks.map((link) => (
                            <div key={link.id} className="flex items-center justify-between px-5 py-3.5">
                                <div>
                                    <p className="font-[var(--font-inter)] text-sm font-medium text-[#0A0A0A]">{link.platform}</p>
                                    <p className="font-[var(--font-inter)] text-xs text-[#0A0A0A]/45 truncate max-w-md">{link.url}</p>
                                </div>
                                {isEditor && (
                                    <DeleteButton
                                        action={async () => {
                                            await deleteSocialLink(link.id);
                                            setToast({ message: `"${link.platform}" link removed.`, type: "success" });
                                        }}
                                        itemName={link.platform}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}