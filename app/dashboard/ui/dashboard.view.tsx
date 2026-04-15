"use client";

import Link from "next/link";
import { User, FolderKanban, Mail, Wrench } from "lucide-react";
import { Section } from "@/app/components/layout/Section";


const actions = [
    {
        title: "Perfil",
        description: "Ver y actualizar tu información personal",
        href: "/dashboard/profile",
        icon: User,
    },
    {
        title: "Proyectos",
        description: "Gestiona tus proyectos",
        href: "/dashboard/project",
        icon: FolderKanban,
    },
    {
        title: "Contactos",
        description: "Administra tus medios de contacto",
        href: "/dashboard/contact",
        icon: Mail,
    },
    {
        title: "Habilidades",
        description: "Edita tus skills y tecnologías",
        href: "/dashboard/skill",
        icon: Wrench,
    },
];

export default function DashboardView() {
    return (
        <Section id="dashboard-home">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.href}
                            href={action.href}
                            className="group flex flex-col gap-4 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md"
                        >
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:text-blue-600">
                                <Icon size={20} />
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
                                    {action.title}
                                </h3>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                    {action.description}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </Section>
    );
}