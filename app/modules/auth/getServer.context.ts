import { AppError } from "@/app/lib/errors/AppError";
import { getSupabaseServer } from "@/app/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getServerAuthContext(): Promise<{ userId: string, supabase: SupabaseClient }> {
    const supabase = await getSupabaseServer()
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new AppError('error', 'Usuario no autenticado');
    }

    return {
        userId: user.id,
        supabase
    }
}