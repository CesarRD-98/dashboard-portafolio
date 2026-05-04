'use client'

import { Section } from "@/app/components/layout/Section"
import { StatusMessage } from "@/app/components/ui/StatusMessage"
import { Project } from "@/app/modules/projects/projects.model"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProjectCard } from "./components/ProjectCard"
import { Plus } from "lucide-react"
import { deleteProject } from "@/app/modules/projects/actions/projects.action"
import { useToast } from "@/app/components/toast/toast.provider"
import { useConfirm } from "@/app/components/shared/modals/confirm.provider"

type Props = {
    projects: Project[]
}

export function ProjectView({ projects }: Props) {
    const router = useRouter()
    const { showToast } = useToast()
    const confirm = useConfirm()

    const handleDelete = (project: Project) => {
        confirm({
            title: "Eliminar proyecto",
            description: `¿Seguro que quieres eliminar "${project.title}"? Esta acción no se puede deshacer.`,
            confirmText: "Eliminar",
            variant: "danger",
            action: async () => {
                try {
                    await deleteProject(project.id)

                    showToast({
                        title: "Proyecto eliminado",
                        message: "Se eliminó correctamente",
                        type: "success"
                    })

                } catch {
                    showToast({
                        title: "Error",
                        message: "No se pudo eliminar",
                        type: "error"
                    })
                }
            }
        })
    }

    return (
        <Section id="projects" title="Mis Proyectos" description="Gestiona tus proyectos">

            <div className="flex justify-end">
                <Link
                    href="/dashboard/project/new"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-neutral-200/75 dark:hover:bg-neutral-800 
                            text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                >
                    <Plus size={16} />
                    Nuevo proyecto
                </Link>
            </div>

            {!projects.length ? (
                <StatusMessage
                    title="No hay proyectos disponibles"
                    action={
                        <button
                            className="bg-transparent text-sm border-0 px-4 py-2 m-2 text-blue-500 hover:underline cursor-pointer"
                            onClick={() => router.refresh()}
                        >
                            Recargar
                        </button>
                    }
                />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </Section>
    )
}