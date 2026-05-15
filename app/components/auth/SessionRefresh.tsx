"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/app/modules/auth/auth.service";

export function SessionRefresh() {
    const router = useRouter();
    const refreshingRef = useRef(false);

    useEffect(() => {
        const refreshSession = async () => {

            if (refreshingRef.current) { return }
            refreshingRef.current = true;

            try {
                await AuthService.refresh();
                router.refresh();
            } catch {
                router.replace("/");
            } finally {
                refreshingRef.current = false;
            }
        };

        // Refresca cada 30 minutos
        const interval = setInterval(refreshSession, 30 * 60 * 1000);

        const handleFocus = () => {
            refreshSession();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", handleFocus);
        };

    }, [router]);

    return null;
}