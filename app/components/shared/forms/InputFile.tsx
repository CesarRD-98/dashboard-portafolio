import { CheckCircle, Upload, Loader2 } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface InputFileProps {
    helperText?: string;
    accept?: string;
    file: File | null;
    onChange: (file: File | null) => void;
    disabled?: boolean;
}

export const InputFile = ({
    helperText = "Documentos, Imágenes",
    accept = "*",
    file,
    onChange,
    disabled = false,
}: InputFileProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (disabled) return;
        inputRef.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;
        if (!selectedFile) return;

        setLoading(true);

        setTimeout(() => {
            onChange(selectedFile);
            setLoading(false);
        }, 800);
    };

    useEffect(() => {
        if (!file && inputRef.current) {
            inputRef.current.value = "";
        }
    }, [file]);

    const isActive = !!file;

    return (
        <div className="flex flex-col gap-2">
            {/* DROPZONE */}
            <div
                onClick={handleClick}
                className={`group flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-md border-2 border-dashed text-center transition-all duration-200
                ${disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                ${isActive
                        ? "border-blue-500 bg-blue-50/40 dark:bg-blue-500/10"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500"
                    }`}
            >
                {/* ICON */}
                <div
                    className={`w-12 h-12 rounded-md flex items-center justify-center transition-all duration-200
                    ${isActive
                            ? "bg-blue-100 dark:bg-blue-500/20"
                            : "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20"
                        }`}
                >
                    {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    ) : isActive ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                        <Upload className="w-6 h-6 text-neutral-500 group-hover:text-blue-600" />
                    )}
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {loading
                            ? "Cargando archivo..."
                            : isActive
                                ? "Archivo cargado"
                                : "Haz clic para subir archivo"}
                    </span>

                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {loading
                            ? "Procesando archivo..."
                            : isActive
                                ? file.name
                                : helperText}
                    </span>
                </div>
            </div>

            {/* INPUT */}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />
        </div>
    );
};