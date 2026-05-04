import { Contact } from "@/app/modules/contacts/contact.model"
import { formatDate } from "date-fns/format";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

type Props = {
    contact: Contact
    onDelete?: (contact: Contact) => void
}

export function ContactCard({ contact, onDelete }: Props) {
    return (
        <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 
        bg-white/70 dark:bg-neutral-900/70 flex flex-col justify-between gap-4 transition"
        >
            {/* TOP */}
            <div className="flex flex-col gap-3">

                {/* TITLE + TYPE */}
                <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-semibold text-neutral-900 dark:text-white line-clamp-2">
                        {contact.title}
                    </h2>

                    {contact.type && (
                        <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium border border-blue-500/75 text-blue-500">
                            {contact.type}
                        </span>
                    )}
                </div>

                {/* VALUE */}
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 break-all">
                    {contact.value}
                </p>

                {/* EXTRA */}
                <div className="flex items-center gap-2 flex-wrap">

                    {contact.linkUrl && (
                        <Link
                            href={contact.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                        >
                            Abrir enlace
                        </Link>
                    )}

                    {contact.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-neutral-700 text-white dark:bg-white/90 dark:text-neutral-900">
                            Principal
                        </span>
                    )}
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between pt-3 border-t border-neutral-200/70 dark:border-neutral-800/70">
                <span className="text-xs text-neutral-500">
                    {formatDate(new Date(contact.createdAt), "dd MMM yyyy")}
                </span>

                <div className="flex items-center gap-4">
                    <Link
                        href={`/dashboard/contact/${contact.id}`}
                        className="text-sm font-medium text-blue-500/80 hover:underline"
                    >
                        <Edit size={14} className="inline-block mr-1" />
                        Editar
                    </Link>

                    <button
                        onClick={() => onDelete?.(contact)}
                        className="text-sm font-medium text-red-500/80 hover:underline cursor-pointer"
                    >
                        <Trash size={14} className="inline-block mr-1" />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}