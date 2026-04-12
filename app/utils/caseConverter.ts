type CamelCase<S extends string> =
    S extends `${infer P}_${infer C}${infer R}`
    ? `${P}${Uppercase<C>}${CamelCase<R>}`
    : S;

type SnakeCase<S extends string> =
    S extends `${infer P}${infer C}`
    ? C extends Lowercase<C>
    ? `${P}${C}`
    : `${P}_${Lowercase<C>}`
    : S;

type CamelCaseObject<T> = {
    [K in keyof T as CamelCase<string & K>]:
    T[K] extends Array<infer U>
    ? CamelCaseObject<U>[]
    : T[K] extends object
    ? CamelCaseObject<T[K]>
    : T[K];
};

type SnakeCaseObject<T> = {
    [K in keyof T as SnakeCase<string & K>]:
    T[K] extends Array<infer U>
    ? SnakeCaseObject<U>[]
    : T[K] extends object
    ? SnakeCaseObject<T[K]>
    : T[K];
};

type AnyObject = Record<string, unknown>;

export function toCamelCase<T>(obj: T): CamelCaseObject<T> {
    if (Array.isArray(obj)) {
        return obj.map((v) => toCamelCase(v)) as CamelCaseObject<T>;
    }

    if (obj !== null && typeof obj === "object") {
        const result: AnyObject = {};

        for (const key in obj as AnyObject) {
            const camelKey = key.replace(/_([a-z])/g, (_, c) =>
                c.toUpperCase()
            );

            result[camelKey] = toCamelCase((obj as AnyObject)[key]);
        }

        return result as CamelCaseObject<T>;
    }

    return obj as CamelCaseObject<T>;
}

export function toSnakeCase<T>(obj: T): SnakeCaseObject<T> {
    if (Array.isArray(obj)) {
        return obj.map((v) => toSnakeCase(v)) as SnakeCaseObject<T>;
    }

    if (obj !== null && typeof obj === "object") {
        const result: AnyObject = {};

        for (const key in obj as AnyObject) {
            const snakeKey = key.replace(/[A-Z]/g, (letter) =>
                `_${letter.toLowerCase()}`
            );

            result[snakeKey] = toSnakeCase((obj as AnyObject)[key]);
        }

        return result as SnakeCaseObject<T>;
    }

    return obj as SnakeCaseObject<T>;
}