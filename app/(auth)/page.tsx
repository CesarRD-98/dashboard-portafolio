import { redirect } from "next/navigation";
import { LoginView } from "./ui/login.view";
import { getSupabase } from "../lib/supabase/serverClient";

export const metadata = {
    title: 'Autenticación'
}

export default async function LoginPage() {
    const supabase = await getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        redirect('/dashboard')
    }
    return <LoginView />
}