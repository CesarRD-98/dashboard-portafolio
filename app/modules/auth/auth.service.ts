import { AppError } from "@/app/lib/errors/AppError";
import { LoginDto } from "./auth.model";

async function getResponseError(response: Response): Promise<AppError> {
    const body: unknown = await response.json().catch(() => null);
    const message = typeof body === "object" && body !== null && "error" in body
        && typeof body.error === "object" && body.error !== null && "message" in body.error
        && typeof body.error.message === "string"
        ? body.error.message
        : "Ocurrió un error inesperado. Inténtalo de nuevo.";

    return new AppError("error", message);
}

export const AuthService = {
    login: async (payload: LoginDto): Promise<void> => {

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw await getResponseError(response);
        }
    },

    logout: async (): Promise<void> => {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw await getResponseError(response);
        }
    }
}
