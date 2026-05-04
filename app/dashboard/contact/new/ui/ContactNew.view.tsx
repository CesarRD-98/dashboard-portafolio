'use client'

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { Select } from "@/app/components/shared/forms/Select";
import { useToast } from "@/app/components/toast/toast.provider";
import { AppError } from "@/app/lib/errors/AppError";
import { createContact } from "@/app/modules/contacts/actions/contact.action";
import { categoryContact, ContactDto, requiredFieldsContact, typeContact } from "@/app/modules/contacts/contact.model";
import { FormEvent, useState } from "react";

export function ContactNewView() {
    const { showToast } = useToast();

    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState<ContactDto>({
        title: "",
        value: "",
        category: "",
        type: "",
        linkUrl: "",
        isPrimary: false,
    });

    const isFormValid: boolean = requiredFieldsContact.every((field) => {
        const value = form[field];
        return typeof value === "string" ? value.trim() !== "" : value !== undefined;
    });

    const handleChange = (key: keyof ContactDto, value: string | boolean) => {
        setForm((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const buildFormData = () => {
        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        return formData;
    };

    const handleReset = () => {
        setForm({ title: "", value: "", category: "", type: "", linkUrl: "", isPrimary: false, });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = buildFormData();
        if (!formData) return;

        try {
            setLoading(true);
            await createContact(formData);

            showToast({
                message: "Contacto creado correctamente",
                type: "success",
            })

            handleReset();

        } catch (error: unknown) {
            if (error instanceof AppError) {
                showToast({
                    message: error.message,
                    type: "error",
                })
            }

        } finally {
            setLoading(false);
        }

    }

    return (
        <Section
            id="contact-new"
            title="Nuevo contacto"
            description="Aquí podrás agregar un nuevo contacto para mostrar en tu portafolio."
        >
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 flex flex-col gap-6"
            >
                <Field label="Título" htmlFor="title">
                    <Input
                        id="title"
                        name="title"
                        placeholder="Ej: Correo electrónico, LinkedIn, GitHub, etc."
                        value={form.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                    />
                </Field>

                <Field label="Valor" htmlFor="value">
                    <Input
                        id="value"
                        name="value"
                        placeholder="Ej: email@example.com, +504 1234-5678, Username"
                        value={form.value}
                        onChange={(e) => handleChange("value", e.target.value)}
                    />
                </Field>

                <Field label="Enlace (opcional)" htmlFor="linkUrl">
                    <Input
                        id="linkUrl"
                        name="linkUrl"
                        placeholder="Ej: https://www.linkedin.com/in/username"
                        value={form.linkUrl}
                        onChange={(e) => handleChange("linkUrl", e.target.value)}
                    />
                </Field>

                <Field label="Categoría" htmlFor="category">
                    <Select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    >
                        {categoryContact.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field label="Tipo de contacto" htmlFor="type">
                    <Select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                    >
                        {typeContact.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field label="Es el contacto principal?" htmlFor="isPrimary">
                    <Select
                        id="isPrimary"
                        name="isPrimary"
                        value={String(form.isPrimary)}
                        onChange={(e) => handleChange("isPrimary", e.target.value === "true")}
                    >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </Select>
                </Field>

                <div>
                    <ButtonSubmit
                        isValid={isFormValid}
                        loading={loading}
                        text="Guardar contacto" />
                </div>
            </form>
        </Section>
    );
}