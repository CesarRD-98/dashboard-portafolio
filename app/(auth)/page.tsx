import { redirect } from "next/navigation";
import { LoginView } from "./ui/login.view";
import { getSupabaseServerReadonly } from "../lib/supabase/server";

export const metadata = {
    title: 'Autenticación'
}

export default async function LoginPage() {
    const supabase = await getSupabaseServerReadonly();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        redirect('/dashboard')
    }
    return <LoginView />
}