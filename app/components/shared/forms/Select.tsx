type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    error?: boolean;
};

const baseStyles =
    "w-full px-3 py-2.5 rounded-md text-sm appearance-none " +
    "bg-white/70 dark:bg-neutral-800/70 " +
    "text-neutral-900 dark:text-white " +
    "border border-neutral-200 dark:border-neutral-700 " +
    "transition-all duration-200 " +
    "hover:border-neutral-300 dark:hover:border-neutral-600 " +
    "focus:outline-none focus:border-blue-500";

const errorStyles =
    "border-red-500 focus:border-red-500";

export const Select = ({ error, className = "", children, ...props }: SelectProps) => {
    return (
        <select
            className={`${baseStyles} ${error ? errorStyles : ""} pr-10 ${className}`}
            {...props}
        >
            {children}
        </select>
    );
};