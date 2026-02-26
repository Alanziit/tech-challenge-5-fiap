import { UserRepositoryImpl } from './user.repository';
import { CacheService } from '../infra/cache/cache.service';
import * as FirebaseDatabase from 'firebase/database';

jest.mock('../infra/cache/cache.service');
jest.mock('../firebaseConfig', () => ({
  database: { _databaseUrl: 'https://test.firebaseio.com' }
}));
jest.mock('firebase/database');

describe('UserRepositoryImpl', () => {
  let repository: UserRepositoryImpl;
  const mockCacheService = CacheService as jest.Mocked<typeof CacheService>;
  const mockDatabaseFunctions = FirebaseDatabase as jest.Mocked<typeof FirebaseDatabase>;

  beforeEach(() => {
    repository = new UserRepositoryImpl();
    jest.clearAllMocks();

    // Reset mocks
    mockCacheService.set.mockResolvedValue(undefined);
    mockCacheService.get.mockResolvedValue(null);
  });

  describe('getUserById()', () => {
    it('deve retornar usuário do cache quando disponível', async () => {
      const id = 'user123';
      const cachedUser = {
        id: 'user123',
        nome: 'John Doe',
        email: 'john@example.com'
      };

      mockCacheService.get.mockResolvedValue(cachedUser);

      const result = await repository.getUserById(id);

      expect(result).toEqual(cachedUser);
      expect(mockCacheService.get).toHaveBeenCalledWith(`user_${id}`);
      expect(FirebaseDatabase.get).not.toHaveBeenCalled();
    });

    it('deve buscar usuário do banco de dados quando não está em cache', async () => {
      const id = 'user123';
      const userData = {
        id: 'user123',
        nome: 'John Doe',
        email: 'john@example.com'
      };

      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockReturnValue(userData)
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      const result = await repository.getUserById(id);

      expect(result).toEqual(userData);
      expect(mockCacheService.get).toHaveBeenCalledWith(`user_${id}`);
      expect(mockDatabaseFunctions.get).toHaveBeenCalled();
      expect(mockCacheService.set).toHaveBeenCalledWith(`user_${id}`, userData);
    });

    it('deve salvar usuário no cache após buscar do banco de dados', async () => {
      const id = 'user123';
      const userData = {
        id: 'user123',
        nome: 'Jane Doe'
      };

      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockReturnValue(userData)
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      await repository.getUserById(id);

      expect(mockCacheService.set).toHaveBeenCalledWith(`user_${id}`, userData);
    });

    it('deve retornar null quando usuário não existe no banco de dados', async () => {
      const id = 'non_existent_user';

      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(false),
        val: jest.fn().mockReturnValue(null)
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      const result = await repository.getUserById(id);

      expect(result).toBeNull();
    });

    it('deve retornar null quando há erro no cache e no banco de dados', async () => {
      const id = 'user123';
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      mockCacheService.get.mockRejectedValue(new Error('Cache error'));

      await repository.getUserById(id);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[API] getUserById erro:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('deve lidar com erro ao acessar o cache', async () => {
      const id = 'user123';
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      mockCacheService.get.mockRejectedValue(new Error('Cache access failed'));

      const result = await repository.getUserById(id);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[API] getUserById erro:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('deve lidar com erro ao buscar do banco de dados', async () => {
      const id = 'user123';
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      mockCacheService.get.mockResolvedValue(null);
      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockRejectedValue(new Error('Database error'));

      const result = await repository.getUserById(id);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[API] getUserById erro:',
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('deve usar cache key correta com formato user_ID', async () => {
      const id = 'test_user_456';
      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(false),
        val: jest.fn()
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      await repository.getUserById(id);

      expect(mockCacheService.get).toHaveBeenCalledWith(`user_${id}`);
    });

    it('deve não tentar salvar no cache se usuário não existe no banco', async () => {
      const id = 'user123';

      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(false),
        val: jest.fn()
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      await repository.getUserById(id);

      expect(mockCacheService.set).not.toHaveBeenCalled();
    });

    it('deve retornar usuário com dados completos', async () => {
      const id = 'user123';
      const userData = {
        id: 'user123',
        nome: 'John Doe',
        email: 'john@example.com',
        telefone: '11999999999',
        dataCriacao: '2024-01-15',
        stylePreferences: {
          theme: 'dark',
          language: 'pt-BR'
        }
      };

      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockReturnValue(userData)
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      const result = await repository.getUserById(id);

      expect(result).toEqual(userData);
      expect(result?.stylePreferences).toEqual(userData.stylePreferences);
    });

    it('deve priorizar cache sobre banco de dados', async () => {
      const id = 'user123';
      const cachedUser = { id: 'user123', nome: 'Cached User' };

      mockCacheService.get.mockResolvedValue(cachedUser);

      await repository.getUserById(id);

      expect(mockCacheService.get).toHaveBeenCalled();
      expect(mockDatabaseFunctions.get).not.toHaveBeenCalled();
    });

    it('deve consultar banco de dados apenas se cache está vazio', async () => {
      const id = 'user123';
      const userData = { id: 'user123', nome: 'DB User' };

      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockReturnValue(userData)
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      await repository.getUserById(id);

      expect(mockDatabaseFunctions.get).toHaveBeenCalled();
    });

    it('deve usar ref correto apontando para profiles/{id}', async () => {
      const id = 'user123';

      mockCacheService.get.mockResolvedValue(null);

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(false),
        val: jest.fn()
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      await repository.getUserById(id);

      expect(mockDatabaseFunctions.ref).toHaveBeenCalledWith(expect.anything(), `profiles/${id}`);
    });

    it('deve retornar null em caso de exceção durante execução', async () => {
      const id = 'user123';
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      mockCacheService.get.mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      const result = await repository.getUserById(id);

      expect(result).toBeNull();
      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Integração e performance', () => {
    it('deve recuperar múltiplos usuários em cache sequencialmente', async () => {
      const users = [
        { id: 'user1', nome: 'User 1' },
        { id: 'user2', nome: 'User 2' },
        { id: 'user3', nome: 'User 3' }
      ];

      mockCacheService.get.mockImplementation((key: string) => {
        const userId = key.replace('user_', '');
        const user = users.find(u => u.id === userId);
        return Promise.resolve(user || null);
      });

      for (const user of users) {
        const result = await repository.getUserById(user.id);
        expect(result).toEqual(user);
      }

      expect(mockCacheService.get).toHaveBeenCalledTimes(users.length);
      expect(mockDatabaseFunctions.get).not.toHaveBeenCalled();
    });

    it('deve cachear resultado após primeira busca do banco de dados', async () => {
      const id = 'user123';
      const userData = { id: 'user123', nome: 'John' };

      let callCount = 0;
      mockCacheService.get.mockImplementation(() => {
        callCount++;
        if (callCount < 2) {
          return Promise.resolve(null);
        }
        return Promise.resolve(userData);
      });

      const mockSnapshot = {
        exists: jest.fn().mockReturnValue(true),
        val: jest.fn().mockReturnValue(userData)
      };

      mockDatabaseFunctions.ref.mockReturnValue({} as any);
      mockDatabaseFunctions.get.mockResolvedValue(mockSnapshot as any);

      // Primeira chamada - busca do banco
      const result1 = await repository.getUserById(id);
      expect(result1).toEqual(userData);
      expect(mockDatabaseFunctions.get).toHaveBeenCalledTimes(1);

      // Segunda chamada - deve usar cache
      const result2 = await repository.getUserById(id);
      expect(result2).toEqual(userData);
      expect(mockDatabaseFunctions.get).toHaveBeenCalledTimes(1); // Não deve chamar novamente
    });
  });
});
