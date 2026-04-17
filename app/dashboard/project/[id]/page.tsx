import { ProjectEditView } from "./ui/projectEdit.view";
import { ProjectsService } from "@/app/modules/projects/projects.service";

export const metadata = {
    title: 'Editar proyecto | Proyectos'
}

export default async function ProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const data = await ProjectsService.getOne(id)

    return <ProjectEditView project={data} />;
}