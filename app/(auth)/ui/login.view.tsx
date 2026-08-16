'use client'

import { ButtonSubmit } from "@/app/components/shared/forms/ButtonSubmit"
import { Field } from "@/app/components/shared/forms/Field"
import { Input } from "@/app/components/shared/forms/Input"
import { ShowPassword } from "@/app/components/shared/forms/ShowPassword"
import { useToast } from "@/app/components/toast/toast.provider"
import { AppError } from "@/app/lib/errors/AppError"
import { AuthService } from "@/app/modules/auth/auth.service"
import { loginSchema, LoginDto } from "@/app/modules/auth/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaRightToBracket } from "react-icons/fa6"
import { useForm } from "react-hook-form"

export function LoginView() {
    const { showToast } = useToast()
    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid } } = useForm<LoginDto>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
        mode: "onChange",
    });

    const onSubmit = async (values: LoginDto) => {
        try {
            await AuthService.login(values)

            reset()
            router.push('/dashboard')

        } catch (error: unknown) {
            if (error instanceof AppError) {
                showToast({
                    type: error.type,
                    title: 'Error',
                    message: error.message
                })
            }
        }
    }


    return (
        <div className="min-h-screen px-4 flex items-center justify-center">

            {/* CARD */}
            <div className="w-full max-w-md p-8 rounded-md flex flex-col gap-6 
                bg-white dark:bg-neutral-900/30 
                border border-neutral-300 dark:border-neutral-700">

                {/* HEADER */}
                <div>
                    <h1 className="text-xl font-semibold">
                        Acceso administrador
                    </h1>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        Verifica tu identidad para continuar
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                    {/* EMAIL */}
                    <Field label="Correo electrónico" htmlFor="email" error={errors.email?.message}>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email")}
                            error={!!errors.email}
                        />
                    </Field>

                    {/* PASSWORD */}
                    <Field label="Contraseña" htmlFor="password" error={errors.password?.message}>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            {...register("password")}
                            error={!!errors.password}
                        />
                        <ShowPassword showPassword={showPassword} handleToggle={setShowPassword} />
                    </Field>

                    {/* BUTTON */}
                    <ButtonSubmit
                        isValid={isValid}
                        loading={isSubmitting}
                        text="Verificar"
                        icon={<FaRightToBracket />}
                    />

                </form>
            </div>

        </div>
    )
}
