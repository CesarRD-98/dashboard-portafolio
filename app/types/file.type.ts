export const FILE_TYPES = {
    image: {
        mime: ['image/jpeg', 'image/png', 'image/gif'],
        extensions: ['jpg', 'jpeg', 'png', 'gif']
    },
    file: {
        mime: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
        extensions: ['pdf', 'doc', 'docx']
    }
} as const

export const mimeToExt: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
}