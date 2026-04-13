import { getSupabaseServer } from "@/app/lib/supabase/server";
import { Profile, ProfileDto, profileDtoConfig } from "./profile.model";
import { AppError } from "@/app/lib/errors/AppError";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { toCamelCase, toSnakeCase } from "@/app/utils/caseConverter";
import { mapFormData } from "@/app/lib/forms/forms.mapper";
import { uploadFile } from "@/app/lib/supabase/storage/uploadFile";

export const ProfileService = {
    getProfile: async (): Promise<Profile> => {
        const supabase = await getSupabaseServer()
        const { data: { user }, error: AuthError } = await supabase.auth.getUser()

        if (AuthError || !user) { throw new AppError('error', 'Usuario no autenticado'); }

        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();

        if (error) { throw mapSupabaseError(error) }
        if (!data) { throw new AppError("warning", 'Usuario no encontrado'); }

        return toCamelCase(data) as Profile
    },

    updateProfile: async (formData: FormData) => {
        const supabase = await getSupabaseServer();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) { throw new AppError('error', 'Usuario no autenticado'); }

        const mapped = mapFormData<ProfileDto>(formData, profileDtoConfig);
        const { avatar, cv, year, ...rest } = mapped;

        const updateData: Record<string, unknown> = { ...rest };

        if (year !== undefined) {
            const parsed = parseInt(year);
            if (isNaN(parsed)) {
                throw new AppError('error', 'Formato de año inválido');
            }
            updateData.year = parsed;
        }

        if (avatar) {
            const avatarUrl = await uploadFile(supabase, avatar, user.id, 'image');
            updateData.avatarUrl = avatarUrl;
        }

        if (cv) {
            const cvUrl = await uploadFile(supabase, cv, user.id, 'document');
            updateData.cvUrl = cvUrl;
        }

        if (Object.keys(updateData).length === 0) {
            throw new AppError('warning', 'No hay cambios para guardar');
        }

        const { error } = await supabase.from('profiles').update(toSnakeCase(updateData)).eq('id', user.id);

        if (error) {
            throw new AppError('error', error.message);
        }
    }
}