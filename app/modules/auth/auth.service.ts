import { AppError } from "@/app/lib/errors/AppError";
import { LoginDto } from "./auth.model";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";

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
            const result = await response.json();
            throw mapSupabaseError(result.error);
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
            const error = await response.json();
            throw mapSupabaseError(error);
        }
    },
    refresh: async (): Promise<void> => {
        const response = await fetch('/api/auth/refresh');
        const { session } = await response.json();
        
        if (!session) {
            throw new AppError('warning', 'Sesión expirada');
        }
    }
}