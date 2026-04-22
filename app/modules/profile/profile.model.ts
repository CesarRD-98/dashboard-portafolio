import { FieldConfig } from "@/app/lib/forms/forms.mapper";

export interface Profile {
    author: string;
    shortBio: string;
    tagLine: string;
    profession: string;
    year: number;
    avatarUrl: string;
    cvUrl: string;
    updatedAt: string;
}

export interface ProfileDto {
    author?: string;
    shortBio?: string;
    profession?: string;
    tagLine?: string;
    year?: string;
    avatar?: File;
    cv?: File;
}

export const profileDtoConfig: FieldConfig<ProfileDto, keyof ProfileDto>[] = [
    { key: 'author', type: 'string' },
    { key: 'shortBio', type: 'string' },
    { key: 'profession', type: 'string' },
    { key: 'tagLine', type: 'string' },
    { key: 'year', type: 'string' },
    { key: 'avatar', type: 'file' },
    { key: 'cv', type: 'file' },
];