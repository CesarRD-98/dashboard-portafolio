'use client'

import { Section } from "@/app/components/layout/Section"
import { StatusMessage } from "@/app/components/ui/StatusMessage"
import { Project } from "@/app/modules/projects/projects.model"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProjectCard } from "./components/ProjectCard"
import { Plus } from "lucide-react"
import { useState } from "react"
import { deleteProjectAction } from "@/app/modules/projects/actions/projects.action"
import { useToast } from "@/app/components/toast/toast.provider"
import { ConfirmModal } from "@/app/components/shared/modals/ConfirModal"

type Props = {
    projects: Project[]
}

export function ProjectView({ projects }: Props) {
    const router = useRouter()
    const { showToast } = useToast()

    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [openModal, setOpenModal] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)

    const handleDelete = (project: Project) => {
        setSelectedProject(project)
        setOpenModal(true)
    }

    const handleConfirmDelete = async () => {
        if (!selectedProject) return

        try {
            setLoadingDelete(true)
            await deleteProjectAction(selectedProject.id)

            showToast({
                title: "Proyecto eliminado",
                message: "Se eliminó correctamente",
                type: "success"
            })

            setSelectedProject(null)

        } catch {
            showToast({
                title: "Error",
                message: "No se pudo eliminar",
                type: "error"
            })
        } finally {
            setLoadingDelete(false)
        }
    }

    return (
        <Section id="projects-home">
            {!projects.length ? (
                <StatusMessage
                    title="No hay proyectos disponibles"
                    action={
                        <button
                            className="bg-transparent border-0 px-4 py-2 m-2 text-blue-500 hover:text-blue-600 underline cursor-pointer"
                            onClick={() => router.refresh()}
                        >
                            Recargar
                        </button>
                    }
                />
            ) : (
                <>
                    {/* HEADER */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                                Proyectos
                            </h1>
                            <p className="text-base text-neutral-600 dark:text-neutral-400">
                                Gestiona tus proyectos publicados
                            </p>
                        </div>

                        <Link
                            href="/dashboard/project/new"
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-neutral-200/75 dark:hover:bg-neutral-800 
                            text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                        >
                            <Plus size={16} />
                            Nuevo proyecto
                        </Link>
                    </div>

                    {/* GRID */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map(project => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </>
            )}

            <ConfirmModal
                open={openModal}
                title="Eliminar proyecto"
                description={`¿Seguro que quieres eliminar "${selectedProject?.title}"? Esta acción no se puede deshacer.`}
                confirmText="Eliminar"
                variant="danger"
                loading={loadingDelete}
                onClose={() => setOpenModal(false)}
                onConfirm={handleConfirmDelete}
            />
        </Section>
    )
}