'use client';

import { Header } from "@/app/components/layout/header/Header";
import { Sidebar } from "@/app/components/sidebar_accordion/SidebarAccordion";
import { Profile } from "@/app/modules/profile/profile.model";
import { ReactNode, useEffect, useState } from "react";

type Props = {
    children: ReactNode;
    profile: Profile;
};

const SIDEBAR_WIDTH = 280;
const MOBILE_BREAKPOINT = 768;

export function DashboardShell({ children, profile }: Props) {
    const [isMobile, setIsMobile] = useState(false);
    const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < MOBILE_BREAKPOINT;
            setIsMobile(mobile);

            if (mobile) {
                setDesktopSidebarOpen(false);
                setMobileSidebarOpen(false);
            } else {
                setDesktopSidebarOpen(true);
                setMobileSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSidebarOpen = isMobile ? mobileSidebarOpen : desktopSidebarOpen;

    const toggleSidebar = () => {
        if (isMobile) {
            setMobileSidebarOpen((prev) => !prev);
        } else {
            setDesktopSidebarOpen((prev) => !prev);
        }
    };

    return (
        <div className="bg-white dark:bg-neutral-950">
            {/* Overlay */}
            {isMobile && mobileSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            <div
                className="h-screen grid transition-[grid-template-columns] duration-300 ease-in-out"
                style={{ gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : `${desktopSidebarOpen ? SIDEBAR_WIDTH : 0}px minmax(0, 1fr)`, }}
            >
                {!isMobile && (
                    <div className="overflow-y-hidden border-r border-neutral-200 dark:border-neutral-800">
                        <Sidebar
                            mode="desktop"
                            isOpen={desktopSidebarOpen}
                            onClose={() => setDesktopSidebarOpen(false)}
                        />
                    </div>
                )}

                <div className="flex flex-col bg-neutral-900/80">
                    <Header
                        profile={profile}
                        onToggleSidebar={toggleSidebar}
                        isSidebarOpen={isSidebarOpen}
                    />

                    <main className="flex-1 overflow-visible">
                        {children}
                    </main>
                </div>
            </div>

            {isMobile && (
                <Sidebar
                    mode="mobile"
                    isOpen={mobileSidebarOpen}
                    onClose={() => setMobileSidebarOpen(false)}
                />
            )}
        </div>
    );
}