import { Profile, ProfileDto } from "./profile.model";
import { AppError } from "@/app/lib/errors/AppError";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { toCamelCase, toSnakeCase } from "@/app/utils/caseConverter";
import { uploadFileStorage } from "@/app/lib/supabase/storage/uploadFile";
import { getServerAuthContext } from "../auth/getServer.context";

export const ProfileService = {
    getOne: async (): Promise<Profile> => {
        const { userId, supabase } = await getServerAuthContext()

        const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();

        if (error) { throw mapSupabaseError(error) }
        if (!data) { throw new AppError("warning", 'Usuario no encontrado'); }

        return toCamelCase(data) as Profile
    },

    update: async (dto: ProfileDto) => {
        const { userId, supabase } = await getServerAuthContext()

        const { avatar, cv, year, ...rest } = dto;
        const updateData: Record<string, unknown> = { ...rest };

        if (year !== undefined) {
            const parsed = parseInt(year);
            if (isNaN(parsed)) { throw new AppError('error', 'Formato de año inválido'); }
            updateData.year = parsed;
        }

        if (avatar) {
            const avatarUrl = await uploadFileStorage(supabase, avatar, 'avatar', userId);
            updateData.avatarUrl = avatarUrl;
        }

        if (cv) {
            const cvUrl = await uploadFileStorage(supabase, cv, 'cv', userId);
            updateData.cvUrl = cvUrl;
        }

        const { error } = await supabase.from('profiles').update(toSnakeCase(updateData)).eq('id', userId);

        if (error) {
            throw new AppError('error', error.message);
        }
    }
}