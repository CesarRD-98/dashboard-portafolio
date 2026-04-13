import { CheckCircle, Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";

interface FileUploadFileProps {
    label: string;
    helperText?: string;
    accept?: string;
    onFileSelect?: (file: File | null) => void;
}

export const InputFile = ({ label = "", helperText = "Documentos, Imágenes", accept = "*", onFileSelect }: FileUploadFileProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;
        setFile(selectedFile);
        onFileSelect?.(selectedFile);
    };

    return (
        <div className="flex flex-col gap-2">

            {/* LABEL */}
            <label className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {label}
            </label>

            {/* DROPZONE */}
            <div
                onClick={handleClick}
                className={`group cursor-pointer flex flex-col items-center justify-center gap-3 px-4 py-6 rounded-md border-2 border-dashed
                        transition-all duration-200 text-center ${file
                        ? "border-blue-500 bg-blue-50/40 dark:bg-blue-500/10"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-blue-400 dark:hover:border-blue-500"
                    }`}>

                {/* ICON */}
                <div
                    className={`
                            w-12 h-12 rounded-md flex items-center justify-center
                            transition-all duration-200
                            ${file
                            ? "bg-blue-100 dark:bg-blue-500/20"
                            : "bg-neutral-100 dark:bg-neutral-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20"
                        }`}
                >
                    {file ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                        <Upload className="w-6 h-6 text-neutral-500 group-hover:text-blue-600" />
                    )}
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                        {file ? "Archivo cargado" : "Haz clic para subir archivo"}
                    </span>

                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {file ? file.name : helperText}
                    </span>
                </div>
            </div>

            {/* INPUT HIDDEN */}
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