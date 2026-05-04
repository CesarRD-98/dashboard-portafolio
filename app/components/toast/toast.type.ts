export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: string;
    type: ToastType;
    title?: string;
    message?: string;
    duration?: number;
    closing?: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}