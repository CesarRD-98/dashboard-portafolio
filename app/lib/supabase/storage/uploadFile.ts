import { SupabaseClient } from "@supabase/supabase-js";
import { FILE_CONFIG, FileType } from "./file.config";
import { validateFile } from "./file.validator";
import { generateFileName } from "./file.naming";
import { AppError } from "@/app/lib/errors/AppError";

export async function uploadFile(
    supabase: SupabaseClient,
    file: File,
    userId: string,
    type: FileType
): Promise<string> {

    const config = FILE_CONFIG[type];
    validateFile(file, config.mime);
    const filename = generateFileName(userId, file, type);

    const { error } = await supabase.storage.from(config.bucket).upload(filename, file, {
        upsert: true,
    });

    if (error) {
        throw new AppError('error', `Error al subir archivo (${type})`);
    }

    const { data } = supabase.storage.from(config.bucket).getPublicUrl(filename);

    return data.publicUrl;
}