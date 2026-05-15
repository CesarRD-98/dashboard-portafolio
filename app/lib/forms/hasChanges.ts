type FilesMap = Record<string, File | null>;

type HasChangesOptions<T extends object> = {
    current: Partial<T>;
    initial: Partial<T>;
    files?: FilesMap;
};

export function hasChanges<T extends object>({ current, initial, files = {}, }: HasChangesOptions<T>) {

    const formChanged = (Object.keys(current) as (keyof T)[]).some((key) => {

        return (
            (current[key] ?? '') !== (initial[key] ?? '')
        );
    });

    const filesChanged = Object.values(files).some(Boolean);

    return (
        formChanged || filesChanged
    );
}