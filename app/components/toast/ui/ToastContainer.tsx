import { Toast } from "../toast.type";
import { ToastItem } from "./ToastItem";

interface Props {
    toasts: Toast[];
}

export const ToastContainer = ({ toasts }: Props) => {
    return (
        <div className="fixed top-4 right-4 z-[999] flex flex-col gap-3">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
};