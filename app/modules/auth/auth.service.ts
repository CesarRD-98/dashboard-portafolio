import { LoginDto } from "./auth.model";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";

export const AuthService = {
    login: async (payload: LoginDto): Promise<boolean> => {

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

        return true;
    },

    logout: async (): Promise<boolean> => {
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

        return true;
    }
}