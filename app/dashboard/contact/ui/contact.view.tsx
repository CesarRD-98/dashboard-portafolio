'use client'

import { Section } from "@/app/components/layout/Section";
import { StatusMessage } from "@/app/components/ui/StatusMessage";
import { Contact } from "@/app/modules/contacts/contact.model";
import { Plus } from "lucide-react";
import { ContactCard } from "./components/ContactCard";
import { useConfirm } from "@/app/components/shared/modals/confirm.provider";
import { deleteContact } from "@/app/modules/contacts/actions/contact.action";
import { useToast } from "@/app/components/toast/toast.provider";
import { AppError } from "@/app/lib/errors/AppError";
import { ButtonLink } from "@/app/components/shared/ButtonLink";

type Props = {
    contacts: Contact[]
}

export function ContactView({ contacts }: Props) {
    const { showToast } = useToast();
    const confirm = useConfirm();

    const handleDelete = (contact: Contact) => {
        confirm({
            title: "Eliminar contacto",
            description: `¿Seguro que quieres eliminar "${contact.value}"? Esta acción no se puede deshacer.`,
            confirmText: "Eliminar",
            variant: "danger",
            action: async () => {
                try {
                    await deleteContact(contact.id)
                    showToast({
                        message: "Se eliminó correctamente",
                        type: "success"
                    })

                } catch (error: unknown) {
                    if (error instanceof AppError) {
                        showToast({
                            message: error.message,
                            type: "error"
                        })
                    }
                }
            }
        })
    }

    return (
        <Section
            id="contact"
            title="Contactos"
            description="Aquí podrás administrar tus medios de contacto que desees mostrar en tu portafolio."
        >
            <div className="flex justify-end">
                <ButtonLink href="/dashboard/contact/new" icon={Plus} label="Nuevo contacto" />
            </div>

            {!contacts.length ? (
                <StatusMessage
                    title="No hay contactos"
                    message="Agrega tus contactos para mostrarlos en tu portafolio."
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {contacts.map((contact) => (
                        <ContactCard
                            key={contact.id}
                            contact={contact}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </Section>
    );
}