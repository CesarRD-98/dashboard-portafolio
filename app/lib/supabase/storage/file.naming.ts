import { MIME_TO_EXT } from "./file.config";
import { AppError } from "@/app/lib/errors/AppError";

export function generateFileName(
    userId: string,
    file: File,
    prefix: string
): string {

    const ext = MIME_TO_EXT[file.type];

    if (!ext) {
        throw new AppError('error', 'Tipo de archivo no soportado');
    }

    // nombre original
    const safeName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/\s+/g, '-')
        .toLowerCase();

    return `${userId}/${prefix}-${crypto.randomUUID()}-${safeName}.${ext}`;
}