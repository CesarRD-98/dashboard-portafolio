import { formDataParsers } from "./form.parsers";
import { FieldConfig } from "./form.type";

export function parseFormData<T extends object>(formData: FormData, config: FieldConfig<T, keyof T>[]): Partial<T> {

    const result: Partial<T> = {};

    for (const field of config) {

        const raw = formData.get(String(field.key));

        if (raw === null) {
            continue;
        }

        const parsed = formDataParsers[field.type](raw);

        if (parsed !== null) {
            result[field.key] = parsed as T[keyof T];
        }
    }

    return result;
}