import { AppError } from "@/app/lib/errors/AppError";
import { getSupabaseServerReadonly } from "@/app/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getServerAuthContext(): Promise<{ userId: string, supabase: SupabaseClient }> {
    const supabase = await getSupabaseServerReadonly();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new AppError('warning', 'Usuario no encontrado');
    }

    return {
        userId: user.id,
        supabase
    }
}