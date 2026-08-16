import { z } from "zod";

const contactFields = {
    title: z.string().trim().min(1, "El título es obligatorio").max(80, "El título no puede superar 80 caracteres"),
    value: z.string().trim().min(1, "El valor es obligatorio").max(200, "El valor no puede superar 200 caracteres"),
    category: z.enum(["direct", "social", "other"], { message: "Selecciona una categoría válida" }),
    type: z.enum(["email", "phone", "linkedin", "github", "facebook"], { message: "Selecciona un tipo válido" }),
    linkUrl: z.union([z.literal(""), z.url("Introduce una URL válida")]),
    isPrimary: z.boolean(),
};

export const contactSchema = z.object(contactFields);
export const contactFormDataSchema = z.object({
    ...contactFields,
    isPrimary: z.enum(["true", "false"]).transform((value) => value === "true"),
});

export type ContactForm = z.infer<typeof contactSchema>;
