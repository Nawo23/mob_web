import { supabaseAdmin } from "./supabase";

export async function uploadFile(file: File, folder: string) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error } = await supabaseAdmin.storage
        .from("media")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });

    if (error) throw new Error(error.message);

    const { data } = supabaseAdmin.storage.from("media").getPublicUrl(fileName);
    return data.publicUrl;
}

export async function deleteFile(url: string) {
    // URL eken path eka extract karanawa
    const path = url.split("/media/")[1];
    const { error } = await supabaseAdmin.storage.from("media").remove([path]);
    if (error) throw new Error(error.message);
}