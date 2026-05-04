type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
};

const baseStyles =
    "w-full px-3 py-2 rounded-md text-sm " +
    "bg-white/70 dark:bg-neutral-800/70 " +
    "text-neutral-900 dark:text-white " +
    "border border-neutral-300 dark:border-neutral-700 " +
    "transition duration focus:outline-none focus:ring-2 focus:ring-blue-600/75";

const errorStyles =
    "border-red-500 focus:border-red-500";

export const Textarea = ({ error, className = "", ...props }: TextareaProps) => {
    return (
        <textarea
            className={`${baseStyles} ${error ? errorStyles : ""} ${className}`}
            {...props}
        />
    );
};