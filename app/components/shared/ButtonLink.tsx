
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    icon: LucideIcon;
    label: string;
}

export function ButtonLink({ href, icon: Icon, label, ...props }: Props) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-neutral-200/75 dark:hover:bg-neutral-700 
            text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
            {...props}
        >
            <Icon size={16} />
            {label}
        </Link>
    );
}