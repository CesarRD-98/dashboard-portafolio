import { User, Folder, Mail, Wrench, LucideIcon } from "lucide-react";

export type SubModule = {
    label: string;
    href: string;
};

export type AppModule = {
    id: string;
    label: string;
    icon: LucideIcon;
    items: SubModule[];
};

export const AppModules: AppModule[] = [
    {
        id: "profile",
        label: "Perfil",
        icon: User,
        items: [
            { label: "Ver perfil", href: "/dashboard/profile" },
            { label: "Editar perfil", href: "/dashboard/profile/edit" },
        ],
    },
    {
        id: "projects",
        label: "Proyectos",
        icon: Folder,
        items: [
            { label: "Ver proyectos", href: "/dashboard/project" },
            { label: "Nuevo", href: "/dashboard/project/new" },
        ],
    },
    {
        id: "contacts",
        label: "Contactos",
        icon: Mail,
        items: [
            { label: "Ver contactos", href: "/dashboard/contact" },
            { label: "Nuevo", href: "/dashboard/contact/new" },
        ],
    },
    {
        id: "skills",
        label: "Habilidades",
        icon: Wrench,
        items: [
            { label: "Ver habilidades", href: "/dashboard/skill" },
            { label: "Nuevo", href: "/dashboard/skill/new" },
        ],
    },
];