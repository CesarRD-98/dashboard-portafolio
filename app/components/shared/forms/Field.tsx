type FieldProps = {
    label: string;
    children: React.ReactNode;
    hint?: string;
};

export const Field = ({ label, children, hint }: FieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {label}
            </label>

            {children}

            {hint && (
                <span className="text-xs text-neutral-400">
                    {hint}
                </span>
            )}
        </div>
    );
};