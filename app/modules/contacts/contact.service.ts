import { toCamelCase, toSnakeCase } from "@/app/utils/caseConverter";
import { getServerAuthContext } from "../auth/getServer.context";
import { Contact, ContactDto } from "./contact.model";
import { mapSupabaseError } from "@/app/lib/errors/ErrorMapper";

export const ContactService = {
    getOne: async (id: string): Promise<Contact> => {
        const { supabase } = await getServerAuthContext();
        const { data } = await supabase.from('contacts').select('*').eq('id', id).single();

        return toCamelCase(data) as Contact;
    },
    getAll: async (): Promise<Contact[]> => {
        const { supabase, userId } = await getServerAuthContext();
        const { data } = await supabase.from('contacts').select('*').eq('user_id', userId);
        return toCamelCase(data) as Contact[];
    },
    create: async (dto: ContactDto): Promise<void> => {
        const { supabase, userId } = await getServerAuthContext();

        const { ...rest } = dto;
        const contactData: Record<string, unknown> = { ...rest };

        contactData.userId = userId;

        const { error } = await supabase.from('contacts').insert([toSnakeCase(contactData)]);

        if (error) { throw mapSupabaseError(error) }
    },
    update: async (id: string, dto: ContactDto) => {
        return dto ? '' : null;
    },
    delete: async (id: string) => {
        const { supabase } = await getServerAuthContext();
        const { error } = await supabase.from('contacts').delete().eq('id', id);
        if (error) { throw mapSupabaseError(error) }
    },
}