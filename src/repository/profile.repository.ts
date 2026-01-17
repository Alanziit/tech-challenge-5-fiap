import { ref, set, get, update } from "firebase/database";
import { ProfileRepository } from "../domain/interfaces/profile.interface";
import { database } from "../firebaseConfig.tsx";
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
              stylePreferences: profile.stylePreferences || {}
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

    async updateProfile(profile: any): Promise<boolean> {
        try {
            if (!database) {
                throw new Error("❌ Database não está inicializado.");
            }

            if (!profile || !profile.id) {
                throw new Error("❌ Perfil ou ID do perfil inválido.");
            }

            await update(ref(database, `profiles/${profile.id}`), {
                nome: profile.userName,
                stylePreferences: profile.stylePreferences || {}
            });

            await CacheService.set(`user_${profile.id}`, profile);
            await CacheService.clear("users_all");
            console.log(`💾 [API] Perfil "${profile.id}" atualizado com sucesso`);
            return true;
        } catch (error) {
            console.error("[API] updateProfile erro:", error);
            return false;
        }
    }

    async getProfile(id: string): Promise<any | null> {
        try {
            if (!database) {
                throw new Error("❌ Database não está inicializado.");
            }

            if (!id) {
                throw new Error("❌ ID do perfil inválido.");
            }

            // Tenta obter do cache primeiro
            const cached = await CacheService.get(`user_${id}`);
            if (cached) {
                console.log(`📦 [CACHE] Perfil "${id}" obtido do cache`);
                return cached;
            }

            // Se não estiver no cache, busca do banco de dados
            const snapshot = await get(ref(database, `profiles/${id}`));
            if (snapshot.exists()) {
                const profileData = snapshot.val();
                await CacheService.set(`user_${id}`, profileData);
                console.log(`📥 [API] Perfil "${id}" obtido do banco de dados`);
                return profileData;
            }

            console.log(`⚠️ [API] Perfil "${id}" não encontrado`);
            return null;
        } catch (error) {
            console.error("[API] getProfile erro:", error);
            return null;
        }
    }
}