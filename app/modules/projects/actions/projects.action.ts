'use server'

import { mapFormData } from "@/app/lib/forms/forms.mapper"
import { ProjectDto, projectDtoConfig } from "../projects.model"
import { createProjectUseCase } from "../use_cases/projects.use_cases"
import { revalidatePath } from "next/cache"
import { safeAction } from "@/app/lib/errors/SafeActions"

export const createProjectAction = safeAction(async (formData: FormData) => {

  const mapped = mapFormData<ProjectDto>(formData, projectDtoConfig) as ProjectDto
  await createProjectUseCase(mapped)

  revalidatePath('/project')
})