'use client';

import { Profile } from "@/app/modules/profile/profile.model";
import { Avatar } from "./Avatar";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/modules/auth/auth.service";
import { LogOut, Menu } from "lucide-react";
import { useSidebar } from "@/app/components/sidebar/sidebar.provider";
import { Breadcrumbs } from "../../ui/Breadcrumbs";

type Props = {
    profile: Profile;
};

export function Header({ profile }: Props) {
    const router = useRouter();
    const { toggleOpen, isDesktop } = useSidebar();

    const handlerLogOut = async () => {
        const success = await AuthService.logout();
        if (success) router.refresh();
    };

    return (
        <header className="sticky top-0 z-30 h-16 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
            <div className="flex h-full items-center justify-between px-4 md:px-6">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                    {/* Mobile menu button */}
                    {!isDesktop && (
                        <button
                            onClick={toggleOpen}
                            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                        >
                            <Menu size={18} />
                        </button>
                    )}

                    <Breadcrumbs />
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <Avatar profile={profile} />

                    {/* Logout */}
                    <button
                        onClick={handlerLogOut}
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 
                        hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                    >
                        <span className="hidden sm:inline-flex">Cerrar sesión</span>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
}