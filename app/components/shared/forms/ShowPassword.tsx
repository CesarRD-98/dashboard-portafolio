import { Check } from "lucide-react";

type Props = {
    showPassword: boolean;
    handleToggle?: (status: boolean) => void;
}

export function ShowPassword({ showPassword, handleToggle }: Props) {
    return (
        <label htmlFor="showPassword" className="flex items-center w-fit mt-2 gap-2 text-sm text-neutral-500 dark:text-neutral-400 
            cursor-pointer select-none hover:text-neutral-700 dark:hover:text-neutral-300">
            <button
                id="showPassword"
                type="button"
                className={`w-4 h-4 flex items-center justify-center border rounded-sm
                        ${showPassword ? "bg-blue-500 border-blue-500" : "border-neutral-500"}`}
                onClick={() => handleToggle && handleToggle(!showPassword)}
            >
                {showPassword && <Check size={16} className="text-white" />}
            </button>
            Mostrar contraseña
        </label>
    );
}