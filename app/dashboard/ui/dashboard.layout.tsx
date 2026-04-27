'use client'

import { Header } from "@/app/components/layout/header/Header"
import { Sidebar } from "@/app/components/sidebar/Sidebar"
import { SidebarProvider, useSidebar } from "@/app/components/sidebar/sidebar.provider"
import { ConfirmProvider } from "@/app/components/shared/modals/confirm.provider"
import { Profile } from "@/app/modules/profile/profile.model"
import { ReactNode } from "react"
import clsx from "clsx"

type Props = {
    children: ReactNode
    profile: Profile
}

function DashboardLayoutContent({ children, profile }: Props) {
    const { isCollapsed, isDesktop } = useSidebar()

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
            <Sidebar />

            <div
                className={clsx(
                    "flex flex-1 flex-col transition-all duration-300",
                    isDesktop && !isCollapsed && "ml-[260px]",
                    isDesktop && isCollapsed && "ml-[80px]"
                )}
            >
                <Header profile={profile} />

                <main className="flex-1 bg-white dark:bg-black/25">
                    <div
                        className={clsx(
                            "transition-all duration-300",
                            isDesktop && isCollapsed
                                ? "max-w-5xl mx-auto px-4 py-6"
                                : "px-6 py-6"
                        )}
                    >
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export function DashboardShell(props: Props) {
    return (
        <SidebarProvider>
            <ConfirmProvider>
                <DashboardLayoutContent {...props} />
            </ConfirmProvider>
        </SidebarProvider>
    )
}