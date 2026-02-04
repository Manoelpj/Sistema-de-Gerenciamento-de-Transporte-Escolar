import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { AuthApi, TokenManager, type User } from "../services/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica se há um token válido ao iniciar
    const checkAuth = async () => {
      if (TokenManager.isAuthenticated()) {
        try {
          const userData = await AuthApi.me();
          setUser(userData);
        } catch {
          TokenManager.clearTokens();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await AuthApi.login(email, password);
    setUser(response.user);
  };

  const register = async (email: string, username: string, password: string) => {
    const response = await AuthApi.register(email, username, password);
    setUser(response.user);
  };

  const logout = async () => {
    await AuthApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
