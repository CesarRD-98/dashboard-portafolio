'use client'

import { Section } from "@/app/components/layout/Section"
import { Field } from "@/app/components/shared/forms/Field"
import { Input } from "@/app/components/shared/forms/Input"
import { InputFile } from "@/app/components/shared/forms/InputFile"
import { Textarea } from "@/app/components/shared/forms/Textarea"
import { useToast } from "@/app/components/toast/toast.provider"
import { Spinner } from "@/app/components/ui/spinner/Spinner"
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
        fullBio: '',
        learningFocus: '',
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
                fullBio: profile.fullBio ?? '',
                learningFocus: profile.learningFocus ?? ''
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
                            rows={2}
                            value={form.shortBio}
                            onChange={(e) => handleChange("shortBio", e.target.value)}
                            placeholder="Resumen breve sobre ti"
                        />
                    </Field>

                    <Field label="Biografía completa">
                        <Textarea
                            rows={4}
                            value={form.fullBio}
                            onChange={(e) => handleChange("fullBio", e.target.value)}
                            placeholder="Describe tu experiencia, stack y trayectoria"
                        />
                    </Field>

                    <Field label="Enfoque">
                        <Textarea
                            rows={2}
                            value={form.learningFocus}
                            onChange={(e) => handleChange("learningFocus", e.target.value)}
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

                {/* ACTIONS */}
                <div className="flex justify-end pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    <button
                        type="submit"
                        disabled={!hasChanges}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                            ${hasChanges
                                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-sm hover:shadow-md cursor-pointer"
                                : "bg-neutral-200 dark:bg-neutral-700 text-neutral-400 cursor-not-allowed"}`}
                    >
                        {loading ? (
                            <Spinner />
                        ) : (
                            "Guardar cambios"
                        )}
                    </button>
                </div>

            </form>
        </Section>
    )
}