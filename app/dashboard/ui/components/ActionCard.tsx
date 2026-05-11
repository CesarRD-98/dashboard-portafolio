import Link from "next/link";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Props = {
    label: string;
    description: string;
    href: string;
    icon: LucideIcon;
};

export function ActionCard({
    label,
    description,
    href,
    icon: Icon,
}: Props) {
    return (
        <Link
            href={href}
            className={clsx(
                "group rounded-md border",
                "border-neutral-200 dark:border-neutral-800",
                "bg-white dark:bg-neutral-900/40",
                "p-5 transition-all",
                "hover:border-blue-500/40",
            )}
        >
            <div className="flex flex-col gap-4">

                {/* Icon */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                    <Icon size={20} />
                </div>

                {/* Content */}
                <div>
                    <h3 className="
                        text-sm font-semibold
                        text-neutral-900 dark:text-neutral-100
                    ">
                        {label}
                    </h3>

                    <p className="
                        mt-1 text-sm leading-relaxed
                        text-neutral-500 dark:text-neutral-400
                    ">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}