import { Check } from "lucide-react";

type InputPasswordProps = {
    id?: string;
    value: string;
    showPassword: boolean;
    onChange: (value: string) => void;
    setShowPassword: (show: boolean) => void;
}

export function InputPassword(
    { id = "password", value, showPassword, onChange, setShowPassword }: InputPasswordProps
) {
    return (
        <div className="flex flex-col gap-2">
            <input
                id={id}
                name={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 transition duration
                bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/75"
            />

            <label htmlFor="showPassword" className="flex items-center mt-2 gap-4 text-sm text-neutral-600 dark:text-neutral-200 cursor-pointer select-none">
                <button
                    id="showPassword"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`w-4 h-4 flex items-center justify-center border rounded-sm 
                        ${showPassword ? "bg-blue-500 border-blue-500" : "border-gray-400"} transition-colors`}
                >
                    {showPassword && <Check size={16} className="text-white" />}
                </button>
                {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            </label>
        </div>
    );
}