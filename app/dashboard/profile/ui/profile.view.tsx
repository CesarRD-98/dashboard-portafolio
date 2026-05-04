'use client'

import { Section } from "@/app/components/layout/Section";
import { Profile } from "@/app/modules/profile/profile.model";
import { formatDate } from "date-fns";
import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    profile: Profile
}

export function ProfileView({ profile }: Props) {
    return (
        <Section
            id="profile"
            title="Perfil"
            description="Información pública mostrada en tu portafolio"
        >

            <div className="flex justify-end">
                <Link
                    href="/dashboard/profile/edit"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold hover:bg-neutral-200/75 dark:hover:bg-neutral-800 
                    text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
                >
                    <Edit size={16} />
                    Editar perfil
                </Link>
            </div>

            {/* MAIN CARD */}
            <div className="p-6 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col gap-6">

                <div className='flex flex-col md:flex-row items-center gap-4'>
                    {/* AVATAR */}
                    <div>
                        <Image
                            src={profile.avatarUrl}
                            alt="Avatar"
                            width={140}
                            height={140}
                            className="rounded-md border border-neutral-200 dark:border-neutral-700 object-cover shrink-0"
                        />
                    </div>

                    <div className='flex flex-col gap-4 md:gap-1'>
                        {/* AUTHOR + YEAR */}
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
                                {profile.author}
                            </h2>

                            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium 
                            bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                                Año {profile.year}
                            </span>
                        </div>
                        {/* SHORT BIO */}
                        <p className="text-base text-center md:text-start text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {profile.shortBio}
                        </p>
                    </div>
                </div>

                {/* ENFOQUE */}
                <div className="p-5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40
                        flex flex-col gap-2
                    ">
                    <span className="text-sm font-medium text-neutral-500">
                        Línea de etiqueta
                    </span>

                    <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {profile.tagLine}
                    </p>
                </div>

                {/* FOOTER */}
                <div className="
                        flex items-center justify-between flex-wrap gap-3
                        pt-4 border-t border-neutral-200 dark:border-neutral-800
                    ">
                    <Link
                        href={profile.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
                        Descargar CV
                    </Link>

                    <span className="text-sm text-neutral-500 whitespace-nowrap">
                        {formatDate(new Date(profile.updatedAt), "dd MMM yyyy hh:mm a")}
                    </span>
                </div>

            </div>
        </Section>
    )
}