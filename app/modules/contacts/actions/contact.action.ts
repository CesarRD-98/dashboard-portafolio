'use server'

import { safeAction } from "@/app/lib/errors/SafeActions";
import { ContactService } from "../contact.service";
import { ContactDto, ContactDtoConfig } from "../contact.model";
import { mapFormData } from "@/app/lib/forms/forms.mapper";
import { revalidatePath } from "next/cache";

export const createContact = safeAction(async (fomData: FormData) => {
    const dto = mapFormData<ContactDto>(fomData, ContactDtoConfig) as ContactDto;
    await ContactService.create(dto);

    revalidatePath("/dashboard/contact");
});

export const deleteContact = safeAction(async (id: string) => {
    await ContactService.delete(id);
    revalidatePath("/dashboard/contact");
});