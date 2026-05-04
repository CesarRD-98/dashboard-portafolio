import { ContactService } from "@/app/modules/contacts/contact.service"
import { ContactView } from "./ui/contact.view"

export const metadata = {
    title: 'Inicio | Contactos'
}

export default async function ContactPage() {
    const data = await ContactService.getAll();
    return <ContactView contacts={data} />
}