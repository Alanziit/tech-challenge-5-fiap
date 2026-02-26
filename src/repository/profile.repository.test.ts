import { ProfileRepositoryImpl } from './profile.repository';
import { CacheService } from '../infra/cache/cache.service';
import * as FirebaseDatabase from 'firebase/database';

jest.mock('../infra/cache/cache.service');
jest.mock('../firebaseConfig', () => ({
  database: { _databaseUrl: 'https://test.firebaseio.com' }
}));
jest.mock('firebase/database');

describe('ProfileRepositoryImpl', () => {
  let repository: ProfileRepositoryImpl;
  const mockCacheService = CacheService as jest.Mocked<typeof CacheService>;
  const mockDatabaseFunctions = FirebaseDatabase as jest.Mocked<typeof FirebaseDatabase>;

  beforeEach(() => {
    repository = new ProfileRepositoryImpl();
    jest.clearAllMocks();

    // Reset mocks
    mockCacheService.set.mockResolvedValue(undefined);
    mockCacheService.get.mockResolvedValue(null);
    mockCacheService.clear.mockResolvedValue(undefined);
  });

  describe('createProfile()', () => {
    it('deve criar um perfil com sucesso', async () => {
      const profile = {
        id: 'user123',
        userName: 'John Doe',
        dataCriacao: new Date('2024-01-15'),
        stylePreferences: { theme: 'dark' }
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.set.mockResolvedValue(undefined);

      const result = await repository.createProfile(profile);

      expect(result).toBe(true);
      expect(mockDatabaseFunctions.set).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalledWith(`user_${profile.id}`, profile);
      expect(mockCacheService.clear).toHaveBeenCalledWith('users_all');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Perfil "${profile.id}" criado e cache atualizado`)
      );

      consoleSpy.mockRestore();
    });

    it('deve retornar false quando perfil é inválido', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.createProfile(null);

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('deve retornar false quando ID do perfil é inválido', async () => {
      const profile = {
        id: undefined,
        userName: 'John Doe',
        dataCriacao: new Date(),
        stylePreferences: {}
      };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.createProfile(profile);

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('deve lidar com stylePreferences vazias', async () => {
      const profile = {
        id: 'user123',
        userName: 'John Doe',
        dataCriacao: new Date(),
        stylePreferences: undefined
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.set.mockResolvedValue(undefined);

      const result = await repository.createProfile(profile);

      expect(result).toBe(true);
      expect(mockDatabaseFunctions.set).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          stylePreferences: {}
        })
      );

      consoleSpy.mockRestore();
    });

    it('deve lançar erro se Firebase set falhar', async () => {
      const profile = {
        id: 'user123',
        userName: 'John Doe',
        dataCriacao: new Date(),
        stylePreferences: {}
      };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.set.mockRejectedValue(new Error('Firebase error'));

      const result = await repository.createProfile(profile);

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('updateProfile()', () => {
    it('deve atualizar um perfil com sucesso', async () => {
      const profile = {
        id: 'user123',
        userName: 'Jane Doe',
        stylePreferences: { theme: 'light' }
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.update.mockResolvedValue(undefined);

      const result = await repository.updateProfile(profile);

      expect(result).toBe(true);
      expect(mockDatabaseFunctions.update).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalledWith(`user_${profile.id}`, profile);
      expect(mockCacheService.clear).toHaveBeenCalledWith('users_all');
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Perfil "${profile.id}" atualizado com sucesso`)
      );

      consoleSpy.mockRestore();
    });

    it('deve retornar false quando perfil é inválido', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.updateProfile(null);

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('deve retornar false quando ID do perfil é inválido', async () => {
      const profile = {
        id: null,
        userName: 'Jane Doe',
        stylePreferences: {}
      };

      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.updateProfile(profile);

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('deve limpar cache de usuários ao atualizar', async () => {
      const profile = {
        id: 'user123',
        userName: 'Jane Doe',
        stylePreferences: {}
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.update.mockResolvedValue(undefined);

      await repository.updateProfile(profile);

      expect(mockCacheService.clear).toHaveBeenCalledWith('users_all');

      consoleSpy.mockRestore();
    });
  });

  describe('getProfile()', () => {
    it('deve obter perfil do cache quando disponível', async () => {
      const id = 'user123';
      const cachedProfile = {
        nome: 'John Doe',
        dataCriacao: '2024-01-15',
        stylePreferences: { theme: 'dark' }
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockCacheService.get.mockResolvedValue(cachedProfile);

      const result = await repository.getProfile(id);

      expect(result).toEqual(cachedProfile);
      expect(mockCacheService.get).toHaveBeenCalledWith(`user_${id}`);
      expect(FirebaseDatabase.get).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`Perfil "${id}" obtido do cache`)
      );

      consoleSpy.mockRestore();
    });

    it('deve obter perfil do banco de dados quando não está em cache', async () => {
      const id = 'user123';
      const profileData = {
        nome: 'John Doe',
        stylePreferences: { theme: 'dark' }
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockReturnValue(profileData)
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      const result = await repository.getProfile(id);

      expect(result).toEqual(profileData);
      expect(mockCacheService.get).toHaveBeenCalledWith(`user_${id}`);
      expect(mockCacheService.set).toHaveBeenCalledWith(`user_${id}`, profileData);
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`obtido do banco de dados`)
      );

      consoleSpy.mockRestore();
    });

    it('deve retornar null quando perfil não existe no banco de dados', async () => {
      const id = 'user123';

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(false),
        val: jest.fn()
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      const result = await repository.getProfile(id);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining(`não encontrado`)
      );

      consoleSpy.mockRestore();
    });

    it('deve retornar null quando ID é inválido', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const result = await repository.getProfile('');

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('deve lidar com erros ao buscar do banco de dados', async () => {
      const id = 'user123';
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      mockCacheService.get.mockResolvedValue(null);
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockRejectedValue(new Error('Database error'));

      const result = await repository.getProfile(id);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('deve priorizar cache sobre banco de dados', async () => {
      const id = 'user123';
      const cachedProfile = { nome: 'Cached' };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockCacheService.get.mockResolvedValue(cachedProfile);

      await repository.getProfile(id);

      // Verificar que cache foi consultado e banco de dados não foi
      expect(mockCacheService.get).toHaveBeenCalledWith(`user_${id}`);
      expect(mockDatabaseFunctions.get).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Casos de Integração', () => {
    it('deve criar e depois recuperar um perfil', async () => {
      const profile = {
        id: 'user123',
        userName: 'John Doe',
        dataCriacao: new Date(),
        stylePreferences: { theme: 'dark' }
      };

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.set.mockResolvedValue(undefined);

      // Create
      const createResult = await repository.createProfile(profile);
      expect(createResult).toBe(true);

      // Setup para get
      mockCacheService.get.mockResolvedValue(profile);

      // Get
      const getResult = await repository.getProfile(profile.id);
      expect(getResult).toEqual(profile);

      consoleSpy.mockRestore();
    });
  });
});
