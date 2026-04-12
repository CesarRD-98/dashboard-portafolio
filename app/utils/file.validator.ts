import { AppError } from "@/app/lib/errors/AppError"

export const validateFile = (file: File, allowedMime: readonly string[]) => {
    if (!allowedMime.includes(file.type)) {
        throw new AppError("error", 'Formato de archivo no permitido')
    }
}