import { AlertCircle, Inbox, CheckCircle, AlertTriangle, } from 'lucide-react';

type StatusMessageProps = {
    title: string;
    message?: string;
    variant?: 'empty' | 'error' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
    action?: React.ReactNode;
};

export function StatusMessage({
    title,
    message,
    variant = 'empty',
    size = 'md',
    icon,
    action,
}: StatusMessageProps) {
    const variants = {
        empty: {
            icon: Inbox,
            styles:
                'border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400',
        },
        error: {
            icon: AlertCircle,
            styles:
                'border-red-300 text-red-600 dark:border-red-800 dark:text-red-400',
        },
        success: {
            icon: CheckCircle,
            styles:
                'border-green-300 text-green-600 dark:border-green-800 dark:text-green-400',
        },
        warning: {
            icon: AlertTriangle,
            styles:
                'border-yellow-300 text-yellow-600 dark:border-yellow-800 dark:text-yellow-400',
        },
    };

    const sizes = {
        sm: 'p-4 text-sm',
        md: 'p-6 text-base',
        lg: 'p-10 text-lg',
    };

    const DefaultIcon = variants[variant].icon;
    const Icon = icon ?? <DefaultIcon size={28} strokeWidth={1.5} />;

    return (
        <div
            className={`flex flex-col items-center justify-center text-center rounded-xl border transition-colors m-5 
                ${variants[variant].styles} 
                ${sizes[size]}`}
        >
            <div className="mb-3 opacity-80">{Icon}</div>

            <p className="font-medium">{title}</p>

            {message && (
                <p className="mt-1 opacity-80">{message}</p>
            )}

            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}