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
import Link from "next/dist/client/link";

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
                <Link
                    href="/dashboard/contact/new"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-neutral-200/75 dark:hover:bg-neutral-800 
                            text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                >
                    <Plus size={16} />
                    Nuevo contacto
                </Link>
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