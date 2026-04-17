'use client'

import { Project } from "@/app/modules/projects/projects.model"
import Image from "next/image"
import Link from "next/link"

type Props = {
    project: Project
    onDelete?: (project: Project) => void
}

export function ProjectCard({ project, onDelete }: Props) {
    return (
        <div
            className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 
            bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md 
            flex flex-col justify-between gap-4 transition hover:shadow-md"
        >
            {/* TOP */}
            <div className="flex flex-col gap-3">

                {/* IMAGE */}
                {project.imgUrl && (
                    <div className="w-full h-36 overflow-hidden rounded-md">
                        <Image
                            src={project.imgUrl}
                            alt={project.title}
                            width={300}
                            height={200}
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

                {/* STACK */}
                <div className="flex flex-wrap gap-2">
                    {project.stack?.map((stack, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-md 
                            bg-neutral-100 dark:bg-neutral-800 
                            text-neutral-600 dark:text-neutral-300"
                        >
                            {stack}
                        </span>
                    ))}
                </div>

                {/* ROLE */}
                {project.role && (
                    <span className="text-xs text-neutral-500">
                        {project.role}
                    </span>
                )}
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-xs text-neutral-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/dashboard/project/${project.id}`}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Editar
                    </Link>

                    <button
                        onClick={() => onDelete?.(project)}
                        className="text-sm text-red-500 hover:underline cursor-pointer"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}