'use client';

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { Select } from "@/app/components/shared/forms/Select";
import { useToast } from "@/app/components/toast/toast.provider";
import { toFormData } from "@/app/lib/forms/zod";
import { updateContact } from "@/app/modules/contacts/actions/contact.action";
import { contactSchema, ContactForm } from "@/app/modules/contacts/contact.schema";
import { categoryContact, Contact, typeContact } from "@/app/modules/contacts/contact.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

type Props = {
    contact: Contact
};

export function ContactEditView({ contact }: Props) {
    const { showToast } = useToast();
    const { register, handleSubmit, formState: { errors, isDirty, isSubmitting } } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            title: contact.title,
            value: contact.value,
            category: contact.category as ContactForm["category"],
            type: contact.type as ContactForm["type"],
            linkUrl: contact.linkUrl ?? "",
            isPrimary: contact.isPrimary,
        },
        mode: "onChange",
    });

    const onSubmit = async (values: ContactForm) => {
            const response = await updateContact(contact.id, toFormData(values));

            if (!response.success) {
                showToast({
                    message: response.error.message,
                    type: response.error.type,
                });
                return;
            }

            showToast({
                message: "Contacto actualizado correctamente",
                type: "success",
            });
    };

    return (
        <Section
            id="contact-edit"
            title="Editar Contacto"
            description="Actualiza información de tu contacto"
        >

            {/* FORM */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 rounded-md border border-neutral-300 dark:border-neutral-700 
                        bg-white dark:bg-neutral-900/30 flex flex-col gap-8"
            >

                {/* GRID */}
                <div className="grid gap-6 md:grid-cols-2">

                    <Field label="Título" htmlFor="title" error={errors.title?.message}>
                        <Input
                            id="title"
                            {...register("title")}
                            error={!!errors.title}
                            placeholder="Nombre del proyecto"
                        />
                    </Field>

                    <Field label="Valor" htmlFor="value" error={errors.value?.message}>
                        <Input
                            id="value"
                            {...register("value")}
                            error={!!errors.value}
                            placeholder="Ej: email@ejemplo.com, +504-3456-7890, https://linkedin.com/in/nombre, https://github.com/nombre..."
                        />
                    </Field>

                </div>

                {/* CATEGORY */}
                <Field label="Categoría" htmlFor="category" error={errors.category?.message}>
                    <Select
                        id="category"
                        {...register("category")}
                        error={!!errors.category}
                    >
                        {categoryContact.map(({ value, text }) => (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        ))}
                    </Select>
                </Field>

                {/* TYPE */}
                <Field label="Tipo de Contacto" htmlFor="type" error={errors.type?.message}>
                    <Select
                        id="type"
                        {...register("type")}
                        error={!!errors.type}
                    >
                        {typeContact.map(({ value, text }) => (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        ))}
                    </Select>
                </Field>

                {/* LINK */}
                <Field label="Enlace" htmlFor="linkUrl" error={errors.linkUrl?.message}>
                    <Input
                        id="linkUrl"
                        {...register("linkUrl")}
                        error={!!errors.linkUrl}
                        placeholder="https://..."
                    />
                </Field>

                {/* IS PRIMARY */}
                <Field label="Es contacto principal?" htmlFor="isPrimary" error={errors.isPrimary?.message}>
                    <Select
                        id="isPrimary"
                        {...register("isPrimary", { setValueAs: (value) => value === "true" })}
                    >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </Select>
                </Field>

                {/* ACTIONS */}
                <div className="flex justify-start">
                    <ButtonSubmit isValid={isDirty} loading={isSubmitting} text="Guardar cambios" icon={<Save size={16} />} />
                </div>

            </form>
        </Section>
    );
}
