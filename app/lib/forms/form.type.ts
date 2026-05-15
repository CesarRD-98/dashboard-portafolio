export type FieldType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'file'
    | 'json';

export type FieldConfig<
    T extends object,
    K extends keyof T
> = {
    key: K;
    type: FieldType;
};