'use server'

import { parseFormData } from "@/app/lib/forms/formData.parser"
import { ProjectDto, projectDtoConfig } from "../projects.model"
import { revalidatePath } from "next/cache"
import { safeAction } from "@/app/lib/errors/SafeActions"
import { AppError } from "@/app/lib/errors/AppError"
import { ProjectsService } from "../projects.service"

export const createProject = safeAction(async (formData: FormData) => {

  const dto = parseFormData<ProjectDto>(formData, projectDtoConfig);
  const { img, stack, ...rest } = dto

  const hasData = Object.keys(rest).length > 0 || !!img || (stack && stack.trim() !== '')

  if (!hasData) {
    throw new AppError('info', 'No se encontraron datos para crear un proyecto')
  }

  await ProjectsService.create(dto)

  revalidatePath('/dashboard/project')
})


export const deleteProject = safeAction(async (id: string) => {
  await ProjectsService.delete(id)
  revalidatePath('/dashboard/project')
})

export const updateProject = safeAction(async (id: string, formData: FormData) => {
  const dto = parseFormData<ProjectDto>(formData, projectDtoConfig);
  await ProjectsService.update(id, dto)
  revalidatePath('/dashboard/project')
})