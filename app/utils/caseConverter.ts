/* -------------------------------------------------------------------------------------------------
 * case-converter.ts
 * -------------------------------------------------------------------------------------------------
 * Senior-level deep case conversion utility
 *
 * Features:
 * - camelCase
 * - PascalCase
 * - snake_case
 * - kebab-case
 * - UPPER_SNAKE_CASE
 * - Deep object conversion
 * - Array support
 * - Circular reference protection
 * - Plain object protection
 * - Acronym-aware tokenization
 * - Strong TypeScript inference
 * ------------------------------------------------------------------------------------------------- */
type AnyFunction = (...args: never[]) => unknown;

type Primitive =
    | string
    | number
    | boolean
    | bigint
    | symbol
    | null
    | undefined;

type Builtin =
    | Date
    | RegExp
    | AnyFunction
    | Promise<unknown>
    | Map<unknown, unknown>
    | Set<unknown>
    | WeakMap<object, unknown>
    | WeakSet<object>;

type AnyObject = Record<PropertyKey, unknown>;

/* -------------------------------------------------------------------------------------------------
 * STRING TYPES
 * ------------------------------------------------------------------------------------------------- */

type SplitWords<S extends string> =
    S extends `${infer Head}_${infer Tail}`
    ? [...SplitWords<Head>, ...SplitWords<Tail>]
    : S extends `${infer Head}-${infer Tail}`
    ? [...SplitWords<Head>, ...SplitWords<Tail>]
    : S extends `${infer Head} ${infer Tail}`
    ? [...SplitWords<Head>, ...SplitWords<Tail>]
    : [Lowercase<S>];

type CapitalizeWords<
    Words extends string[],
    Result extends string = "",
> = Words extends [infer First extends string, ...infer Rest extends string[]]
    ? CapitalizeWords<
        Rest,
        `${Result}${Capitalize<Lowercase<First>>}`
    >
    : Result;

type JoinSnake<
    Words extends string[],
    Result extends string = "",
> = Words extends [infer First extends string, ...infer Rest extends string[]]
    ? JoinSnake<
        Rest,
        Result extends ""
        ? Lowercase<First>
        : `${Result}_${Lowercase<First>}`
    >
    : Result;

type JoinKebab<
    Words extends string[],
    Result extends string = "",
> = Words extends [infer First extends string, ...infer Rest extends string[]]
    ? JoinKebab<
        Rest,
        Result extends ""
        ? Lowercase<First>
        : `${Result}-${Lowercase<First>}`
    >
    : Result;

export type CamelCase<S extends string> =
    SplitWords<S> extends [
        infer First extends string,
        ...infer Rest extends string[],
    ]
    ? `${Lowercase<First>}${CapitalizeWords<Rest>}`
    : S;

export type PascalCase<S extends string> =
    CapitalizeWords<SplitWords<S>>;

export type SnakeCase<S extends string> =
    JoinSnake<SplitWords<S>>;

export type KebabCase<S extends string> =
    JoinKebab<SplitWords<S>>;

export type UpperSnakeCase<S extends string> =
    Uppercase<SnakeCase<S>>;

/* -------------------------------------------------------------------------------------------------
 * DEEP TYPES
 * ------------------------------------------------------------------------------------------------- */

type TransformKey<
    K,
    Mode extends CaseMode,
> = K extends string
    ? Mode extends "camel"
    ? CamelCase<K>
    : Mode extends "pascal"
    ? PascalCase<K>
    : Mode extends "snake"
    ? SnakeCase<K>
    : Mode extends "kebab"
    ? KebabCase<K>
    : Mode extends "upper-snake"
    ? UpperSnakeCase<K>
    : K
    : K;

export type DeepCaseTransform<
    T,
    Mode extends CaseMode,
> = T extends Primitive | Builtin
    ? T
    : T extends readonly [infer A, ...infer R]
    ? readonly [
        DeepCaseTransform<A, Mode>,
        ...{
            [K in keyof R]: DeepCaseTransform<R[K], Mode>;
        },
    ]
    : T extends readonly (infer U)[]
    ? DeepCaseTransform<U, Mode>[]
    : T extends object
    ? {
        [K in keyof T as TransformKey<K, Mode>]:
        DeepCaseTransform<T[K], Mode>;
    }
    : T;

/* -------------------------------------------------------------------------------------------------
 * MODES
 * ------------------------------------------------------------------------------------------------- */

