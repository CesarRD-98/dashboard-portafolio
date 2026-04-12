import { mimeToExt } from "@/app/types/file.type"

export const generateFileName = (userId: string, file: File, prefix: string) => {
    const ext = mimeToExt[file.type]

    if (!ext) {
        throw new Error('Tipo de archivo no soportado')
    }

    return `${userId}/${prefix}-${crypto.randomUUID()}-${file.name}.${ext}`
}