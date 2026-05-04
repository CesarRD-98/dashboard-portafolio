'use client'

import { useEffect, useState, useCallback } from "react"
import { createPortal } from "react-dom"
import clsx from "clsx"

type Variant = "default" | "danger" | "success" | "warning"

type Props = {
    open: boolean
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onClose: () => void
    variant?: Variant
    loading?: boolean
}

const variantStyles: Record<Variant, string> = {
    default: "bg-blue-600 hover:bg-blue-500",
    danger: "bg-red-600 hover:bg-red-500",
    success: "bg-emerald-600 hover:bg-emerald-500",
    warning: "bg-amber-500 hover:bg-amber-400",
}

export function ConfirmModal({
    open,
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm,
    onClose,
    variant = "default",
    loading = false,
}: Props) {

    const [visible, setVisible] = useState(false)

    
    const handleClose = useCallback(() => {
        if (loading) return
        setVisible(false)
        setTimeout(onClose, 200)
    }, [loading, onClose])

    const handleConfirm = useCallback(() => {
        setVisible(false)
        setTimeout(onConfirm, 200)
    }, [onConfirm])

    
    useEffect(() => {
        if (!open) return

        const id = requestAnimationFrame(() => setVisible(true))
        return () => cancelAnimationFrame(id)
    }, [open])

    // ESC
    useEffect(() => {
        if (!open) return

        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !loading) {
                handleClose()
            }
        }

        window.addEventListener("keydown", onEsc)
        return () => window.removeEventListener("keydown", onEsc)
    }, [open, loading, handleClose])

    if (!open && !visible) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

            {/* Overlay */}
            <div
                onClick={handleClose}
                className={clsx(
                    "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200",
                    visible ? "opacity-100" : "opacity-0"
                )}
            />

            {/* Modal */}
            <div
                className={clsx(
                    "relative w-full max-w-md rounded-xl border border-neutral-200 dark:border-neutral-800",
                    "bg-white dark:bg-neutral-900 shadow-xl p-6 flex flex-col gap-4",
                    "transition-all duration-200",
                    visible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95"
                )}
            >
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {description}
                    </p>
                )}

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 
                        hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={clsx(
                            "px-4 py-2 text-sm rounded-md text-white flex items-center gap-2 transition cursor-pointer",
                            variantStyles[variant],
                            loading && "opacity-80 cursor-not-allowed"
                        )}
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}

                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}