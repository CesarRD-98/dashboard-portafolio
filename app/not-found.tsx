"use client";

import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex min-h-screen items-center justify-center px-6 bg-neutral-50 dark:bg-neutral-950 transition-colors">

            <div className="text-center max-w-md animate-in fade-in zoom-in duration-300 ease-in-out">

                {/* Icono con glow */}
                <div className="flex justify-center mb-6">
                    <SearchX className="w-16 h-16 text-blue-500/75" />
                </div>

                {/* Código */}
                <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">
                    404
                </h1>

                {/* Título */}
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Página no encontrada
                </h2>

                {/* Descripción */}
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Parece que esta ruta no existe o fue movida.
                    Puedes regresar o ir al inicio del panel.
                </p>

                {/* Botones */}
                <div className="flex justify-center gap-3">

                    <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600/75 text-white hover:bg-blue-700  transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        <Home size={18} />
                        Inicio
                    </Link>

                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                        Regresar
                    </button>

                </div>

                {/* Línea decorativa */}
                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            </div>
        </div>
    );
}