'use server';

import { ProfileService } from "@/app/modules/profile/profile.service";
import { revalidatePath } from "next/cache";
import { safeAction } from "@/app/lib/errors/SafeActions";
import { mapFormData } from "@/app/lib/forms/forms.mapper";
import { ProfileDto, profileDtoConfig } from "../profile.model";
import { AppError } from "@/app/lib/errors/AppError";

export const updateProfileAction = safeAction(async (formData: FormData) => {
    const dto = mapFormData<ProfileDto>(formData, profileDtoConfig) as ProfileDto;

    if (Object.keys(dto).length === 0) {
        throw new AppError('info', 'No se encontraron datos para actualizar el perfil');
    }

    await ProfileService.update(dto);

    revalidatePath('/profile');
    revalidatePath('/profile/edit');
})