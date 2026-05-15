type FilesMap = Record<string, File | null>;

type BuildFormDataOptions<T extends object> = {
    current: Partial<T>;
    initial?: Partial<T>;
    files?: FilesMap;
};

export function buildFormData<T extends object>({ current, initial = {}, files = {} }: BuildFormDataOptions<T>) {

    const formData = new FormData();

    (Object.keys(current) as (keyof T)[]).forEach((key) => {
        const currentValue = current[key] ?? '';
        const initialValue = initial[key] ?? '';

        if (currentValue !== initialValue) {
            formData.append(String(key), String(currentValue));
        }
    });

    Object.entries(files).forEach(([key, file]) => {
        if (file) {
            formData.append(key, file);
        }
    });

    return formData;
}