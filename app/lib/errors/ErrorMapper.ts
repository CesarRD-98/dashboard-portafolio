import { AppError } from "./AppError";

type SupabaseError = {
    message: string;
    code?: string;
};

export function mapSupabaseError(error: SupabaseError): AppError {
    const message = error.message.toLowerCase();

    if (message.includes('invalid login')) {
        return new AppError('error', 'Credenciales incorrectas');
    }

    if (message.includes('jwt')) {
        return new AppError('warning', 'Sesión expirada, inicia sesión nuevamente');
    }

    if (message.includes('permission')) {
        return new AppError('error', 'No tienes permisos para esta acción');
    }

    if (message.includes('does not exist')) {
        return new AppError('error', 'La columna consultada no existe en la tabla')
    }

    return new AppError('error', 'Ocurrió un error inesperado');
}