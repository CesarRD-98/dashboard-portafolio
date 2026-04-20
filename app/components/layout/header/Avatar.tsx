'use client';

import { Profile } from "@/app/modules/profile/profile.model";
import Image from "next/image";

type Props = {
    profile: Profile;
};

export function Avatar({ profile }: Props) {
    return (
        <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
            <Image
                src={profile.avatarUrl}
                alt="Avatar"
                fill
                sizes="36px"
                className="object-cover"
                priority
            />
        </div>
    );
}