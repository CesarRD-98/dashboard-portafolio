export type FieldType = 'string' | 'number' | 'boolean' | 'file';

export type FieldConfig<T, K extends keyof T> = {
    key: K;
    type: FieldType;
};

export function mapFormData<T extends object>(formData: FormData, config: FieldConfig<T, keyof T>[]): Partial<T> {

    const result: Partial<T> = {};

    for (const field of config) {
        const raw = formData.get(field.key as string);

        if (raw === null) continue;

        switch (field.type) {
            case 'string':
                result[field.key] = String(raw) as T[keyof T];
                break;

            case 'number': {
                const num = Number(raw);
                if (!isNaN(num)) {
                    result[field.key] = num as T[keyof T];
                }
                break;
            }

            case 'boolean':
                result[field.key] = (raw === 'true') as T[keyof T];
                break;

            case 'file':
                if (raw instanceof File && raw.size > 0) {
                    result[field.key] = raw as T[keyof T];
                }
                break;
        }
    }

    return result;
}