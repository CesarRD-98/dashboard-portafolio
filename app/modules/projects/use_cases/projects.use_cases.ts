import { AppError } from "@/app/lib/errors/AppError"
import { ProjectDto } from "../projects.model"
import { ProjectsService } from "../projects.service"

export async function createProjectUseCase(data: ProjectDto) {
    if (data) {
        console.log(data)
    }

    const { img, stack, ...rest } = data

    const hasData =
        Object.keys(rest).length > 0 ||
        !!img ||
        (stack && stack.trim() !== '')

    if (!hasData) {
        throw new AppError('info', 'No se encontraron datos para crear un proyecto')
    }

    return await ProjectsService.create(data)
}