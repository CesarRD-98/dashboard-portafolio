import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "./ui/dashboard.layout";
import { ProfileService } from "../modules/profile/profile.service";
import { getSupabaseServer } from "../lib/supabase/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabasa = await getSupabaseServer();
    const { data: { user }, error } = await supabasa.auth.getUser();

    if (error) { redirect("/") }
    if (!user) { redirect("/") }

    const profile = await ProfileService.getOne();

    return (
        <DashboardShell profile={profile}>
            {children}
        </DashboardShell>
    )
}