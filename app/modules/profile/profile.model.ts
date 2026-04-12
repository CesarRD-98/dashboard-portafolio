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
    updatedAt?: Date;
}