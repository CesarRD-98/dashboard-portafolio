'use client';

import { Section } from "@/app/components/layout/Section";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { InputFile } from "@/app/components/shared/forms/InputFile";
import { Select } from "@/app/components/shared/forms/Select";
import { Textarea } from "@/app/components/shared/forms/Textarea";
import { useToast } from "@/app/components/toast/toast.provider";
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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (image) {
            formData.append("image", image);
        }

        showToast({
            title: "Error",
            message: "Hubo un error al agregar el nuevo proyecto",
            type: "error",
        });
    };

    return (
        <Section id="new-project">
            {/* HEADER */}
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                    Nuevo Proyecto
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Agrega un nuevo proyecto a tu portafolio
                </p>
            </div>

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
                    />
                </Field>

                <Field label="Descripción">
                    <Textarea
                        rows={3}
                        value={form.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="Describe brevemente el proyecto"
                    />
                </Field>

                <Field label="Stack">
                    <Input
                        value={form.stack}
                        onChange={(e) => handleChange("stack", e.target.value)}
                        placeholder="React, Node.js, PostgreSQL..."
                    />
                </Field>

                <Field label="Rol">
                    <Select
                        value={form.role}
                        onChange={(e) => handleChange("role", e.target.value)}
                    >
                        <option value="">Selecciona un rol</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
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

                <InputFile
                    label="Imagen del proyecto"
                    helperText="JPG, PNG o GIF"
                    accept=".jpg,.jpeg,.png,.gif"
                    onFileSelect={setImage}
                />

                {/* ACTION */}
                <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                        Guardar proyecto
                    </button>
                </div>

            </form>
        </Section>
    );
}