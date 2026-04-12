import { redirect } from "next/navigation";
import { getSupabaseServer } from "../lib/supabase/server";
import LoginView from "./ui/login.view";

export const metadata = {
    title: 'Autenticación'
}

export default async function LoginPage() {
    const supabase = await getSupabaseServer()
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        redirect('/dashboard')
    }
    return <LoginView />
}