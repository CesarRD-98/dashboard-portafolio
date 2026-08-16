import { AppError } from "@/app/lib/errors/AppError";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { getSupabaseServerReadonly } from "@/app/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function getServerAuthContext(): Promise<{ userId: string, supabase: SupabaseClient }> {
    const supabase = await getSupabaseServerReadonly();
    const { data, error } = await supabase.auth.getClaims();

    if (error) {
        throw mapSupabaseError(error);
    }

    if (!data?.claims.sub) {
        throw new AppError('warning', 'Usuario no encontrado');
    }

    return {
        userId: data.claims.sub,
        supabase
    }
}
