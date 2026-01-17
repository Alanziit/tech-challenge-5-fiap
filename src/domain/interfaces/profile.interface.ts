export interface ProfileRepository {
    createProfile(profile: any): Promise<boolean>;
    updateProfile(profile: any): Promise<boolean>;
    getProfile(id: string): Promise<any | null>;
}