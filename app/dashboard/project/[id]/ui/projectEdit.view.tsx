'use client'

import { Section } from "@/app/components/layout/Section"
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit"
import { Field } from "@/app/components/shared/forms/Field"
import { Input } from "@/app/components/shared/forms/Input"
import { InputFile } from "@/app/components/shared/forms/InputFile"
import { Textarea } from "@/app/components/shared/forms/Textarea"
import { useToast } from "@/app/components/toast/toast.provider"
import { updateProjectAction } from "@/app/modules/projects/actions/projects.action"
import { Project, ProjectDto } from "@/app/modules/projects/projects.model"
import { FormEvent, useEffect, useState } from "react"

type Props = {
    project: Project
}

export function ProjectEditView({ project }: Props) {
    const { showToast } = useToast()

    const [initialForm, setInitialForm] = useState<Partial<ProjectDto> | null>(null)

    const [form, setForm] = useState<Partial<ProjectDto>>({
        title: '',
        description: '',
        role: '',
        stack: '',
        link: ''
    })

    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = <K extends keyof ProjectDto>(field: K, value: ProjectDto[K]) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }))
    }


    const hasChanges = initialForm
        ? Object.keys(form).some(key => {
            const k = key as keyof ProjectDto
            return (form[k] ?? '') !== (initialForm[k] ?? '')
        }) || image !== null
        : false


    const buildFormData = () => {
        if (!initialForm) return null

        const formData = new FormData();

        (Object.keys(form) as (keyof ProjectDto)[]).forEach((key) => {
            const current = form[key] ?? ''
            const initial = initialForm[key] ?? ''

            if (current !== initial) {
                formData.append(key, current)
            }
        })

        if (image) formData.append('img', image)

        return formData
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const formData = buildFormData()
        if (!formData) return

        try {
            setLoading(true)

            const response = await updateProjectAction(project.id, formData)

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

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!project) return

        const mapped: Partial<ProjectDto> = {
            title: project.title ?? '',
            description: project.description ?? '',
            role: project.role ?? '',
            stack: project.stack.join(', ') ?? '',
            link: project.link ?? ''
        }

        setForm(mapped)
        setInitialForm(mapped)
    }, [project])

    return (
        <Section id="project-edit">

            {/* HEADER */}
            <div className="max-w-2xl space-y-1">
                <h1 className="text-3xl font-semibold text-neutral-900 dark:text-white">
                    Editar proyecto
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Actualiza la información de tu proyecto
                </p>
            </div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 
                bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md flex flex-col gap-8"
            >

                {/* GRID */}
                <div className="grid gap-6 md:grid-cols-2">

                    <Field label="Título">
                        <Input
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Nombre del proyecto"
                        />
                    </Field>

                    <Field label="Rol">
                        <Input
                            value={form.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            placeholder="Frontend, Backend, Fullstack..."
                        />
                    </Field>

                </div>

                {/* DESCRIPTION */}
                <Field label="Descripción">
                    <Textarea
                        rows={4}
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Describe el proyecto, funcionalidades, etc."
                    />
                </Field>

                {/* STACK */}
                <Field label="Tecnologías">
                    <Input
                        value={form.stack}
                        onChange={(e) => handleChange("stack", e.target.value)}
                        placeholder="React, Node, PostgreSQL..."
                    />
                </Field>

                {/* LINK */}
                <Field label="Enlace">
                    <Input
                        value={form.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                        placeholder="https://..."
                    />
                </Field>

                {/* IMAGE */}
                <Field label="Imagen de proyecto">
                    <InputFile
                        helperText="JPG o PNG"
                        accept=".jpg,.jpeg,.png"
                        file={image}
                        onChange={setImage}
                    />
                </Field>

                {/* ACTIONS */}
                <ButtonSubmit isValid={hasChanges} loading={loading} text="Guardar nuevos cambios" />

            </form>
        </Section>
    )
}