'use client'

import { Header } from "@/app/components/layout/header/Header"
import { Sidebar } from "@/app/components/sidebar_accordion/SidebarAccordion"
import { Profile } from "@/app/modules/profile/profile.model"
import { ReactNode, useEffect, useState } from "react"

type Props = {
    children: ReactNode
    profile: Profile
}

const MOBILE_BREAKPOINT = 768

export function DashboardShell({ children, profile }: Props) {
    const [isMobile, setIsMobile] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

        const syncLayout = () => {
            const mobile = media.matches
            setIsMobile(mobile)
            setIsSidebarOpen(!mobile)
        }

        syncLayout()
        media.addEventListener("change", syncLayout)

        return () => media.removeEventListener("change", syncLayout)
    }, [])

    return (
        <div className="dashboard-shell bg-white dark:bg-neutral-950">
            <div
                data-state={isMobile && isSidebarOpen ? "open" : "closed"}
                className="dashboard-sidebar-overlay fixed inset-0 z-40 bg-black/40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
            />

            <div className="flex h-full min-w-0">
                {!isMobile && (
                    <div
                        data-state={isSidebarOpen ? "open" : "closed"}
                        className="dashboard-sidebar-column border-r border-neutral-200 dark:border-neutral-800"
                    >
                        <Sidebar
                            mode="desktop"
                            isOpen={isSidebarOpen}
                            onClose={() => setIsSidebarOpen(false)}
                        />
                    </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col bg-neutral-50 dark:bg-neutral-900/80">
                    <Header
                        profile={profile}
                        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                        isSidebarOpen={isSidebarOpen}
                    />

                    <main className="dashboard-scroll-area flex-1">
                        {children}
                    </main>
                </div>
            </div>

            {isMobile && (
                <div
                    data-state={isSidebarOpen ? "open" : "closed"}
                    className="dashboard-sidebar-mobile-layer fixed inset-0 z-50 md:hidden"
                >
                    <Sidebar
                        mode="mobile"
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />
                </div>
            )}
        </div>
    )
}