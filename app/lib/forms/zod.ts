import { z } from "zod";

import { AppError } from "@/app/lib/errors/AppError";

export function parseWithSchema<T>(schema: z.ZodType<T>, value: unknown): T {
    const result = schema.safeParse(value);

    if (!result.success) {
        throw new AppError("warning", result.error.issues[0]?.message ?? "Los datos no son válidos");
    }

    return result.data;
}

export function formDataToObject(formData: FormData): Record<string, FormDataEntryValue> {
    return Object.fromEntries(
        Array.from(formData.entries()).filter(([, value]) => !(value instanceof File && value.size === 0))
    );
}

export function toFormData<T extends object>(values: T): FormData {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
        if (value === undefined || value === null) continue;
        formData.append(key, value instanceof File ? value : String(value));
    }

    return formData;
}
