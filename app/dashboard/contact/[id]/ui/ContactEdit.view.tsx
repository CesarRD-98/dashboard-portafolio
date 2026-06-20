'use client';

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { Select } from "@/app/components/shared/forms/Select";
import { useToast } from "@/app/components/toast/toast.provider";
import { AppError } from "@/app/lib/errors/AppError";
import { Contact, ContactDto, initialContactForm } from "@/app/modules/contacts/contact.model";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true);
            // await ContactService.updateContact(contact.id, form);
            showToast({
                message: "Contacto actualizado correctamente",
                type: "success",
            });

            handleReset();
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

    const handleReset = () => {
        setForm(initialContactForm);
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

                    <Field label="Título">
                        <Input
                            value={form.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            placeholder="Nombre del proyecto"
                        />
                    </Field>

                    <Field label="Valor">
                        <Input
                            value={form.value}
                            onChange={(e) => handleChange("value", e.target.value)}
                            placeholder="Frontend, Backend, Fullstack..."
                        />
                    </Field>

                </div>

                {/* DESCRIPTION */}
                <Field label="Categoría">
                    <Input
                        value={form.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        placeholder="Frontend, Backend, Fullstack..."
                    />
                </Field>

                {/* STACK */}
                <Field label="Tipo de Contacto">
                    <Input
                        value={form.type}
                        onChange={(e) => handleChange("type", e.target.value)}
                        placeholder="React, Node, PostgreSQL..."
                    />
                </Field>

                {/* LINK */}
                <Field label="Enlace">
                    <Input
                        value={form.linkUrl}
                        onChange={(e) => handleChange("linkUrl", e.target.value)}
                        placeholder="https://..."
                    />
                </Field>

                {/* IMAGE */}
                <Field label="Es contacto principal?">
                    <Select>
                        <option>Selecciona</option>
                        <option>Si</option>
                        <option>No</option>
                    </Select>
                </Field>

                {/* ACTIONS */}
                <div className="flex justify-start">
                    <ButtonSubmit isValid={true} loading={loading} text="Guardar cambios" icon={<Save size={16} />} />
                </div>

            </form>
        </Section>
    );
}