type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
};

const baseStyles =
    "w-full px-3 py-2.5 rounded-md text-sm " +
    "bg-white/70 dark:bg-neutral-800/70 " +
    "text-neutral-900 dark:text-white " +
    "placeholder:text-neutral-400 " +
    "border border-neutral-200 dark:border-neutral-700 " +
    "transition-all duration-200 " +
    "hover:border-neutral-300 dark:hover:border-neutral-600 " +
    "focus:outline-none focus:border-blue-500";

const errorStyles =
    "border-red-500 focus:border-red-500";

export const Input = ({ error, className = "", ...props }: InputProps) => {
    return (
        <input
            className={`${baseStyles} ${error ? errorStyles : ""} ${className}`}
            {...props}
        />
    );
};