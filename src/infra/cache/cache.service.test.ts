/// <reference types="jest" />
import { CacheService } from './cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('set()', () => {
    it('deve armazenar dados no localStorage com sucesso', async () => {
      const key = 'test_key';
      const value = { id: 1, name: 'Test' };
      const ttl = 5000;

      await CacheService.set(key, value, ttl);

      const stored = localStorage.getItem(key);
      expect(stored).toBeDefined();
      expect(JSON.parse(stored!).value).toEqual(value);
    });

    it('deve usar TTL padrão de 5 minutos se não fornecido', async () => {
      const key = 'test_key_default';
      const value = { data: 'test' };

      await CacheService.set(key, value);

      const stored = localStorage.getItem(key);
      const parsed = JSON.parse(stored!);
      expect(parsed.ttl).toBe(5 * 60 * 1000); // 5 minutos em ms
    });

    it('deve armazenar timestamp ao salvar', async () => {
      const key = 'test_key_timestamp';
      const value = { data: 'test' };
      const beforeTime = Date.now();

      await CacheService.set(key, value);

      const stored = localStorage.getItem(key);
      const parsed = JSON.parse(stored!);
      expect(parsed.timestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(parsed.timestamp).toBeLessThanOrEqual(Date.now());
    });

    it('deve serializar objetos complexos corretamente', async () => {
      const key = 'complex_object';
      const value = {
        id: 1,
        name: 'User',
        data: {
          email: 'test@example.com',
          age: 25
        },
        tags: ['admin', 'user']
      };

      await CacheService.set(key, value);

      const stored = localStorage.getItem(key);
      const parsed = JSON.parse(stored!);
      expect(parsed.value).toEqual(value);
    });

    it('deve lidar com erros ao salvar no localStorage', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage full');
      });

      const key = 'error_key';
      const value = { data: 'test' };

      await CacheService.set(key, value);

      expect(consoleSpy).toHaveBeenCalledWith(
        '❌ [Cache] Erro ao salvar cache:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
      jest.spyOn(Storage.prototype, 'setItem').mockRestore();
    });
  });

  describe('get()', () => {
    it('deve recuperar dados válidos do cache', async () => {
      const key = 'test_key';
      const value = { id: 1, name: 'Test' };
      await CacheService.set(key, value);

      const result = await CacheService.get(key);

      expect(result).toEqual(value);
    });

    it('deve retornar null quando chave não existe', async () => {
      const result = await CacheService.get('non_existent_key');

      expect(result).toBeNull();
    });

    it('deve retornar null quando cache expirou', async () => {
      const key = 'expired_key';
      const value = { data: 'test' };
      const ttl = 100; // 100ms

      await CacheService.set(key, value, ttl);

      // Espera o cache expirar
      await new Promise(resolve => setTimeout(resolve, 150));

      const result = await CacheService.get(key);

      expect(result).toBeNull();
      expect(localStorage.getItem(key)).toBeNull();
    });

    it('deve manter dados válidos que não expiraram', async () => {
      const key = 'valid_key';
      const value = { data: 'test' };
      const ttl = 10000; // 10 segundos

      await CacheService.set(key, value, ttl);

      const result = await CacheService.get(key);

      expect(result).toEqual(value);
      expect(localStorage.getItem(key)).toBeDefined();
    });

    it('deve lidar com dados corrompidos no localStorage', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      const key = 'corrupted_key';
      localStorage.setItem(key, 'invalid json {]');

      const result = await CacheService.get(key);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        '❌ [Cache] Erro ao ler cache:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('deve preservar tipos de dados recuperados do cache', async () => {
      const key = 'typed_data';
      const value = {
        string: 'text',
        number: 42,
        boolean: true,
        array: [1, 2, 3],
        nested: { prop: 'value' }
      };

      await CacheService.set(key, value);
      const result = await CacheService.get<typeof value>(key);

      expect(result).toEqual(value);
      expect(typeof result?.string).toBe('string');
      expect(typeof result?.number).toBe('number');
      expect(typeof result?.boolean).toBe('boolean');
      expect(Array.isArray(result?.array)).toBe(true);
    });

    it('deve remover cache automaticamente quando expirado', async () => {
      const key = 'auto_remove_key';
      const value = { data: 'test' };
      const ttl = 50;

      await CacheService.set(key, value, ttl);
      expect(localStorage.getItem(key)).toBeDefined();

      await new Promise(resolve => setTimeout(resolve, 100));

      await CacheService.get(key);

      expect(localStorage.getItem(key)).toBeNull();
    });
  });

  describe('clear()', () => {
    it('deve remover dados do localStorage com sucesso', async () => {
      const key = 'clear_test_key';
      const value = { data: 'test' };

      await CacheService.set(key, value);
      expect(localStorage.getItem(key)).toBeDefined();

      await CacheService.clear(key);

      expect(localStorage.getItem(key)).toBeNull();
    });

    it('deve não lançar erro ao limpar chave inexistente', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      await CacheService.clear('non_existent_key');

      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('deve limpar múltiplas chaves independentemente', async () => {
      const key1 = 'clear_key_1';
      const key2 = 'clear_key_2';
      const value = { data: 'test' };

      await CacheService.set(key1, value);
      await CacheService.set(key2, value);

      await CacheService.clear(key1);

      expect(localStorage.getItem(key1)).toBeNull();
      expect(localStorage.getItem(key2)).toBeDefined();
    });

    it('deve lidar com erros ao remover do localStorage', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
        throw new Error('Remove failed');
      });

      const key = 'error_clear_key';

      await CacheService.clear(key);

      expect(consoleSpy).toHaveBeenCalledWith(
        '❌ [Cache] Erro ao limpar cache:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
      jest.spyOn(Storage.prototype, 'removeItem').mockRestore();
    });
  });

  describe('Integração', () => {
    it('deve funcionar com ciclo completo set -> get -> clear', async () => {
      const key = 'integration_key';
      const value = { id: 1, name: 'Integration Test' };

      // Set
      await CacheService.set(key, value);
      expect(localStorage.getItem(key)).toBeDefined();

      // Get
      const retrieved = await CacheService.get(key);
      expect(retrieved).toEqual(value);

      // Clear
      await CacheService.clear(key);
      expect(localStorage.getItem(key)).toBeNull();

      // Get após clear
      const afterClear = await CacheService.get(key);
      expect(afterClear).toBeNull();
    });

    it('deve manter múltiplos itens em cache simultaneamente', async () => {
      const items = [
        { key: 'item1', value: { data: 'test1' } },
        { key: 'item2', value: { data: 'test2' } },
        { key: 'item3', value: { data: 'test3' } }
      ];

      // Set todos os itens
      for (const item of items) {
        await CacheService.set(item.key, item.value);
      }

      // Get todos os itens
      for (const item of items) {
        const retrieved = await CacheService.get(item.key);
        expect(retrieved).toEqual(item.value);
      }

      // Verify todos ainda existem no localStorage
      expect(localStorage.length).toBe(items.length);
    });
  });
});
