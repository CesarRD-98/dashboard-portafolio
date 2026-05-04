'use client';

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { InputFile } from "@/app/components/shared/forms/InputFile";
import { Select } from "@/app/components/shared/forms/Select";
import { Textarea } from "@/app/components/shared/forms/Textarea";
import { useToast } from "@/app/components/toast/toast.provider";
import { createProject } from "@/app/modules/projects/actions/projects.action";
import { ProjectDto, requiredFieldsProject, roleOptions } from "@/app/modules/projects/projects.model";
import { Save } from "lucide-react";
import { FormEvent, useState } from "react";

export function ProjectNewView() {
    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const [form, setForm] = useState<ProjectDto>({
        title: "",
        description: "",
        stack: "",
        role: "",
        link: "",
    });

    const [image, setImage] = useState<File | null>(null);

    const handleChange = (key: keyof ProjectDto, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const buildFormData = () => {
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (image) {
            formData.append("img", image);
        }

        return formData;
    };

    const isFormValid: boolean = requiredFieldsProject.every((field) => {
        const value = form[field];
        return typeof value === "string" ? value.trim() !== "" : value !== undefined;
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = buildFormData();
        if (!formData) return;

        setLoading(true);

        try {
            const response = await createProject(formData);

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
                message: "Proyecto creado correctamente",
                type: "success",
            });

            resetForm();

        } finally {
            setLoading(false);
        }
    };


    const resetForm = () => {
        setForm({ title: "", description: "", stack: "", role: "", link: "", });
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
                className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md flex flex-col gap-6"
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

                <Field label="Stack">
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
                <div className="flex justify-end">
                    <ButtonSubmit isValid={isFormValid} loading={loading} text="Guardar proyecto" icon={<Save size={18} />} />
                </div>

            </form>
        </Section>
    );
}