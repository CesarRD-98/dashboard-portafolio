import { ProjectsService } from "@/app/modules/projects/projects.service"
import { ProjectView } from "./ui/project.view"

export const metadata = {
    title: 'Inicio | Proyectos'
}

export default async function ProjectPage() {
    const data = await ProjectsService.getAll()
    return <ProjectView projects={data} />
}