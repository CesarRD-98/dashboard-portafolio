import { Project, ProjectDto } from "./projects.model";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";
import { toCamelCase, toSnakeCase } from "@/app/utils/caseConverter";
import { uploadFileStorage } from "@/app/lib/supabase/storage/uploadFile";
import { getServerAuthContext } from "../auth/getServer.context";

export const ProjectsService = {
    // ==========================================================
    async getAll(): Promise<Project[]> {
        const { userId, supabase } = await getServerAuthContext()
        const { data, error } = await supabase.from('projects').select('*').eq('user_id', userId).order('created_at', { ascending: false })

        if (error) throw mapSupabaseError(error)

        return toCamelCase(data) as Project[]
    },

    // ==========================================================
    async getOne(id: string): Promise<Project> {
        const { supabase } = await getServerAuthContext()
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()

        if (error) throw mapSupabaseError(error)

        return toCamelCase(data) as Project
    },

    // ==========================================================
    async create(dto: ProjectDto): Promise<void> {
        const { userId, supabase } = await getServerAuthContext()

        const { img, stack, ...rest } = dto
        const newProject: Record<string, unknown> = { ...rest }

        if (img) {
            const imgUrl = await uploadFileStorage(supabase, img, "projectImage", userId)
            newProject.imgUrl = imgUrl
        }

        if (stack?.trim()) {
            newProject.stack = stack.split(',').map(str => str.trim()).filter(Boolean)
        }

        newProject.userId = userId

        const { error } = await supabase.from('projects').insert([toSnakeCase(newProject)])

        if (error) throw mapSupabaseError(error)
    },

    // ==========================================================
    async delete(id: string): Promise<void> {
        const { supabase } = await getServerAuthContext()

        const { error } = await supabase.from('projects').delete().eq('id', id)

        if (error) throw mapSupabaseError(error)
    },

    // ==========================================================
    async update(id: string, dto: ProjectDto): Promise<void> {
        const { userId, supabase } = await getServerAuthContext()

        const { img, stack, ...rest } = dto
        const updateData: Record<string, unknown> = { ...rest }

        if (img) {
            const imgUrl = await uploadFileStorage(supabase, img, "projectImage", userId)
            updateData.imgUrl = imgUrl
        }

        if (stack?.trim()) {
            updateData.stack = stack.split(',').map(str => str.trim()).filter(Boolean)
        }

        const { error } = await supabase.from('projects').update(toSnakeCase(updateData)).eq('id', id).eq('user_id', userId)

        if (error) throw mapSupabaseError(error)
    },
}