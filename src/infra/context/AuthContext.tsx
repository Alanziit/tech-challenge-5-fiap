import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";
import { auth } from "../../firebaseConfig";
import { User } from "../../domain/entities/user.entity";
import { UserController } from "../../presentation/UserController";

interface IAuthContext {
  user: UserCredential | null;
  profile: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string
  ) => Promise<UserCredential | void>;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserCredential | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const userController = new UserController();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await userController.getUserById(userCredential.user.uid);
      const userProfile: User = {
        userName: user.nome,
        id: userCredential.user.uid,
        email: userCredential.user.email,
      };

      setUser(userCredential);
      setProfile(userProfile);
      setIsAuthenticated(true);
      console.info("Usuário logado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.info("Usuário cadastrado com sucesso!");
      return response;
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
      return;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    auth.signOut();
    console.log("Logout chamado, usuário deslogado com sucesso");
    setUser(null);
    setIsAuthenticated(false);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        profile,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Contexto não encontrado, useAuth deve estar dentro de AuthProvider"
    );
  }

  return context;
};

export const ReauthenticateUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    if (!auth.currentUser) return false;

    const credentials = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(auth.currentUser, credentials);

    // Se não lançar erro, a senha está correta
    return true;
  } catch (error) {
    return false;
  }
};
