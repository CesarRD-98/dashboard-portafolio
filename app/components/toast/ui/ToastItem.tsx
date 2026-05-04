import { useEffect, useState } from "react";
import { XIcon, CheckCircle, AlertCircle, Info } from "lucide-react";
import { useToast } from "../toast.provider";
import { Toast } from "../toast.type";

const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
    warning: <AlertCircle size={18} />,
};

export const ToastItem = ({ toast }: { toast: Toast }) => {
    const { closeToast, pauseToast, resumeToast } = useToast();

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setVisible(true);
        });

        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div
            onMouseEnter={() => pauseToast(toast.id)}
            onMouseLeave={() => resumeToast(toast.id)}
            className={`group relative flex items-start gap-3 w-full max-w-sm px-6 py-4 rounded-md border border-neutral-200 dark:border-neutral-700 
                bg-neutral-50 dark:bg-neutral-800/80 shadow-lg transition duration-300
                ${toast.closing
                    ? "opacity-0 translate-y-2 scale-95"
                    : visible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-2 scale-95"}`}
        >

            {/* ICON */}
            <div
                className={`mt-0.5 
                    ${toast.type === "success" && "text-green-500/75"}
                    ${toast.type === "error" && "text-red-500/75"}
                    ${toast.type === "info" && "text-blue-500/75"}
                    ${toast.type === "warning" && "text-yellow-500/75"}`}
            >
                {icons[toast.type]}
            </div>

            {/* CONTENT */}
            <div className="flex gap-4">

                {toast.message && (
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        {toast.message}
                    </p>
                )}

                {toast.action && (
                    <button
                        onClick={toast.action.onClick}
                        className="mt-1 text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                    >
                        {toast.action.label}
                    </button>
                )}
            </div>

            {/* CLOSE */}
            <button
                onClick={() => closeToast(toast.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-600 
                dark:hover:text-neutral-200 cursor-pointer"
            >
                <XIcon size={16} />
            </button>

            {/* PROGRESS */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden rounded-b-md">
                <div
                    className="h-full bg-blue-500 animate-toast-progress"
                    style={{
                        animationDuration: `${toast.duration}ms`,
                        animationPlayState: visible ? "running" : "paused",
                    }}
                />
            </div>
        </div>
    );
};