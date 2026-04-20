'use client';

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { InputFile } from "@/app/components/shared/forms/InputFile";
import { Select } from "@/app/components/shared/forms/Select";
import { Textarea } from "@/app/components/shared/forms/Textarea";
import { useToast } from "@/app/components/toast/toast.provider";
import { createProjectAction } from "@/app/modules/projects/actions/projects.action";
import { FormEvent, useState } from "react";

type FormState = {
    title: string;
    description: string;
    stack: string;
    role: string;
    link: string;
};

export function ProjectNewView() {
    const { showToast } = useToast();
    const [loading, setLoading] = useState<boolean>(false);

    const [form, setForm] = useState<FormState>({
        title: "",
        description: "",
        stack: "",
        role: "",
        link: "",
    });

    const [image, setImage] = useState<File | null>(null);

    const handleChange = (key: keyof FormState, value: string) => {
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

    const isValid: boolean = Object.values(form).every((value) => value.trim().length > 0) && image !== null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = buildFormData();
        if (!formData) return;

        setLoading(true);

        try {
            const response = await createProjectAction(formData);

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
        setForm({
            title: "",
            description: "",
            stack: "",
            role: "",
            link: "",
        });
        setImage(null);
    };

    return (
        <Section
            title="Nuevo Proyecto"
            description="Agrega un nuevo proyecto a tu portafolio"
        >

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md flex flex-col gap-6"
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
                        <option value="">Selecciona un rol</option>
                        <option value="Desarrollador Frontend">Frontend</option>
                        <option value="Desarrollador Backend">Backend</option>
                        <option value="Desarrollador Fullstack">Fullstack</option>
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
                <ButtonSubmit isValid={isValid} loading={loading} text="Guardar nuevo proyecto" />

            </form>
        </Section>
    );
}