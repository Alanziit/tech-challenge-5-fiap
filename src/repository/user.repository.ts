
import { get, ref, update } from "firebase/database";
import { UserRepository } from "../domain/interfaces/user.interface";
import { CacheService } from "../infra/cache/cache.service";
import { database } from "../firebaseConfig";

export class UserRepositoryImpl implements UserRepository{

    async getUserById(id: string): Promise<any | null> {
            const cacheKey = `user_${id}`;
            
              try {
                const cached = await CacheService.get(cacheKey);
                if (cached) return cached;
            
                const response = await get(ref(database, `profiles/${id}`));
                if (response.exists()) {
                  const data = response.val();
                  await CacheService.set(cacheKey, data);
                  return data;
                }
              } catch (error) {
                console.error("[API] getUserById erro:", error);
              }
              return null;
        }
}