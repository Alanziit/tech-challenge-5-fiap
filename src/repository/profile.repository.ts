
import { ref, set } from "firebase/database";
import { ProfileRepository } from "../domain/interfaces/profile.interface";
import { database } from "../firebaseConfig";
import { CacheService } from "../infra/cache/cache.service";

export class ProfileRepositoryImpl implements ProfileRepository {
    async createProfile(profile: any): Promise<boolean> {
        try {
            // Validação: database inicializado
            if (!database) {
                throw new Error("❌ Database não está inicializado. Verifique a configuração do Firebase.");
            }

            // Validação: perfil e ID válidos
            if (!profile || !profile.id) {
                throw new Error("❌ Perfil ou ID do perfil inválido.");
            }

            await set(ref(database, `profiles/${profile.id}`), { 
              nome: profile.userName,
              dataCriacao: profile.dataCriacao.toString(),
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