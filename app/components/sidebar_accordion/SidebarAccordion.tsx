"use client";

import { AppModules } from "@/app/lib/app_modules/appModules";
import { ChevronRight, HomeIcon, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
    mode: "desktop" | "mobile";
    isOpen: boolean;
    onClose: () => void;
};

export function Sidebar({ mode, isOpen, onClose }: Props) {
    const pathname = usePathname() ?? "";
    const router = useRouter();
    const [openId, setOpenId] = useState<string | null>(null);

    const activeSection = useMemo(() => {
        return AppModules.find((section) =>
            section.items.some((item) => pathname.startsWith(item.href))
        )?.id;
    }, [pathname]);

    const derivadedOpenId = useMemo(() => {
        return pathname === "/dashboard" ? null : activeSection ?? null
    }, [activeSection, pathname]);


    useEffect(() => {
        setOpenId(derivadedOpenId);
    }, [derivadedOpenId]);

    const navigate = (href: string) => {
        router.push(href);
        if (mode === "mobile") onClose();
    };

    return (
        <aside
            className={["h-full bg-white dark:bg-neutral-900", "border-r border-neutral-200 dark:border-neutral-800", "flex flex-col overflow-hidden",
                "transition-transform duration-300 ease-in-out", mode === "mobile" ? "fixed inset-y-0 left-0 z-50 w-[280px]" : "relative w-full",
                isOpen ? "translate-x-0" : "-translate-x-full",
            ].join(" ")}
        >
            <div className="flex items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 p-4">
                <span className="text-sm font-semibold">Menú</span>

                {mode === "mobile" && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        aria-label="Cerrar menú"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-2">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard")}
                    className="flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-left text-sm transition-colors hover:bg-neutral-100 
                    dark:hover:bg-neutral-800 cursor-pointer"
                >
                    <span className="flex h-5 w-5 items-center justify-center">
                        <HomeIcon size={18} />
                    </span>
                    Dashboard
                </button>

                {/* Modulos */}
                <nav className="mt-2 flex flex-col gap-1">
                    {AppModules.map((section) => {
                        const isSectionOpen = openId === section.id;
                        const Icon = section.icon;

                        return (
                            <div key={section.id} className="flex flex-col">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setOpenId((prev) => prev === section.id ? null : section.id)
                                    }
                                    className="flex w-full items-center justify-between rounded-md px-4 py-2.5 text-left text-sm transition-colors 
                                    hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                                >
                                    <span className="flex items-center gap-3">
                                        <Icon size={18} />
                                        {section.label}
                                    </span>

                                    <ChevronRight
                                        size={16}
                                        className={`transition-transform duration-200 ${isSectionOpen ? "rotate-90" : ""}`}
                                    />
                                </button>

                                {/* Submodulos */}
                                <div
                                    className={`overflow-hidden transition-all duration-200 ease-in-out ${isSectionOpen ? "mt-1 max-h-96" : "max-h-0"
                                        }`}
                                >
                                    <div className="flex flex-col gap-1 pl-9 pr-2 pb-1">
                                        {section.items.map((item) => {
                                            const isActive = pathname === item.href;

                                            return (
                                                <button
                                                    key={item.href}
                                                    type="button"
                                                    onClick={() => navigate(item.href)}
                                                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer ${isActive
                                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-600/75 dark:text-white"
                                                        : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"}`}
                                                >
                                                    {item.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}