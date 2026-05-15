'use server';

import { ProfileService } from "@/app/modules/profile/profile.service";
import { revalidatePath } from "next/cache";
import { safeAction } from "@/app/lib/errors/SafeActions";
import { parseFormData } from "@/app/lib/forms/formData.parser";
import { ProfileDto, profileDtoConfig } from "../profile.model";
import { AppError } from "@/app/lib/errors/AppError";

export const updateProfileAction = safeAction(async (formData: FormData) => {
    const dto = parseFormData<ProfileDto>(formData, profileDtoConfig);

    if (Object.keys(dto).length === 0) {
        throw new AppError('info', 'No se encontraron datos para actualizar el perfil');
    }

    await ProfileService.update(dto);

    revalidatePath('/dashboard/profile/edit');
})