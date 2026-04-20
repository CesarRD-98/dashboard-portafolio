import { AppError } from "@/app/lib/errors/AppError";
import { getSupabaseServer } from "@/app/lib/supabase/server";
import { SupabaseClient, User } from "@supabase/supabase-js";

export async function getServerAuthContext(): Promise<{ user: User, supabase: SupabaseClient }> {
    const supabase = await getSupabaseServer()
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        throw new AppError('error', 'Sesión inválida')
    }

    if (!user) {
        throw new AppError('error', 'Usuario no autenticado');
    }

    return {
        user,
        supabase
    }
}