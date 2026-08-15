'use client';

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { InputFile } from "@/app/components/shared/forms/InputFile";
import { Select } from "@/app/components/shared/forms/Select";
import { Textarea } from "@/app/components/shared/forms/Textarea";
import { useToast } from "@/app/components/toast/toast.provider";
import { toFormData } from "@/app/lib/forms/zod";
import { createProject } from "@/app/modules/projects/actions/projects.action";
import { roleOptions } from "@/app/modules/projects/projects.model";
import { projectCreateSchema, ProjectCreateForm } from "@/app/modules/projects/projects.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

export function ProjectNewView() {
    const { showToast } = useToast();
    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm<ProjectCreateForm>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: { title: "", description: "", stack: "", role: undefined, link: "" },
        mode: "onChange",
    });

    const onSubmit = async (values: ProjectCreateForm) => {
            const response = await createProject(toFormData(values));

            if (!response.success) {
                showToast({
                    message: response.error.message,
                    type: response.error.type,
                });
                return;
            }

            showToast({
                message: "Proyecto creado correctamente",
                type: "success",
            });

            reset();
    };

    return (
        <Section
            id="project-new"
            title="Nuevo Proyecto"
            description="Agrega un nuevo proyecto a tu portafolio"
        >

            {/* FORM */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 rounded-md border border-neutral-300 dark:border-neutral-700 
                bg-white dark:bg-neutral-900/30 flex flex-col gap-6"
            >

                <Field label="Título" error={errors.title?.message}>
                    <Input
                        {...register("title")}
                        error={!!errors.title}
                        placeholder="Nombre del proyecto"
                        required
                    />
                </Field>

                <Field label="Descripción" error={errors.description?.message}>
                    <Textarea
                        rows={3}
                        {...register("description")}
                        error={!!errors.description}
                        placeholder="Describe brevemente el proyecto"
                        required
                    />
                </Field>

                <Field label="Tecnologías usadas" error={errors.stack?.message}>
                    <Input
                        {...register("stack")}
                        error={!!errors.stack}
                        placeholder="React, Node.js, PostgreSQL..."
                        required
                    />
                </Field>

                <Field label="Rol" error={errors.role?.message}>
                    <Select
                        {...register("role")}
                        error={!!errors.role}
                        required
                    >
                        {roleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field label="Enlace" error={errors.link?.message}>
                    <Input
                        type="url"
                        {...register("link")}
                        error={!!errors.link}
                        placeholder="https://..."
                    />
                </Field>

                <Field label="Imagen del proyecto" error={errors.img?.message}>
                    <Controller
                        control={control}
                        name="img"
                        render={({ field }) => (
                            <InputFile
                                file={field.value ?? null}
                                helperText="JPG o PNG, hasta 5 MB"
                                accept=".jpg,.jpeg,.png"
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Field>

                {/* ACTION */}
                <div className="flex justify-start">
                    <ButtonSubmit isValid={isValid} loading={isSubmitting} text="Guardar proyecto" icon={<Save size={18} />} />
                </div>

            </form>
        </Section>
    );
}
