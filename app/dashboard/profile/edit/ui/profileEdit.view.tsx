'use client'

import { Section } from "@/app/components/layout/Section"
import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit"
import { Field } from "@/app/components/shared/forms/Field"
import { Input } from "@/app/components/shared/forms/Input"
import { InputFile } from "@/app/components/shared/forms/InputFile"
import { Textarea } from "@/app/components/shared/forms/Textarea"
import { useToast } from "@/app/components/toast/toast.provider"
import { updateProfileAction } from "@/app/modules/profile/actions/profile.action"
import { Profile, ProfileDto } from "@/app/modules/profile/profile.model"
import { FormEvent, useEffect, useState } from "react"

type Props = {
    profile: Profile
}

export function ProfileEditView({ profile }: Props) {
    const { showToast } = useToast()
    const [initialForm, setInitialForm] = useState<Partial<ProfileDto> | null>(null)

    const [form, setForm] = useState<ProfileDto>({
        author: '',
        year: '',
        shortBio: '',
        tagLine: '',
        profession: '',
    })

    const [cv, setCv] = useState<File | null>(null)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleChange = <Key extends keyof ProfileDto>(field: Key, value: ProfileDto[Key]) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const hasChanges = initialForm ? Object.keys(form).some((key) => {
        const _key = key as keyof ProfileDto
        return (form[_key] ?? '') !== (initialForm[_key] ?? '')
    }) || avatar !== null || cv !== null
        : false

    const buildFormData = () => {
        if (!initialForm) return null

        const formData = new FormData();

        (Object.keys(form) as (keyof ProfileDto)[]).forEach((key) => {
            const current = form[key] ?? ''
            const initial = initialForm[key] ?? ''

            if (current !== initial) {
                formData.append(key, String(current))
            }
        })

        if (avatar) formData.append('avatar', avatar)
        if (cv) formData.append('cv', cv)

        return formData
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = buildFormData();
        if (!formData) return;

        try {
            setLoading(true);

            const result = await updateProfileAction(formData);

            if (!result.success) {
                showToast({
                    title: 'Error',
                    message: result.error?.message ?? 'Error desconocido',
                    type: result.error?.type ?? 'error'
                });
                return;
            }

            showToast({
                title: 'Éxito',
                message: 'Perfil actualizado exitosamente',
                type: 'success'
            });

            setCv(null)
            setAvatar(null)

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (profile) {
            const mapped: ProfileDto = {
                author: profile.author ?? '',
                year: profile.year?.toString() ?? '',
                shortBio: profile.shortBio ?? '',
                tagLine: profile.tagLine ?? '',
                profession: profile.profession ?? ''
            }

            setForm(mapped)
            setInitialForm(mapped)
        }
    }, [profile])

    return (
        <Section
            title="Editar perfil"
            description="Actualiza la información pública de tu portafolio"
        >

            {/* FORM CARD */}
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md flex flex-col gap-8"
            >

                {/* GRID */}
                <div className="grid gap-6 md:grid-cols-3">

                    <Field label="Autor">
                        <Input
                            value={form.author}
                            onChange={(e) => handleChange("author", e.target.value)}
                            placeholder="Tu nombre o alias"
                        />
                    </Field>

                    <Field label="Año">
                        <Input
                            inputMode="numeric"
                            pattern="[0-9]{4}"
                            maxLength={4}
                            value={form.year}
                            onChange={(e) => handleChange("year", e.target.value)}
                            placeholder="2026"
                        />
                    </Field>

                </div>

                {/* TEXTAREAS */}
                <div className="flex flex-col gap-6">

                    <Field label="Biografía corta">
                        <Textarea
                            rows={4}
                            value={form.shortBio}
                            onChange={(e) => handleChange("shortBio", e.target.value)}
                            placeholder="Resumen breve sobre ti"
                        />
                    </Field>

                    <Field label="Profesión">
                        <Input
                            value={form.profession}
                            onChange={(e) => handleChange("profession", e.target.value)}
                            placeholder="Desarrollador web"
                        />
                    </Field>

                    <Field label="Línea de etiqueta">
                        <Input
                            value={form.tagLine}
                            onChange={(e) => handleChange("tagLine", e.target.value)}
                            placeholder="¿Qué estás aprendiendo actualmente?"
                        />
                    </Field>

                </div>

                {/* FILES */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Field label="Avatar o Imagen de perfil">
                        <InputFile
                            helperText="JPG, PNG o GIF"
                            accept=".jpg,.jpeg,.png,.gif"
                            file={avatar}
                            onChange={setAvatar}
                        />
                    </Field>

                    <Field label="CV">
                        <InputFile
                            helperText="PDF o DOCX"
                            accept=".pdf,.doc,.docx"
                            file={cv}
                            onChange={setCv}
                        />
                    </Field>
                </div>

                <ButtonSubmit isValid={hasChanges && !loading} loading={loading} text="Guardar cambios"/>

            </form>
        </Section>
    )
}