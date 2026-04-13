import { FieldConfig } from "@/app/lib/forms/forms.mapper";

export interface Profile {
    author: string;
    shortBio: string;
    fullBio: string;
    learningFocus: string;
    year: number;
    avatarUrl: string;
    cvUrl: string;
    updatedAt: string;
}

export interface ProfileDto {
    author?: string;
    shortBio?: string;
    fullBio?: string;
    learningFocus?: string;
    year?: string;
    avatar?: File;
    cv?: File;
}

export const profileDtoConfig: FieldConfig<ProfileDto, keyof ProfileDto>[] = [
    { key: 'author', type: 'string' },
    { key: 'shortBio', type: 'string' },
    { key: 'fullBio', type: 'string' },
    { key: 'learningFocus', type: 'string' },
    { key: 'year', type: 'string' },
    { key: 'avatar', type: 'file' },
    { key: 'cv', type: 'file' },
];