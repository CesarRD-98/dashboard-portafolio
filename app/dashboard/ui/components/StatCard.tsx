import clsx from "clsx";

type Props = {
    title: string;
    count: number;
    description: string;
    className?: string;
};

export function StatCard({
    title,
    count,
    description,
    className,
}: Props) {
    return (
        <div
            className={clsx(
                "p-6 rounded-md",
                "border border-neutral-300 dark:border-neutral-700",
                "bg-white dark:bg-neutral-900/30",
                className
            )}
        >

            <div className="space-y-1">
                <p className="text-sm font-medium tracking-wide text-neutral-500">
                    {title}
                </p>

                <h3 className="text-4xl font-bold tracking-tight text-neutral-700 dark:text-white">
                    {count}
                </h3>
            </div>

            <div className="mt-3 border-t border-neutral-300 dark:border-neutral-700 pt-4">
                <p className="text-sm leading-relaxed text-neutral-400">
                    {description}
                </p>
            </div>
        </div>
    );
}