import { Spinner } from "../../ui/spinner/Spinner";

type Props = {
    isValid: boolean;
    loading: boolean;
    text?: string;
}

export function ButtonSubmit(
    { isValid = false, loading = false, text = "Guardar" }: Props
) {
    return (
        <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <button
                type="submit"
                disabled={!isValid}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                        ${isValid
                        ? "bg-blue-600 text-white hover:bg-blue-500 shadow-sm hover:shadow-md"
                        : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed"
                    }`}
            >
                {loading ? <Spinner /> : text}
            </button>
        </div>
    )
}