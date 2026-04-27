import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "./ui/dashboard.layout";
import { ProfileService } from "../modules/profile/profile.service";
import { getSupabaseServer } from "../lib/supabase/server";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = await getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) { redirect("/") }

    const profile = await ProfileService.getOne();

    return (
        <DashboardShell profile={profile}>
            {children}
        </DashboardShell>
    )
}