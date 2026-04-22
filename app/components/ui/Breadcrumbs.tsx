'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const routeMap: Record<string, string> = {
    dashboard: "Dashboard",
    profile: "Perfil",
    edit: "Editar",
    project: "Proyectos",
    new: "Nuevo",
    contact: "Contactos",
    skill: "Habilidades",
}

const isUUID = (str: string) => /^[0-9a-fA-F-]{36}$/.test(str)

const isDynamicSegment = (str: string) => {
    return isUUID(str) || /^[0-9a-fA-F]{24}$/.test(str) // Mongo-like
}

function resolveLabel(
    segment: string,
    index: number,
    segments: string[]
) {

    if (routeMap[segment]) return routeMap[segment]

    if (isDynamicSegment(segment)) {
        const prev = segments[index - 1]

        switch (prev) {
            case "project":
                return "Detalle del proyecto"
            case "contact":
                return "Detalle del contacto"
            case "skill":
                return "Detalle de habilidad"
            default:
                return "Detalle"
        }
    }

    // 3. Fallback → capitalizar bonito
    return segment.charAt(0).toUpperCase() + segment.slice(1)
}

export function Breadcrumbs() {
    const pathname = usePathname() ?? ""

    const segments = pathname.split("/").filter(Boolean)

    const paths = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")

        const label = resolveLabel(segment, index, segments)

        return { href, label }
    })

    return (
        <nav className="flex items-center gap-2 text-sm">
            {paths.map((item, index) => {
                const isLast = index === paths.length - 1

                return (
                    <div key={item.href} className="flex items-center gap-2">
                        {!isLast ? (
                            <Link
                                href={item.href}
                                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-neutral-900 dark:text-white font-medium">
                                {item.label}
                            </span>
                        )}

                        {!isLast && (
                            <span className="text-neutral-400">/</span>
                        )}
                    </div>
                )
            })}
        </nav>
    )
}