'use client'

import { Section } from "@/app/components/layout/Section"
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit"
import { Field } from "@/app/components/shared/forms/Field"
import { Input } from "@/app/components/shared/forms/Input"
import { InputFile } from "@/app/components/shared/forms/InputFile"
import { Select } from "@/app/components/shared/forms/Select"
import { Textarea } from "@/app/components/shared/forms/Textarea"
import { useToast } from "@/app/components/toast/toast.provider"
import { toFormData } from "@/app/lib/forms/zod"
import { updateProject } from "@/app/modules/projects/actions/projects.action"
import { Project, roleOptions } from "@/app/modules/projects/projects.model"
import { projectUpdateSchema, ProjectUpdateForm } from "@/app/modules/projects/projects.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

type Props = {
    project: Project
}

export function ProjectEditView({ project }: Props) {
    const { showToast } = useToast()
    const { register, control, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<ProjectUpdateForm>({
        resolver: zodResolver(projectUpdateSchema),
        defaultValues: {
            title: project.title,
            description: project.description,
            role: project.role as ProjectUpdateForm["role"],
            stack: project.stack.join(", "),
            link: project.link ?? "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values: ProjectUpdateForm) => {
            const response = await updateProject(project.id, toFormData(values))

            if (!response.success) {
                showToast({
                    title: "Error",
                    message: response.error.message,
                    type: response.error.type,
                });
                return;
            }

            showToast({
                title: "Éxito",
                message: "Proyecto actualizado correctamente",
                type: "success",
            });
    }

    return (
        <Section
            id="project-edit"
            title="Editar Proyecto"
            description="Actualiza información de tu proyecto"
        >

            {/* FORM */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 rounded-md border border-neutral-300 dark:border-neutral-700 
                bg-white dark:bg-neutral-900/30 flex flex-col gap-8"
            >

                {/* GRID */}
                <div className="grid gap-6 md:grid-cols-2">

                    <Field label="Título" error={errors.title?.message}>
                        <Input
                            {...register("title")}
                            error={!!errors.title}
                            placeholder="Nombre del proyecto"
                        />
                    </Field>

                    <Field label="Rol" error={errors.role?.message}>
                        <Select {...register("role")} error={!!errors.role}>
                            {roleOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.text}</option>
                            ))}
                        </Select>
                    </Field>

                </div>

                {/* DESCRIPTION */}
                <Field label="Descripción" error={errors.description?.message}>
                    <Textarea
                        rows={4}
                        {...register("description")}
                        error={!!errors.description}
                        placeholder="Describe el proyecto, funcionalidades, etc."
                    />
                </Field>

                {/* STACK */}
                <Field label="Tecnologías" error={errors.stack?.message}>
                    <Input
                        {...register("stack")}
                        error={!!errors.stack}
                        placeholder="React, Node, PostgreSQL..."
                    />
                </Field>

                {/* LINK */}
                <Field label="Enlace" error={errors.link?.message}>
                    <Input
                        {...register("link")}
                        error={!!errors.link}
                        placeholder="https://..."
                    />
                </Field>

                {/* IMAGE */}
                <Field label="Imagen de proyecto" error={errors.img?.message}>
                    <Controller
                        control={control}
                        name="img"
                        render={({ field }) => (
                            <InputFile
                                helperText="JPG o PNG, hasta 5 MB"
                                accept=".jpg,.jpeg,.png"
                                file={field.value ?? null}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Field>

                {/* ACTIONS */}
                <div className="flex justify-start">
                    <ButtonSubmit isValid={isDirty} loading={isSubmitting} text="Guardar cambios" icon={<Save size={16} />} />
                </div>

            </form>
        </Section>
    )
}
