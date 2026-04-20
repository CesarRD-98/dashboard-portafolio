import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function Container({ children }: Props) {
    return (
        <div className="max-w-6xl mx-auto w-full">
            {children}
        </div>
    )
}