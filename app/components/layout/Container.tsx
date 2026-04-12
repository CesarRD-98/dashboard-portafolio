import { ReactNode } from "react"

type Props = {
    children: ReactNode;
    className?: string
}

export function Container({ children, className = "" }: Props) {
    return (
        <div className={`w-full max-w-6xl mx-auto ${className}`}>
            {children}
        </div>
    )
}