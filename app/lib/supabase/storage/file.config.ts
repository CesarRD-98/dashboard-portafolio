export const FILE_CONFIG = {
    image: {
        bucket: 'Avatars',
        mime: ['image/jpeg', 'image/png', 'image/gif'],
    },
    document: {
        bucket: 'Cvs',
        mime: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
    }
} as const;

export type FileType = keyof typeof FILE_CONFIG;

// inferido automáticamente
export type FileConfig = typeof FILE_CONFIG[FileType];

// mapping mime → extensión
export const MIME_TO_EXT: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
};