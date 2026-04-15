import { getSupabaseServer } from "@/app/lib/supabase/server";
import { Project, ProjectDto } from "./projects.model";
import { AppError } from "@/app/lib/errors/AppError";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { toCamelCase, toSnakeCase } from "@/app/utils/caseConverter";
import { uploadFileStorage } from "@/app/lib/supabase/storage/uploadFile";

export const ProjectsService = {
    async getAll(): Promise<Project[]> {
        const supabase = await getSupabaseServer()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            throw new AppError('error', 'Usuario no autenticado')
        }

        const { data, error } = await supabase.from('projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

        if (error) throw mapSupabaseError(error)
        if (!data) throw new AppError("warning", 'Usuario no encontrado')

        return toCamelCase(data) as Project[]
    },

    async create(data: ProjectDto): Promise<void> {
        const supabase = await getSupabaseServer()

        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            throw new AppError('error', 'Usuario no autenticado')
        }

        const { img, stack, ...rest } = data
        const newProject: Record<string, unknown> = { ...rest }

        if (img) {
            const imgUrl = await uploadFileStorage(supabase, img, "projectImage", user.id)
            newProject.imgUrl = imgUrl
        }

        if (stack?.trim()) {
            newProject.stack = stack.split(',').map(str => str.trim()).filter(Boolean)
        }

        newProject.userId = user.id

        const { error } = await supabase.from('projects').insert([toSnakeCase(newProject)])

        if (error) throw mapSupabaseError(error)
    }
}