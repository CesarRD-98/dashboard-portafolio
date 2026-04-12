import { ReactNode } from "react"
import { Container } from "./Container";

type Props = {
    children: ReactNode;
    id: string;
    className?: string
}

export function Section({ children, id, className = "" }: Props) {
    return (
        <section id={id} className={`w-full px-4 py-6 space-y-6 md:px-6 ${className}`}>
            <Container>
                {children}
            </Container>
        </section>
    )
}