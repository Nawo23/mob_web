"use client";

import { useState, useRef } from "react";
import { uploadHeroImage, uploadHeroVideo, deleteHeroImage, deleteHeroVideo } from "./actions";

export default function HeroForm({
    heroImageUrl,
    heroVideoUrl,
}: {
    heroImageUrl: string | null;
    heroVideoUrl: string | null;
}) {
    const [imageUploading, setImageUploading] = useState(false);
    const [videoUploading, setVideoUploading] = useState(false);
    const [imageDeleting, setImageDeleting] = useState(false);
    const [videoDeleting, setVideoDeleting] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageUploading(true);
        try {
            const formData = new FormData();
            formData.append("image", file);
            await uploadHeroImage(formData);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setImageUploading(false);
            if (imageInputRef.current) imageInputRef.current.value = "";
        }
    }

    async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setVideoUploading(true);
        try {
            const formData = new FormData();
            formData.append("video", file);
            await uploadHeroVideo(formData);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setVideoUploading(false);
            if (videoInputRef.current) videoInputRef.current.value = "";
        }
    }

    async function handleDeleteImage() {
        if (!confirm("Delete the hero image?")) return;
        setImageDeleting(true);
        try {
            await deleteHeroImage();
        } finally {
            setImageDeleting(false);
        }
    }

    async function handleDeleteVideo() {
        if (!confirm("Delete the hero video?")) return;
        setVideoDeleting(true);
        try {
            await deleteHeroVideo();
        } finally {
            setVideoDeleting(false);
        }
    }

    return (
        <div className="space-y-8 max-w-2xl">
            {/* IMAGE */}
            <div className="bg-white border border-black/5 rounded-2xl p-6">
                <h3 className="font-semibold text-[#0A0A0A] mb-4">Hero Background Image</h3>

                {heroImageUrl ? (
                    <div className="relative mb-4 rounded-xl overflow-hidden border border-black/10">
                        <img src={heroImageUrl} alt="Hero" className="w-full h-56 object-cover" />
                        <button
                            onClick={handleDeleteImage}
                            disabled={imageDeleting}
                            className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-red-700 disabled:opacity-50"
                        >
                            {imageDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                ) : (
                    <div className="mb-4 h-56 rounded-xl border border-dashed border-black/15 flex items-center justify-center text-[#0A0A0A]/40 text-sm">
                        No image uploaded
                    </div>
                )}

                <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={imageUploading}
                    className="block w-full text-sm text-[#0A0A0A]/70 border border-black/10 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#F7F7F5] file:text-[#0A0A0A] file:font-medium"
                />
                {imageUploading && <p className="text-sm text-[#0A0A0A]/50 mt-2">Uploading...</p>}
            </div>

            {/* VIDEO */}
            <div className="bg-white border border-black/5 rounded-2xl p-6">
                <h3 className="font-semibold text-[#0A0A0A] mb-4">Hero Background Video</h3>

                {heroVideoUrl ? (
                    <div className="relative mb-4 rounded-xl overflow-hidden border border-black/10">
                        <video src={heroVideoUrl} className="w-full h-56 object-cover" muted loop autoPlay playsInline />
                        <button
                            onClick={handleDeleteVideo}
                            disabled={videoDeleting}
                            className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-red-700 disabled:opacity-50"
                        >
                            {videoDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                ) : (
                    <div className="mb-4 h-56 rounded-xl border border-dashed border-black/15 flex items-center justify-center text-[#0A0A0A]/40 text-sm">
                        No video uploaded
                    </div>
                )}

                <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    disabled={videoUploading}
                    className="block w-full text-sm text-[#0A0A0A]/70 border border-black/10 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#F7F7F5] file:text-[#0A0A0A] file:font-medium"
                />
                {videoUploading && <p className="text-sm text-[#0A0A0A]/50 mt-2">Uploading...</p>}
            </div>
        </div>
    );
}