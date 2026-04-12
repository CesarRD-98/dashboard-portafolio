import { FILE_TYPES } from "@/app/types/file.type";
import { validateFile } from "@/app/utils/file.validator";
import { SupabaseClient } from '@supabase/supabase-js'
import { generateFileName } from "./generateFileName";
import { AppError } from "../../errors/AppError";

type UploadType = "image" | "file";

const BUCKETS: Record<string, string> = {
    avatar: "Avatars",
    cv: "Cvs",
};

export async function uploadFile(supabase: SupabaseClient, file: File, userId: string, type: UploadType): Promise<string> {
    const config = FILE_TYPES[type];
    validateFile(file, config.mime);
    const filename = generateFileName(userId, file, type);

    const { error } = await supabase.storage.from(BUCKETS[type]).upload(filename, file, {
        upsert: true
    });

    if (error) {
        throw new AppError('error', `Error al subir ${type}`);
    }

    const { data } = supabase.storage.from(BUCKETS[type]).getPublicUrl(filename);
    return data.publicUrl;
}