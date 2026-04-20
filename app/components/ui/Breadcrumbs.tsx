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

export function Breadcrumbs() {
    const pathname = usePathname() ?? ""

    const segments = pathname.split("/").filter(Boolean)

    const paths = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = routeMap[segment] ?? segment

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