export type CaseMode =
    | "camel"
    | "pascal"
    | "snake"
    | "kebab"
    | "upper-snake";

/* -------------------------------------------------------------------------------------------------
 * TOKENIZER
 * ------------------------------------------------------------------------------------------------- */

function tokenize(value: string): string[] {
    return value
        .trim()

        // helloWorld -> hello World
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")

        // APIResponse -> API Response
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")

        // separators
        .replace(/[_\-\s]+/g, " ")

        .split(" ")
        .filter(Boolean)
        .map((word) => word.toLowerCase());
}

/* -------------------------------------------------------------------------------------------------
 * BUILDERS
 * ------------------------------------------------------------------------------------------------- */

function toCamel(words: string[]): string {
    return words
        .map((word, index) =>
            index === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");
}

function toPascal(words: string[]): string {
    return words
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");
}

function toSnake(words: string[]): string {
    return words.join("_");
}

function toKebab(words: string[]): string {
    return words.join("-");
}

function toUpperSnake(words: string[]): string {
    return words.join("_").toUpperCase();
}

/* -------------------------------------------------------------------------------------------------
 * CASE CONVERTER
 * ------------------------------------------------------------------------------------------------- */

function convertCase(
    value: string,
    mode: CaseMode,
): string {
    const words = tokenize(value);

    switch (mode) {
        case "camel":
            return toCamel(words);

        case "pascal":
            return toPascal(words);

        case "snake":
            return toSnake(words);

        case "kebab":
            return toKebab(words);

        case "upper-snake":
            return toUpperSnake(words);

        default:
            return value;
    }
}

/* -------------------------------------------------------------------------------------------------
 * PLAIN OBJECT CHECK
 * ------------------------------------------------------------------------------------------------- */

function isPlainObject(
    value: unknown,
): value is Record<string, unknown> {
    if (
        typeof value !== "object" ||
        value === null
    ) {
        return false;
    }

    const prototype = Object.getPrototypeOf(value);

    return (
        prototype === Object.prototype ||
        prototype === null
    );
}

/* -------------------------------------------------------------------------------------------------
 * DEEP TRANSFORM
 * ------------------------------------------------------------------------------------------------- */

function transformDeep<
    T,
    Mode extends CaseMode,
>(
    value: T,
    mode: Mode,
    seen = new WeakMap<object, unknown>(),
): DeepCaseTransform<T, Mode> {
    // primitives
    if (
        value === null ||
        typeof value !== "object"
    ) {
        return value as DeepCaseTransform<T, Mode>;
    }

    // arrays
    if (Array.isArray(value)) {
        if (seen.has(value)) {
            return seen.get(value) as DeepCaseTransform<
                T,
                Mode
            >;
        }

        const result: unknown[] = [];

        seen.set(value, result);

        for (const item of value) {
            result.push(
                transformDeep(item, mode, seen),
            );
        }

        return result as DeepCaseTransform<T, Mode>;
    }

    // builtins / classes
    if (!isPlainObject(value)) {
        return value as DeepCaseTransform<T, Mode>;
    }

    // circular refs
    if (seen.has(value)) {
        return seen.get(value) as DeepCaseTransform<
            T,
            Mode
        >;
    }

    const result: AnyObject = {};

    seen.set(value, result);

    for (const key of Object.keys(value)) {
        const transformedKey = convertCase(
            key,
            mode,
        );

        result[transformedKey] = transformDeep(
            value[key as keyof typeof value],
            mode,
            seen,
        );
    }

    return result as DeepCaseTransform<T, Mode>;
}

/* -------------------------------------------------------------------------------------------------
 * PUBLIC API
 * ------------------------------------------------------------------------------------------------- */

export function toCamelCase<T>(
    value: T,
): DeepCaseTransform<T, "camel"> {
    return transformDeep(value, "camel");
}

export function toPascalCase<T>(
    value: T,
): DeepCaseTransform<T, "pascal"> {
    return transformDeep(value, "pascal");
}

export function toSnakeCase<T>(
    value: T,
): DeepCaseTransform<T, "snake"> {
    return transformDeep(value, "snake");
}

export function toKebabCase<T>(
    value: T,
): DeepCaseTransform<T, "kebab"> {
    return transformDeep(value, "kebab");
}

export function toUpperSnakeCase<T>(
    value: T,
): DeepCaseTransform<T, "upper-snake"> {
    return transformDeep(value, "upper-snake");
}