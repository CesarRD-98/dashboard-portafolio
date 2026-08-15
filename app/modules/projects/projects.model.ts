import { SelectOption } from "@/app/components/shared/forms/Select";
import { FieldConfig } from "@/app/lib/forms/form.type";

export interface Project {
    id: string
    userId: string
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

export const initialProjectForm: ProjectDto = { title: "", description: "", stack: "", role: "", link: "", };

export const projectDtoConfig: FieldConfig<ProjectDto, keyof ProjectDto>[] = [
    { key: 'title', type: 'string' },
    { key: 'description', type: 'string' },
    { key: 'img', type: 'file' },
    { key: 'stack', type: 'string' },
    { key: 'role', type: 'string' },
    { key: 'link', type: 'string' },
];

export const roleOptions: SelectOption[] = [
    { text: "--- Selecciona rol ---", value: "" },
    { text: "Frontend", value: "Desarrollador Frontend" },
    { text: "Backend", value: "Desarrollador Backend" },
    { text: "Fullstack", value: "Desarrollador Fullstack" },
];

export const requiredFieldsProject: (keyof ProjectDto)[] = ['title', 'description', 'stack', 'role'];
