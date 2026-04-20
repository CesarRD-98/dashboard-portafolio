import { ReactNode } from "react"

type Props = {
    title?: string
    description?: string
    children: ReactNode
}

export function Section({ title, description, children }: Props) {
    return (
        <section className="space-y-6">
            {(title || description) && (
                <div>
                    {title && (
                        <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">
                            {title}
                        </h1>
                    )}
                    {description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {children}
        </section>
    )
}