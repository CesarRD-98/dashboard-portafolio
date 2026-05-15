import { FieldConfig } from "@/app/lib/forms/form.type";


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

export const initialProfileForm: ProfileDto = { author: "", shortBio: "", profession: "", tagLine: "", year: "", };

export const profileDtoConfig: FieldConfig<ProfileDto, keyof ProfileDto>[] = [
    { key: 'author', type: 'string' },
    { key: 'shortBio', type: 'string' },
    { key: 'profession', type: 'string' },
    { key: 'tagLine', type: 'string' },
    { key: 'year', type: 'string' },
    { key: 'avatar', type: 'file' },
    { key: 'cv', type: 'file' },
];

export interface StatItem {
    title: string;
    description: string;
    count: number;
}

export interface RecentActivity {
    createdAt: string;
    title: string;
    type: string;
}

export interface OverviewData {
    stats: StatItem[];
    recentActivity: RecentActivity[];
}