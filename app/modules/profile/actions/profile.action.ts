'use server';

import { ProfileService } from "@/app/modules/profile/profile.service";
import { AppError } from "@/app/lib/errors/AppError";
import { revalidatePath } from "next/cache";

type ActionResponse = {
    success: boolean;
    error?: {
        message: string;
        type: 'error' | 'warning' | 'info';
    };
};

export async function updateProfileAction(formData: FormData): Promise<ActionResponse> {
    try {
        await ProfileService.updateProfile(formData);

        revalidatePath('/profile');
        revalidatePath('/profile/edit');

        return { success: true };

    } catch (error: unknown) {

        if (error instanceof AppError) {
            return {
                success: false,
                error: {
                    message: error.message,
                    type: error.type
                }
            };
        }

        return {
            success: false,
            error: {
                message: 'Error inesperado',
                type: 'error'
            }
        };
    }
}