import { Toast } from "../toast.type";
import { ToastItem } from "./ToastItem";

interface Props {
    toasts: Toast[];
}

export const ToastContainer = ({ toasts }: Props) => {
    return (
        <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
};