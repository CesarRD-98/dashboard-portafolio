import { SupabaseClient } from '@supabase/supabase-js';
import { FILE_CONFIG, FileType } from './file.config';
import { validateFile } from './file.validator';
import { generateFileName } from './file.naming';
import { AppError } from '../../errors/AppError';

export async function uploadFileStorage(
    supabase: SupabaseClient, file: File, type: FileType, identifier?: string
): Promise<string> {

    const config = FILE_CONFIG[type];

    validateFile(file, config.mime);

    const basePath = config.getPath(identifier ?? '');

    const filename = generateFileName(basePath, file);

    const { error } = await supabase.storage.from(config.bucket).upload(filename, file, { upsert: true });

    if (error) {
        throw new AppError('error', 'Se produjo un error al subir archivo');
    }

    const { data } = supabase.storage.from(config.bucket).getPublicUrl(filename);

    return data.publicUrl;
}