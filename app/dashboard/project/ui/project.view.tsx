'use client'

import { Section } from "@/app/components/layout/Section"
import { StatusMessage } from "@/app/components/ui/StatusMessage"
import { Project } from "@/app/modules/projects/projects.model"
import { useRouter } from "next/navigation"
import { ProjectCard } from "./components/ProjectCard"
import { Plus } from "lucide-react"
import { deleteProject } from "@/app/modules/projects/actions/projects.action"
import { useToast } from "@/app/components/toast/toast.provider"
import { useConfirm } from "@/app/components/shared/modals/confirm.provider"
import { ButtonLink } from "@/app/components/shared/ButtonLink"

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
                const response = await deleteProject(project.id)

                if (!response.success) {
                    showToast({
                        title: "Error",
                        message: response.error.message,
                        type: response.error.type,
                    })
                    return
                }

                showToast({
                    title: "Proyecto eliminado",
                    message: "Se eliminó correctamente",
                    type: "success"
                })
            }
        })
    }

    return (
        <Section id="projects" title="Mis Proyectos" description="Gestiona tus proyectos">

            <div className="flex justify-end">
                <ButtonLink href="/dashboard/project/new" icon={Plus} label="Nuevo proyecto" />
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
