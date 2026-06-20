import { ContactService } from "@/app/modules/contacts/contact.service";
import { ContactEditView } from "./ui/ContactEdit.view";

export const metadata = {
    title: 'Editar contacto | Contacto'
}

export default async function ContactEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await ContactService.getOne(id);
    return <ContactEditView contact={data} />
}