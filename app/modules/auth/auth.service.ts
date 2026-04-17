import { getSupabaseBrowser } from "@/app/lib/supabase/browser";
import { LoginDto } from "./auth.model";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { AppError } from "@/app/lib/errors/AppError";

export const AuthService = {
    login: async (dto: LoginDto): Promise<boolean> => {
        const supabase = getSupabaseBrowser();
        const { error } = await supabase.auth.signInWithPassword(dto);

        if (error) {
            throw mapSupabaseError(error);
        }

        return true
    },

    logout: async (): Promise<boolean> => {
        const supabase = getSupabaseBrowser();
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new AppError('error', 'Error al cerrar sesión');
        }

        return true
    }
};