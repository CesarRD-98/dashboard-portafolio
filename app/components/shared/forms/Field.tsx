type FieldProps = {
    label: string;
    htmlFor?: string;
    children: React.ReactNode;
    hint?: string;
};

export const Field = ({ label, htmlFor = "", children, hint }: FieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400"
                htmlFor={htmlFor}
            >
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