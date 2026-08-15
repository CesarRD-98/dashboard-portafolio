'use client'

import { Section } from "@/app/components/layout/Section"
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit"
import { Field } from "@/app/components/shared/forms/Field"
import { Input } from "@/app/components/shared/forms/Input"
import { InputFile } from "@/app/components/shared/forms/InputFile"
import { Textarea } from "@/app/components/shared/forms/Textarea"
import { useToast } from "@/app/components/toast/toast.provider"
import { toFormData } from "@/app/lib/forms/zod"
import { updateProfileAction } from "@/app/modules/profile/actions/profile.action"
import { Profile } from "@/app/modules/profile/profile.model"
import { profileSchema, ProfileForm } from "@/app/modules/profile/profile.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

type Props = {
    profile: Profile
}

export function ProfileEditView({ profile }: Props) {
    const { showToast } = useToast()
    const { register, control, handleSubmit, reset, formState: { errors, isDirty, isSubmitting } } = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            author: profile.author,
            year: profile.year.toString(),
            shortBio: profile.shortBio,
            tagLine: profile.tagLine,
            profession: profile.profession,
        },
        mode: "onChange",
    });

    const onSubmit = async (values: ProfileForm) => {
            const response = await updateProfileAction(toFormData(values));

            if (!response.success) {
                showToast({
                    message: response.error.message,
                    type: response.error.type,
                });
                return;
            }

            showToast({
                message: 'Perfil actualizado correctamente',
                type: 'success'
            });

            reset({ ...values, avatar: undefined, cv: undefined })
    };

    return (
        <Section
            id="profile-edit"
            title="Editar perfil"
            description="Actualiza la información pública de tu portafolio"
        >

            {/* FORM CARD */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900/30 flex flex-col gap-8"
            >

                {/* GRID */}
                <div className="grid gap-6 md:grid-cols-3">

                    <Field label="Autor" error={errors.author?.message}>
                        <Input
                            {...register("author")}
                            error={!!errors.author}
                            placeholder="Tu nombre o alias"
                        />
                    </Field>

                    <Field label="Año" error={errors.year?.message}>
                        <Input
                            inputMode="numeric"
                            pattern="[0-9]{4}"
                            maxLength={4}
                            {...register("year")}
                            error={!!errors.year}
                            placeholder="2026"
                        />
                    </Field>

                </div>

                {/* TEXTAREAS */}
                <div className="flex flex-col gap-6">

                    <Field label="Biografía corta" error={errors.shortBio?.message}>
                        <Textarea
                            rows={4}
                            {...register("shortBio")}
                            error={!!errors.shortBio}
                            placeholder="Resumen breve sobre ti"
                        />
                    </Field>

                    <Field label="Profesión" error={errors.profession?.message}>
                        <Input
                            {...register("profession")}
                            error={!!errors.profession}
                            placeholder="Desarrollador web"
                        />
                    </Field>

                    <Field label="Línea de etiqueta" error={errors.tagLine?.message}>
                        <Input
                            {...register("tagLine")}
                            error={!!errors.tagLine}
                            placeholder="¿Qué estás aprendiendo actualmente?"
                        />
                    </Field>

                </div>

                {/* FILES */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Field label="Avatar o Imagen de perfil" error={errors.avatar?.message}>
                        <Controller
                            control={control}
                            name="avatar"
                            render={({ field }) => (
                                <InputFile
                                    helperText="JPG o PNG, hasta 5 MB"
                                    accept=".jpg,.jpeg,.png"
                                    file={field.value ?? null}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </Field>

                    <Field label="CV" error={errors.cv?.message}>
                        <Controller
                            control={control}
                            name="cv"
                            render={({ field }) => (
                                <InputFile
                                    helperText="PDF, hasta 5 MB"
                                    accept=".pdf"
                                    file={field.value ?? null}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </Field>
                </div>

                <div className="flex justify-start">
                    <ButtonSubmit
                        isValid={isDirty}
                        loading={isSubmitting}
                        text="Guardar cambios"
                        icon={<Save size={18} />}
                    />
                </div>

            </form>
        </Section>
    )
}
