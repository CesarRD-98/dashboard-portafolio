export const FILE_CONFIG = {
    avatar: {
        bucket: 'users',
        getPath: (userId: string) => `${userId}/avatars`,
        mime: ['image/jpeg', 'image/png'],
    },

    banner: {
        bucket: 'assets',
        getPath: (userId: string) => `${userId}/banners`,
        mime: ['image/jpeg', 'image/png'],
    },

    projectImage: {
        bucket: 'projects',
        getPath: (projectId: string) => `${projectId}/gallery`,
        mime: ['image/jpeg', 'image/png'],
    },

    logo: {
        bucket: 'assets',
        getPath: () => `logos`,
        mime: ['image/png', 'image/svg+xml'],
    },

    cv: {
        bucket: 'users',
        getPath: (userId: string) => `${userId}/cv`,
        mime: ['application/pdf'],
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
    'image/svg+xml': 'svg',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
};