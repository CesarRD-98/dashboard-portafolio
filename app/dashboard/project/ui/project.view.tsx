'use client'

import { Section } from "@/app/components/layout/Section"
import { StatusMessage } from "@/app/components/ui/StatusMessage"
import { Project } from "@/app/modules/projects/projects.model"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
    projects: Project[]
}

export function ProjectView({ projects }: Props) {
    const router = useRouter()
    return (
        <Section id="projects-home">
            {!projects.length ? (
                <StatusMessage
                    title="No hay proyectos disponibles" action={
                        <button className="bg-transparent border-0 px-4 py-2 m-2 text-blue-500 hover:text-blue-600 underline cursor-pointer"
                        onClick={() => router.refresh()}>Recargar</button>
                    } />
            ) : (
                <>
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
                            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-neutral-900 text-white hover:bg-neutral-800 transition"
                        >
                            Nuevo proyecto
                        </Link>
                    </div>

                    {/* GRID */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {projects.map(project => (
                            <div
                                key={project.id}
                                className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 
                                backdrop-blur-mdflex flex-col justify-between gap-4">

                                {/* TOP */}
                                <div className="flex flex-col gap-3">

                                    {/* IMAGE */}
                                    {project.imgUrl && (
                                        <div className="w-full h-36 overflow-hidden rounded-md">
                                            <Image
                                                src={project.imgUrl}
                                                alt={project.title}
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* TITLE */}
                                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white line-clamp-2">
                                        {project.title}
                                    </h2>

                                    {/* DESCRIPTION */}
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* META */}
                                    <div className="flex flex-wrap gap-2 text-xs text-neutral-500">

                                        {project.stack && (
                                            <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">
                                                {project.stack}
                                            </span>
                                        )}

                                        {project.role && (
                                            <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800">
                                                {project.role}
                                            </span>
                                        )}

                                    </div>

                                </div>

                                {/* FOOTER */}
                                <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">

                                    <span className="text-xs text-neutral-500">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </span>

                                    <div className="flex items-center gap-3">

                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="text-sm text-blue-600 hover:underline"
                                        >
                                            Editar
                                        </Link>

                                        <button
                                            className="text-sm text-red-500 hover:underline"
                                        >
                                            Eliminar
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                </>
            )}
        </Section>
    )
}