import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { activityConfig } from "./config";

type Props = {
    type: string;
    title: string;
    createdAt: string;
};

export function RecentActivity({ type, title, createdAt }: Props) {
    
    const activity = activityConfig[type];
    if (!activity) return null;

    const Icon = activity.icon;

    return (
        <article className="flex gap-4">

            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                <Icon size={18} />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">

                {/* Action */}
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {activity.label}
                </p>

                {/* Entity */}
                <p className="mt-1 truncate text-sm text-neutral-500 dark:text-neutral-400">
                    {title}
                </p>

                {/* Time */}
                <time className="mt-2 block text-xs text-neutral-400">
                    {formatDistanceToNow(
                        new Date(createdAt),
                        {
                            addSuffix: true,
                            locale: es,
                        },
                    )}
                </time>
            </div>
        </article>
    );
}