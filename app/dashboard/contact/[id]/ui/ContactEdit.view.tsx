'use client';

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { Select } from "@/app/components/shared/forms/Select";
import { useToast } from "@/app/components/toast/toast.provider";
import { AppError } from "@/app/lib/errors/AppError";
import { updateContact } from "@/app/modules/contacts/actions/contact.action";
import { categoryContact, Contact, ContactDto, initialContactForm, typeContact } from "@/app/modules/contacts/contact.model";
import { Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

type Props = {
    contact: Contact
};

export function ContactEditView({ contact }: Props) {
    const { showToast } = useToast();

    const [loading, setLoading] = useState<boolean>(false);
    const [initialForm, setInitialForm] = useState<Partial<ContactDto> | null>(null);
    const [form, setForm] = useState<ContactDto>(initialContactForm);

    const handleChange = (key: keyof ContactDto, value: string | boolean) => {
        setForm((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    const hasChanges = initialForm
        ? Object.keys(form).some(key => {
            const k = key as keyof ContactDto;
            return (form[k] ?? '') !== (initialForm[k] ?? '');
        })
        : false;

    const buildFormData = () => {
        if (!initialForm) return null;
        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            const k = key as keyof ContactDto;
            const current = form[k] ?? '';
            const initial = initialForm[k] ?? '';

            if (current !== initial) {
                formData.append(key, String(current));
            }
        });
        return formData;
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = buildFormData();
        if (!formData) return;

        try {
            setLoading(true);
            await updateContact(contact.id, formData);

            showToast({
                message: "Contacto actualizado correctamente",
                type: "success",
            });

        } catch (error: unknown) {
            if (error instanceof AppError) {
                showToast({
                    message: error.message,
                    type: error.type
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!contact) return;
        const mapped: Partial<ContactDto> = {
            ...contact
        };

        setInitialForm(mapped);
        setForm(mapped);
    }, [contact]);

    return (
        <Section
            id="contact-edit"
            title="Editar Contacto"
            description="Actualiza información de tu contacto"
        >

            {/* FORM */}
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-md border border-neutral-300 dark:border-neutral-700 
                        bg-white dark:bg-neutral-900/30 flex flex-col gap-8"
            >

                {/* GRID */}
                <div className="grid gap-6 md:grid-cols-2">

                    <Field label="Título" htmlFor="title">
                        <Input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Nombre del proyecto"
                        />
                    </Field>

                    <Field label="Valor" htmlFor="value">
                        <Input
                            id="value"
                            name="value"
                            value={form.value}
                            onChange={(e) => handleChange("value", e.target.value)}
                            placeholder="Ej: email@ejemplo.com, +504-3456-7890, https://linkedin.com/in/nombre, https://github.com/nombre..."
                        />
                    </Field>

                </div>

                {/* CATEGORY */}
                <Field label="Categoría" htmlFor="category">
                    <Select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                    >
                        {categoryContact.map(({ value, text }) => (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        ))}
                    </Select>
                </Field>

                {/* TYPE */}
                <Field label="Tipo de Contacto" htmlFor="type">
                    <Select
                        id="type"
                        name="type"
                        value={form.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                    >
                        {typeContact.map(({ value, text }) => (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        ))}
                    </Select>
                </Field>

                {/* LINK */}
                <Field label="Enlace" htmlFor="linkUrl">
                    <Input
                        id="linkUrl"
                        name="linkUrl"
                        value={form.linkUrl}
                        onChange={(e) => handleChange("linkUrl", e.target.value)}
                        placeholder="https://..."
                    />
                </Field>

                {/* IS PRIMARY */}
                <Field label="Es contacto principal?" htmlFor="isPrimary">
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

                {/* ACTIONS */}
                <div className="flex justify-start">
                    <ButtonSubmit isValid={hasChanges} loading={loading} text="Guardar cambios" icon={<Save size={16} />} />
                </div>

            </form>
        </Section>
    );
}