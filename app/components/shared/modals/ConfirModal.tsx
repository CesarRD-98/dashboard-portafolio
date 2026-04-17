'use client'

import { ReactNode, useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"

type Variant = "default" | "danger" | "success" | "warning"

type Props = {
    open: boolean
    title: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => Promise<void> | void
    onClose: () => void
    loading?: boolean
    variant?: Variant
    children?: ReactNode
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
    loading = false,
    variant = "default",
    children
}: Props) {

    const [isPresent, setIsPresent] = useState(open)
    const [state, setState] = useState<"enter" | "exit">("enter")

    
    if (open && !isPresent) {
        setIsPresent(true)
        setState("enter")
    }

    const handleClose = useCallback(() => {
        if (loading) return
        setState("exit")
    }, [loading])

    
    const handleConfirm = useCallback(async () => {
        await onConfirm()
        setState("exit")
    }, [onConfirm])

    const handleAnimationEnd = useCallback(() => {
        if (state === "exit") {
            setIsPresent(false)
            onClose()
        }
    }, [state, onClose])

    useEffect(() => {
        if (!isPresent) return

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose()
        }

        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [isPresent, handleClose])

    if (!isPresent) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* OVERLAY */}
            <div
                onClick={handleClose}
                data-state={state}
                className="overlay absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* MODAL */}
            <div
                data-state={state}
                onAnimationEnd={handleAnimationEnd}
                className="modal relative w-full max-w-md mx-4 rounded-xl border border-neutral-200 dark:border-neutral-800 
                bg-white dark:bg-neutral-900 shadow-xl p-6 flex flex-col gap-4"
            >

                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {description}
                    </p>
                )}

                {children}

                <div className="flex justify-end gap-3 pt-4">

                    <button
                        onClick={handleClose}
                        disabled={loading}
                        className="px-4 py-2 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 
                        text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={`
                            px-4 py-2 text-sm rounded-md font-medium text-white 
                            transition flex items-center gap-2 active:scale-95
                            ${variantStyles[variant]}
                            ${loading ? "opacity-80 cursor-not-allowed" : ""}
                        `}
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