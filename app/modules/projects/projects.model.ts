import { SelectOption } from "@/app/components/shared/forms/Select"
import { FieldConfig } from "@/app/lib/forms/forms.mapper"

export interface Project {
    id: string
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
    title?: string
    description?: string
    img?: File
    stack?: string
    role?: string
    link?: string
}

export const projectDtoConfig: FieldConfig<ProjectDto, keyof ProjectDto>[] = [
    { key: 'title', type: 'string' },
    { key: 'description', type: 'string' },
    { key: 'img', type: 'file' },
    { key: 'stack', type: 'string' },
    { key: 'role', type: 'string' },
    { key: 'link', type: 'string' },
];

export const roleOptions: SelectOption[] = [
    { text: "--- Selecciona un rol ---", value: "" },
    { text: "Frontend", value: "Desarrollador Frontend" },
    { text: "Backend", value: "Desarrollador Backend" },
    { text: "Fullstack", value: "Desarrollador Fullstack" },
];

export const requiredFieldsProject: (keyof ProjectDto)[] = ['title', 'description', 'img', 'stack', 'role'];