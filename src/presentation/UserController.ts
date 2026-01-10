import { UserUsecase } from "../domain/usecases/user.usecase";  
import { UserRepositoryImpl } from "../repository/user.repository";

export class UserController {

    private readonly _userUsecase: UserUsecase;

    constructor() {
        const userRepository = new UserRepositoryImpl();
        this._userUsecase = new UserUsecase(userRepository);
    }

    async getUserById(id: string): Promise<any | null> {
        return await this._userUsecase.getUserById(id);
    }

}