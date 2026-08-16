import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Introduce un correo electrónico válido").trim(),
    password: z.string().min(1, "La contraseña es obligatoria").max(256, "La contraseña es demasiado larga"),
});

export type LoginDto = z.infer<typeof loginSchema>;
