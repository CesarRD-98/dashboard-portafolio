'use client';

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { InputFile } from "@/app/components/shared/forms/InputFile";
import { Select } from "@/app/components/shared/forms/Select";
import { Textarea } from "@/app/components/shared/forms/Textarea";
import { useToast } from "@/app/components/toast/toast.provider";
import { AppError } from "@/app/lib/errors/AppError";
import { buildFormData } from "@/app/lib/forms/buildFormData";
import { createProject } from "@/app/modules/projects/actions/projects.action";
import { initialProjectForm, ProjectDto, requiredFieldsProject, roleOptions } from "@/app/modules/projects/projects.model";
import { Save } from "lucide-react";
import { FormEvent, useState } from "react";

export function ProjectNewView() {
    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const [form, setForm] = useState<ProjectDto>(initialProjectForm);
    const [image, setImage] = useState<File | null>(null);

    const isFormValid: boolean = requiredFieldsProject.every((field) => {
        const value = form[field];
        return typeof value === "string" && value.trim() !== "";
    }) && (image !== null);

    const handleChange = (key: keyof ProjectDto, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = buildFormData<ProjectDto>({
            current: form,
            files: { img: image }
        })

        if (!formData) return;

        setLoading(true);

        try {
            await createProject(formData);
            showToast({
                message: "Proyecto creado correctamente",
                type: "success",
            });

            resetForm();
        } catch (error: unknown) {
            if (error instanceof AppError) {
                showToast({
                    message: error.message,
                    type: error.type,
                });
            }
        } finally {
            setLoading(false);
        }
    };


    const resetForm = () => {
        setForm(initialProjectForm);
        setImage(null);
    };

    return (
        <Section
            id="project-new"
            title="Nuevo Proyecto"
            description="Agrega un nuevo proyecto a tu portafolio"
        >

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-md border border-neutral-300 dark:border-neutral-700 
                bg-white dark:bg-neutral-900/30 flex flex-col gap-6"
            >

                <Field label="Título">
                    <Input
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Nombre del proyecto"
                        required
                    />
                </Field>

                <Field label="Descripción">
                    <Textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Describe brevemente el proyecto"
                        required
                    />
                </Field>

                <Field label="Tecnologías usadas">
                    <Input
                        value={form.stack}
                        onChange={(e) => handleChange("stack", e.target.value)}
                        placeholder="React, Node.js, PostgreSQL..."
                        required
                    />
                </Field>

                <Field label="Rol">
                    <Select
                        value={form.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                        required
                    >
                        {roleOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field label="Enlace">
                    <Input
                        type="url"
                        value={form.link}
                        onChange={(e) => handleChange("link", e.target.value)}
                        placeholder="https://..."
                    />
                </Field>

                <Field label="Imagen del proyecto">
                    <InputFile
                        file={image}
                        helperText="JPG, PNG o GIF"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={setImage}
                    />
                </Field>

                {/* ACTION */}
                <div className="flex justify-start">
                    <ButtonSubmit isValid={isFormValid} loading={loading} text="Guardar proyecto" icon={<Save size={18} />} />
                </div>

            </form>
        </Section>
    );
}