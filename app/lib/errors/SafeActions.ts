import { AppError } from "@/app/lib/errors/AppError"

type ActionResponse<T = null> =
    | { success: true; data?: T }
    | {
        success: false;
        error: {
            message: string;
            type: 'error' | 'warning' | 'info';
        };
    };

export function safeAction<TArgs extends unknown[], TReturn>(fn: (...args: TArgs) => Promise<TReturn>) {
    return async (...args: TArgs): Promise<ActionResponse<TReturn>> => {
        try {
            const result = await fn(...args)
            return { success: true, data: result }

        } catch (error: unknown) {

            if (error instanceof AppError) {
                return {
                    success: false,
                    error: {
                        message: error.message,
                        type: error.type
                    }
                }
            }

            console.error(error)

            return {
                success: false,
                error: {
                    message: 'Lo sentimos, ha ocurrido un error inesperado',
                    type: 'error'
                }
            }
        }
    }
}