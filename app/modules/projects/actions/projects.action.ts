'use server'

import { mapFormData } from "@/app/lib/forms/forms.mapper"
import { ProjectDto, projectDtoConfig } from "../projects.model"
import { revalidatePath } from "next/cache"
import { safeAction } from "@/app/lib/errors/SafeActions"
import { AppError } from "@/app/lib/errors/AppError"
import { ProjectsService } from "../projects.service"

export const createProjectAction = safeAction(async (formData: FormData) => {

  const dto = mapFormData<ProjectDto>(formData, projectDtoConfig) as ProjectDto
  const { img, stack, ...rest } = dto

  const hasData = Object.keys(rest).length > 0 || !!img || (stack && stack.trim() !== '')

  if (!hasData) {
    throw new AppError('info', 'No se encontraron datos para crear un proyecto')
  }

  await ProjectsService.create(dto)

  revalidatePath('/project')
})


export const deleteProjectAction = safeAction(async (id: string) => {
  await ProjectsService.delete(id)
  revalidatePath('/project')
})

export const updateProjectAction = safeAction(async (id: string, formData: FormData) => {
  const dto = mapFormData<ProjectDto>(formData, projectDtoConfig) as ProjectDto
  await ProjectsService.update(id, dto)
  revalidatePath('/project')
})