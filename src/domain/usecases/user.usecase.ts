import { UserRepository } from "../interfaces/user.interface";


export class UserUsecase {

    constructor(private readonly _userRepository: UserRepository) {}

    async getUserById(id: string): Promise<any | null> {
        return await this._userRepository.getUserById(id);
    }

}