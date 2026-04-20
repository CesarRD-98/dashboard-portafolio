'use client'

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type SidebarState = {
    isOpen: boolean
    isCollapsed: boolean
    isDesktop: boolean
    toggleOpen: () => void
    toggleCollapse: () => void
    close: () => void
}

const SidebarContext = createContext<SidebarState | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isDesktop, setIsDesktop] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)")

        const handleResize = () => {
            const desktop = media.matches
            setIsDesktop(desktop)

            if (desktop) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }

        handleResize()
        media.addEventListener("change", handleResize)

        return () => media.removeEventListener("change", handleResize)
    }, [])

    const toggleOpen = () => setIsOpen(prev => !prev)
    const toggleCollapse = () => setIsCollapsed(prev => !prev)
    const close = () => setIsOpen(false)

    return (
        <SidebarContext.Provider
            value={{ isOpen, isCollapsed, isDesktop, toggleOpen, toggleCollapse, close }}
        >
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const ctx = useContext(SidebarContext)
    if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider")
    return ctx
}