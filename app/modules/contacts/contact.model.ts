import { SelectOption } from "@/app/components/shared/forms/Select";
import { FieldConfig } from "@/app/lib/forms/form.type";

export interface Contact {
    id: string;
    title: string;
    value: string;
    type: string;
    linkUrl: string;
    isPrimary: boolean;
    createdAt: string;
}

export interface ContactDto {
    userId?: string;
    title?: string;
    value?: string;
    category?: string;
    type?: string;
    linkUrl?: string;
    isPrimary?: boolean;
}

export const initialContactForm: ContactDto = { title: "", value: "", category: "", type: "", linkUrl: "", isPrimary: false, };

export const ContactDtoConfig: FieldConfig<ContactDto, keyof ContactDto>[] = [
    { key: 'title', type: 'string' },
    { key: 'value', type: 'string' },
    { key: 'category', type: 'string' },
    { key: 'type', type: 'string' },
    { key: 'linkUrl', type: 'string' },
    { key: 'isPrimary', type: 'boolean' },
];


export const typeContact: SelectOption[] = [
    { text: "--- Selecciona tipo ---", value: "" },
    { text: "Correo electrónico", value: "email" },
    { text: "Teléfono", value: "phone" },
    { text: "LinkedIn", value: "linkedin" },
    { text: "GitHub", value: "github" },
    { text: "Facebook", value: "facebook" },
]

export const categoryContact: SelectOption[] = [
    { text: "--- Selecciona categoría ---", value: "" },
    { text: "Contacto directo", value: "direct" },
    { text: "Red social", value: "social" },
]

export const requiredFieldsContact: (keyof ContactDto)[] = ['title', 'value', 'category', 'type'];