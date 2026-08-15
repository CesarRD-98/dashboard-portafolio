'use client'

import { Section } from "@/app/components/layout/Section";
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit";
import { Field } from "@/app/components/shared/forms/Field";
import { Input } from "@/app/components/shared/forms/Input";
import { Select } from "@/app/components/shared/forms/Select";
import { useToast } from "@/app/components/toast/toast.provider";
import { toFormData } from "@/app/lib/forms/zod";
import { createContact } from "@/app/modules/contacts/actions/contact.action";
import { contactSchema, ContactForm } from "@/app/modules/contacts/contact.schema";
import { categoryContact, typeContact } from "@/app/modules/contacts/contact.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ContactNewView() {
    const { showToast } = useToast();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm<ContactForm>({
        resolver: zodResolver(contactSchema),
        defaultValues: { title: "", value: "", category: undefined, type: undefined, linkUrl: "", isPrimary: false },
        mode: "onChange",
    });

    const onSubmit = async (values: ContactForm) => {
            const response = await createContact(toFormData(values));

            if (!response.success) {
                showToast({
                    message: response.error.message,
                    type: response.error.type,
                });
                return;
            }

            showToast({
                message: "Contacto creado correctamente",
                type: "success",
            })

            reset();
    };

    return (
        <Section
            id="contact-new"
            title="Nuevo contacto"
            description="Aquí podrás agregar un nuevo contacto para mostrar en tu portafolio."
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/30 flex flex-col gap-6"
            >
                <Field label="Título" htmlFor="title" error={errors.title?.message}>
                    <Input
                        id="title"
                        placeholder="Ej: Correo electrónico, LinkedIn, GitHub, etc."
                        {...register("title")}
                        error={!!errors.title}
                    />
                </Field>

                <Field label="Valor" htmlFor="value" error={errors.value?.message}>
                    <Input
                        id="value"
                        placeholder="Ej: email@example.com, +504 1234-5678, Username"
                        {...register("value")}
                        error={!!errors.value}
                    />
                </Field>

                <Field label="Enlace (opcional)" htmlFor="linkUrl" error={errors.linkUrl?.message}>
                    <Input
                        id="linkUrl"
                        placeholder="Ej: https://www.linkedin.com/in/username"
                        {...register("linkUrl")}
                        error={!!errors.linkUrl}
                    />
                </Field>

                <Field label="Categoría" htmlFor="category" error={errors.category?.message}>
                    <Select
                        id="category"
                        {...register("category")}
                        error={!!errors.category}
                    >
                        {categoryContact.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field label="Tipo de contacto" htmlFor="type" error={errors.type?.message}>
                    <Select
                        id="type"
                        {...register("type")}
                        error={!!errors.type}
                    >
                        {typeContact.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field label="Es el contacto principal?" htmlFor="isPrimary" error={errors.isPrimary?.message}>
                    <Select
                        id="isPrimary"
                        {...register("isPrimary", { setValueAs: (value) => value === "true" })}
                    >
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </Select>
                </Field>

                <div>
                    <ButtonSubmit
                        isValid={isValid}
                        loading={isSubmitting}
                        text="Guardar contacto" />
                </div>
            </form>
        </Section>
    );
}
