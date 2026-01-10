import { ProfileUsecase } from "../domain/usecases/profile.usecase";
import { ProfileRepositoryImpl } from "../repository/profile.repository";


export class ProfileConstroller {

    private readonly _profileUsecase: ProfileUsecase;
    
    constructor() {
        const profileRepository = new ProfileRepositoryImpl();
        this._profileUsecase = new ProfileUsecase(profileRepository);
    }
    
    async createProfile(profile: any): Promise<boolean> {
        return this._profileUsecase.createProfile(profile);
    }
}