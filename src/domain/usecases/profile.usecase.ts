import { ProfileRepository } from "../interfaces/profile.interface";

export class ProfileUsecase {
    
    constructor(private readonly _profileRepository: ProfileRepository) {}

    async createProfile(profile: any): Promise<boolean> {
        return this._profileRepository.createProfile(profile);
    }

    async updateProfile(profile: any): Promise<boolean> {
        return this._profileRepository.updateProfile(profile);
    }

    async getProfile(id: string): Promise<any | null> {
        return this._profileRepository.getProfile(id);
    }
} 