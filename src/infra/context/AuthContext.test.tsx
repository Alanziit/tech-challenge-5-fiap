import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import * as firebaseAuth from 'firebase/auth';
import { AuthProvider, useAuth } from './AuthContext';

// Mock do UserController
jest.mock('../../presentation/UserController', () => ({
  UserController: jest.fn(() => ({
    getUserById: jest.fn(() =>
      Promise.resolve({
        nome: 'Test User',
        id: 'test-uid',
        email: 'test@example.com',
      })
    ),
  })),
}));

describe('AuthContext - Testes Unitários', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  // ========== TESTES DE ESTADO INICIAL ==========
  describe('1. Estado Inicial', () => {
    it('deve inicializar com valores padrão', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
      expect(result.current.profile).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.loading).toBe(false);
    });

    it('deve fornecer funções de login, signup e logout', () => {
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.login).toBe('function');
      expect(typeof result.current.signup).toBe('function');
      expect(typeof result.current.logout).toBe('function');
    });
  });

  // ========== TESTES DE LOGIN ==========
  describe('2. Funcionalidade de Login', () => {
    it('deve fazer login com sucesso com credenciais válidas', async () => {
      const mockUserCredential = {
        user: {
          uid: 'test-uid-123',
          email: 'test@example.com',
        },
      };

      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      let loginResult;
      await act(async () => {
        loginResult = await result.current.login('test@example.com', 'password123');
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.user).not.toBeNull();
      });

      expect(loginResult).toBe(true);
    });

    it('deve retornar false em caso de falha no login', async () => {
      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error('Invalid credentials')
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      let loginResult;
      await act(async () => {
        loginResult = await result.current.login('test@example.com', 'wrongpassword');
      });

      expect(loginResult).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('deve definir loading=true durante o login', async () => {
      let resolveLogin: any;
      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockImplementation(
        () => new Promise((resolve) => {
          resolveLogin = resolve;
        })
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      act(() => {
        result.current.login('test@example.com', 'password123');
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });

      // Resolvemos a promise
      act(() => {
        resolveLogin({
          user: { uid: 'test-uid', email: 'test@example.com' },
        });
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });

    it('deve chamar signInWithEmailAndPassword com email e senha corretos', async () => {
      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: { uid: 'test-uid', email: 'user@test.com' },
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.login('user@test.com', 'securepass123');
      });

      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'user@test.com',
        'securepass123'
      );
    });
  });

  // ========== TESTES DE SIGNUP ==========
  describe('3. Funcionalidade de Signup', () => {
    it('deve criar usuário com sucesso com credenciais válidas', async () => {
      const mockUserCredential = {
        user: {
          uid: 'new-uid',
          email: 'newuser@example.com',
        },
      };

      (firebaseAuth.createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      let signupResult;
      await act(async () => {
        signupResult = await result.current.signup('newuser@example.com', 'password123');
      });

      expect(signupResult).toEqual(mockUserCredential);
    });

    it('deve retornar undefined em caso de falha no signup', async () => {
      (firebaseAuth.createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error('User already exists')
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      let signupResult;
      await act(async () => {
        signupResult = await result.current.signup('existing@example.com', 'password123');
      });

      expect(signupResult).toBeUndefined();
    });

    it('deve definir loading durante signup', async () => {
      (firebaseAuth.createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: { uid: 'new-uid' },
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.signup('test@example.com', 'password123');
      });

      expect(result.current.loading).toBe(false);
    });

    it('deve chamar createUserWithEmailAndPassword com credenciais corretas', async () => {
      (firebaseAuth.createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
        user: { uid: 'new-uid' },
      });

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.signup('newuser@test.com', 'securepass456');
      });

      expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'newuser@test.com',
        'securepass456'
      );
    });
  });

  // ========== TESTES DE LOGOUT ==========
  describe('4. Funcionalidade de Logout', () => {
    it('deve fazer logout com sucesso', async () => {
      const mockUserCredential = {
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
        },
      };

      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential
      );

      (firebaseAuth.signOut as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Login primeiro
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Depois logout
      await act(async () => {
        await result.current.logout();
      });

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.user).toBeNull();
        expect(result.current.profile).toBeNull();
      });
    });

    it('deve lançar erro se logout falhar', async () => {
      (firebaseAuth.signOut as jest.Mock).mockRejectedValue(
        new Error('Logout failed')
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(
        act(async () => {
          await result.current.logout();
        })
      ).rejects.toThrow('Logout failed');
    });

    it('deve limpar todos os dados de autenticação após logout', async () => {
      const mockUserCredential = {
        user: {
          uid: 'test-uid',
          email: 'test@example.com',
        },
      };

      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredential
      );

      (firebaseAuth.signOut as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Login
      await act(async () => {
        await result.current.login('test@example.com', 'password123');
      });

      // Logout
      await act(async () => {
        await result.current.logout();
      });

      await waitFor(() => {
        expect(result.current.user).toBeNull();
        expect(result.current.profile).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
      });
    });

    it('deve chamar signOut do Firebase', async () => {
      (firebaseAuth.signOut as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper });

      await act(async () => {
        await result.current.logout();
      });

      expect(firebaseAuth.signOut).toHaveBeenCalled();
    });
  });

  // ========== TESTES DE TRATAMENTO DE ERROS ==========
  describe('5. Tratamento de Erros', () => {
    it('deve lidar com erros de rede graciosamente no login', async () => {
      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error('Network error')
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      const loginResult = await act(async () => {
        return await result.current.login('test@example.com', 'password123');
      });

      expect(loginResult).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('deve lidar com erro de usuário não encontrado', async () => {
      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
        new Error('User not found')
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      const loginResult = await act(async () => {
        return await result.current.login('nonexistent@example.com', 'password123');
      });

      expect(loginResult).toBe(false);
    });

    it('deve lançar erro se logout falhar no Firebase', async () => {
      (firebaseAuth.signOut as jest.Mock).mockRejectedValue(
        new Error('Firebase error')
      );

      const { result } = renderHook(() => useAuth(), { wrapper });

      await expect(
        act(async () => {
          await result.current.logout();
        })
      ).rejects.toThrow('Firebase error');
    });
  });

  // ========== TESTES DO HOOK useAuth ==========
  describe('6. Hook useAuth', () => {
    it('deve lançar erro quando usado fora do AuthProvider', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('Contexto não encontrado, useAuth deve estar dentro de AuthProvider');

      spy.mockRestore();
    });
  });

  // ========== TESTES DE FLUXO COMPLETO ==========
  describe('7. Fluxo Completo de Autenticação', () => {
    it('deve executar fluxo completo: signup -> login -> logout', async () => {
      const mockSignupCredential = {
        user: { uid: 'new-user-id', email: 'newuser@test.com' },
      };

      const mockLoginCredential = {
        user: { uid: 'new-user-id', email: 'newuser@test.com' },
      };

      (firebaseAuth.createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockSignupCredential
      );

      (firebaseAuth.signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockLoginCredential
      );

      (firebaseAuth.signOut as jest.Mock).mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth(), { wrapper });

      // Signup
      let signupResult;
      await act(async () => {
        signupResult = await result.current.signup('newuser@test.com', 'password123');
      });
      expect(signupResult).toBeDefined();

      // Login
      let loginResult;
      await act(async () => {
        loginResult = await result.current.login('newuser@test.com', 'password123');
      });
      expect(loginResult).toBe(true);
      expect(result.current.isAuthenticated).toBe(true);

      // Logout
      await act(async () => {
        await result.current.logout();
      });
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
