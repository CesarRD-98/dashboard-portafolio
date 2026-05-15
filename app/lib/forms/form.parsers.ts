import { FieldType } from "./form.type";

type Parser = (
    value: FormDataEntryValue
) => unknown;

export const formDataParsers:
    Record<FieldType, Parser> = {

    string: (value) => {
        return String(value);
    },

    number: (value) => {

        const number = Number(value);

        return isNaN(number)
            ? null
            : number;
    },

    boolean: (value) => {
        return value === 'true';
    },

    file: (value) => {

        if (
            value instanceof File &&
            value.size > 0
        ) {
            return value;
        }

        return null;
    },

    json: (value) => {

        try {
            return JSON.parse(
                String(value)
            );
        } catch {
            return null;
        }
    },
};