import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "./ui/dashboard.layout";
import { ProfileService } from "../modules/profile/profile.service";
import { getSupabase } from "../lib/supabase/serverClient";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) { redirect("/") }

    const profile = await ProfileService.getOne();

    return (
        <DashboardShell profile={profile}>
            {children}
        </DashboardShell>
    )
}