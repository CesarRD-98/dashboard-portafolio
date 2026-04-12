import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSupabaseServer } from "../lib/supabase/server";
import { DashboardShell } from "./ui/dashboard.layout";
import { ProfileService } from "../modules/profile/profile.service";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = await getSupabaseServer();

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) { redirect("/") }

    const profile = await ProfileService.getProfile();

    return (
        <DashboardShell profile={profile}>
            {children}
        </DashboardShell>
    )
}