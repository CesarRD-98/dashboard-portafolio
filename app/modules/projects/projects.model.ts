import { FieldConfig } from "@/app/lib/forms/forms.mapper"

export interface Project {
    id: number
    userId: number
    title: string
    description: string
    imgUrl: string
    stack: string[]
    role: string
    link: string
    createdAt: string
}

export interface ProjectDto {
    userId?: string
    title: string
    description: string
    img: File
    stack: string
    role: string
    link: string
}

export const projectDtoConfig: FieldConfig<ProjectDto, keyof ProjectDto>[] = [
    { key: 'title', type: 'string' },
    { key: 'description', type: 'string' },
    { key: 'img', type: 'file' },
    { key: 'stack', type: 'string' },
    { key: 'role', type: 'string' },
    { key: 'link', type: 'string' },
];