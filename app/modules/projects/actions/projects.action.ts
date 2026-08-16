'use server'

import { revalidatePath } from "next/cache"
import { safeAction } from "@/app/lib/errors/SafeActions"
import { ProjectsService } from "../projects.service"
import { formDataToObject, parseWithSchema } from "@/app/lib/forms/zod"
import { projectCreateSchema, projectUpdateSchema } from "../projects.schema"

export const createProject = safeAction(async (formData: FormData) => {
  const dto = parseWithSchema(projectCreateSchema, formDataToObject(formData));
  await ProjectsService.create(dto)

  revalidatePath('/dashboard/project')
})


export const deleteProject = safeAction(async (id: string) => {
  await ProjectsService.delete(id)
  revalidatePath('/dashboard/project')
})

export const updateProject = safeAction(async (id: string, formData: FormData) => {
  const dto = parseWithSchema(projectUpdateSchema, formDataToObject(formData));
  await ProjectsService.update(id, dto)
  revalidatePath('/dashboard/project')
})
