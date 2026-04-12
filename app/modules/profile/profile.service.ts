import { getSupabaseServer } from "@/app/lib/supabase/server";
import { Profile } from "./profile.model";
import { AppError } from "@/app/lib/errors/AppError";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { toCamelCase, toSnakeCase } from "@/app/utils/caseConverter";
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

        const avatar = formData.get('avatar') as File | null;
        const cv = formData.get('cv') as File | null;

        let avatarUrl: string | null = null;
        let cvUrl: string | null = null;

        if (avatar) { avatarUrl = await uploadFile(supabase, avatar, user.id, 'image'); }
        if (cv) { cvUrl = await uploadFile(supabase, cv, user.id, 'file'); }

        const updateData = mapFormDataToProfile(formData)

        if (avatarUrl) updateData.avatarUrl = avatarUrl;
        if (cvUrl) updateData.cvUrl = cvUrl;
        if (Object.keys(updateData).length === 0) { throw new AppError('warning', 'No hay cambios para guardar'); }

        const { error } = await supabase.from('profiles').update(toSnakeCase(updateData)).eq('id', user.id);

        if (error) { throw mapSupabaseError(error); }
    }
}


export function mapFormDataToProfile(formData: FormData): Partial<Profile> {
    const author = formData.get("author") as string | null;
    const year = formData.get("year") as string | null;
    const shortBio = formData.get("shortBio") as string | null;
    const fullBio = formData.get("fullBio") as string | null;
    const learningFocus = formData.get("learningFocus") as string | null;

    const updateData: Partial<Profile> = {
        ...(author && { author }),
        ...(shortBio && { shortBio }),
        ...(fullBio && { fullBio }),
        ...(learningFocus && { learningFocus }),
    };

    if (year) {
        const parsedYear = parseInt(year);
        if (isNaN(parsedYear)) {
            throw new AppError("error", "Invalid year format");
        }
        updateData.year = parsedYear;
    }

    return updateData;
}