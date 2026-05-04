'use client'

import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit"
import { Field } from "@/app/components/shared/forms/Field"
import { Input } from "@/app/components/shared/forms/Input"
import { InputPassword } from "@/app/components/shared/forms/InputPassword"
import { useToast } from "@/app/components/toast/toast.provider"
import { AppError } from "@/app/lib/errors/AppError"
import { LoginDto } from "@/app/modules/auth/auth.model"
import { AuthService } from "@/app/modules/auth/auth.service"
import { isEmail } from "@/app/utils/isEmail"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { FaRightToBracket } from "react-icons/fa6"

export function LoginView() {
    const { showToast } = useToast()
    const router = useRouter();

    const [form, setForm] = useState<LoginDto>({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const isValid = form.email.trim() !== '' && form.password.trim() !== '' && isEmail(form.email)

    const handleChange = (key: keyof LoginDto, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!isValid) return

        try {
            setLoading(true)
            const success = await AuthService.login(form)

            if (success) {
                setForm({ email: '', password: '' })
                router.push('/dashboard')
            }

        } catch (error: unknown) {
            if (error instanceof AppError) {
                showToast({
                    type: error.type,
                    title: 'Error',
                    message: error.message
                })
            }
        } finally {
            setLoading(false)
        }

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900 px-4">

            {/* CARD */}
            <div className="w-full max-w-md p-8 rounded-md border border-neutral-200 dark:border-neutral-700
                    bg-white dark:bg-neutral-900 shadow-sm flex flex-col gap-6">

                {/* HEADER */}
                <div>
                    <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
                        Acceso administrador
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Verifica tu identidad para continuar
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">

                    {/* EMAIL */}
                    <Field label="Correo electrónico">
                        <Input
                            id="email"
                            name="email"
                            type="email" value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Field>

                    {/* PASSWORD */}
                    <Field label="Contraseña">
                        <InputPassword
                            id="password"
                            value={form.password}
                            showPassword={showPassword}
                            onChange={(value) => handleChange('password', value)}
                            setShowPassword={setShowPassword}
                        />
                    </Field>

                    {/* ERROR */}
                    {!isEmail(form.email) && form.email.trim() !== '' && (
                        <p className="text-sm text-red-500">Formato de correo no válido</p>
                    )}

                    {/* BUTTON */}
                    <ButtonSubmit
                        isValid={isValid}
                        loading={loading}
                        text="Verificar"
                        icon={<FaRightToBracket />}
                    />

                </form>
            </div>

        </div>
    )
}