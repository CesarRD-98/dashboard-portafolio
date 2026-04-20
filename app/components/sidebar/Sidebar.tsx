'use client'

import { AppModules } from "@/app/lib/app_modules/appModules"
import { usePathname, useRouter } from "next/navigation"
import { useSidebar } from "./sidebar.provider"
import { HomeIcon, PanelLeft } from "lucide-react"
import clsx from "clsx"
import { SidebarItem } from "./SidebarItem"

export function Sidebar() {
    const pathname = usePathname() ?? ""
    const router = useRouter()

    const { isOpen, isCollapsed, isDesktop, toggleCollapse, close } = useSidebar()

    const navigate = (href: string) => {
        router.push(href)
        if (!isDesktop) close()
    }

    return (
        <>
            {/* Overlay mobile */}
            {!isDesktop && isOpen && (
                <div
                    onClick={close}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                />
            )}

            <aside
                className={clsx(
                    "fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300",
                    isDesktop && (isCollapsed ? "w-[80px]" : "w-[260px]"),
                    !isDesktop && [
                        "w-[260px]",
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    ]
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    {!isCollapsed && <span className="text-sm font-semibold">Menú</span>}

                    <button
                        onClick={toggleCollapse}
                        className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                        <PanelLeft size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-2 space-y-1">
                    <SidebarItem
                        icon={HomeIcon}
                        label="Dashboard"
                        active={pathname === "/dashboard"}
                        collapsed={isCollapsed}
                        onClick={() => navigate("/dashboard")}
                    />

                    {AppModules.map(module => (
                        <SidebarItem
                            key={module.id}
                            icon={module.icon}
                            label={module.label}
                            active={pathname.startsWith(module.basePath)}
                            collapsed={isCollapsed}
                            onClick={() => navigate(module.basePath)}
                        />
                    ))}
                </div>
            </aside>
        </>
    )
}