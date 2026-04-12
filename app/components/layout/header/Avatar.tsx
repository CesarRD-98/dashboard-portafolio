'use client';

import { Profile } from "@/app/modules/profile/profile.model";
import Image from "next/image";

type Props = {
    profile: Profile;
};

export function Avatar({ profile }: Props) {
    return (
        <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
            <Image
                src={profile.avatarUrl}
                alt="Avatar"
                fill
                sizes="50px"
                className="object-cover"
                priority
            />
        </div>
    );
}