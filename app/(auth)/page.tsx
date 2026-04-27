import { redirect } from "next/navigation";
import { LoginView } from "./ui/login.view";
import { getSupabaseServer } from "../lib/supabase/server";

export const metadata = {
    title: 'Autenticación'
}

export default async function LoginPage() {
    const supabase = await getSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        redirect('/dashboard')
    }
    return <LoginView />
}