'use client';

import { Profile } from "@/app/modules/profile/profile.model";
import { Avatar } from "./Avatar";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/modules/auth/auth.service";
import { LogOut, Menu } from "lucide-react";

type Props = {
    profile: Profile;
    onToggleSidebar: () => void;
    isSidebarOpen: boolean;
};

export function Header({ profile, onToggleSidebar }: Props) {
    const router = useRouter();

    const handlerLogOut = async () => {
        const success = await AuthService.logout();
        if (success) router.refresh();
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900 md:px-6">
            <button
                onClick={onToggleSidebar}
                className="rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                aria-label="Abrir o cerrar menú"
            >
                <Menu size={18} />
            </button>

            <div className="flex items-center gap-3">
                <Avatar profile={profile} />

                <button
                    onClick={handlerLogOut}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-neutral-200/75 dark:hover:bg-neutral-800 
                    text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                >
                    <span className="hidden md:inline-flex">Cerrar Sesión</span>
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
}