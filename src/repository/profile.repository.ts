
import { ref, set } from "firebase/database";
import { ProfileRepository } from "../domain/interfaces/profile.interface";
import { database } from "../firebaseConfig";
import { CacheService } from "../infra/cache/cache.service";

export class ProfileRepositoryImpl implements ProfileRepository {
    async createProfile(profile: any): Promise<boolean> {
        try {
            await set(ref(database, `profiles/${profile.id}`), { 
              nome: profile.userName,
              dataCriacao: profile.dataCriacao.toString(),
              conta: profile.conta ?? { saldo: 0, extrato: [] },
            });
        
            await CacheService.set(`user_${profile.id}`, profile);
            await CacheService.clear("users_all");
            console.log(`💾 [API] Perfil "${profile.id}" criado e cache atualizado`);
            return true;
          } catch (error) {
            console.error("[API] createAccount erro:", error);
            return false;
          }
    }
}