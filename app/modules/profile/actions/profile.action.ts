'use server';

import { ProfileService } from "@/app/modules/profile/profile.service";
import { revalidatePath } from "next/cache";
import { safeAction } from "@/app/lib/errors/SafeActions";
import { formDataToObject, parseWithSchema } from "@/app/lib/forms/zod";
import { profileSchema } from "../profile.schema";

export const updateProfileAction = safeAction(async (formData: FormData) => {
    const dto = parseWithSchema(profileSchema, formDataToObject(formData));

    await ProfileService.update(dto);

    revalidatePath('/dashboard/profile/edit');
})
