import { getSupabaseServer } from "@/app/lib/supabase/server";
import { Project, ProjectDto, projectDtoConfig } from "./projects.model";
import { AppError } from "@/app/lib/errors/AppError";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { toCamelCase, toSnakeCase } from "@/app/utils/caseConverter";
import { mapFormData } from "@/app/lib/forms/forms.mapper";
import { uploadFileStorage } from "@/app/lib/supabase/storage/uploadFile";

export const ProjectsService = {
    getProjects: async (): Promise<Project[]> => {
        const supabase = await getSupabaseServer()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) { throw new AppError('error', 'Usuario no autenticado'); }

        const { data, error } = await supabase.from('projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false });

        if (error) { throw mapSupabaseError(error) }
        if (!data) { throw new AppError("warning", 'Usuario no encontrado'); }

        return toCamelCase(data) as Project[]
    },
    createProject: async (formData: FormData): Promise<void> => {
        const supabase = await getSupabaseServer()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) { throw new AppError('error', 'Usuario no autenticado'); }

        const mapped = mapFormData<ProjectDto>(formData, projectDtoConfig)
        const { img, stack, ...rest } = mapped
        const newProject: Record<string, unknown> = { ...rest }

        if (img) {
            const imgUrl = await uploadFileStorage(supabase, img, "projectImage", user.id)
            newProject.imgUrl = imgUrl
        }

        if (stack?.trim() !== '') {
            const stackProject = stack?.split(',')
            newProject.stack = stackProject
        }

        if (Object.keys(newProject).length === 0) {
            throw new AppError('info', 'No se encontraron datos para crear un proyecto')
        }

        newProject.userId = user.id

        const { error } = await supabase.from('projects').insert([toSnakeCase(newProject)]);

        if (error) {
            throw mapSupabaseError(error)
        }
    }
}