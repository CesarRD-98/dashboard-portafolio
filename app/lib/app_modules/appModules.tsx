import { User, Folder, Mail, Wrench, LucideIcon } from "lucide-react";

export type AppModule = {
    id: string;
    label: string;
    icon: LucideIcon;
    basePath: string;
};

export const AppModules: AppModule[] = [
    {
        id: "profile",
        label: "Perfil",
        icon: User,
        basePath: "/dashboard/profile"
    },
    {
        id: "projects",
        label: "Proyectos",
        icon: Folder,
        basePath: "/dashboard/project",
    },
    {
        id: "contacts",
        label: "Contactos",
        icon: Mail,
        basePath: "/dashboard/contact",
    },
    {
        id: "skills",
        label: "Habilidades",
        icon: Wrench,
        basePath: "/dashboard/skill"
    },
];