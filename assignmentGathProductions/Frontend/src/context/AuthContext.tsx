import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import type { User } from '@/types/auth';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => Promise<void>;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [refreshToken, setRefreshTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (newAccessToken: string, newRefreshToken: string, newUser: User) => {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setAccessTokenState(newAccessToken);
    setRefreshTokenState(newRefreshToken);
    setUser(newUser);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      // Silently fail - we're logging out anyway
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      setAccessTokenState(null);
      setRefreshTokenState(null);
      setUser(null);
    }
  };

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    setAccessTokenState(token);
  };

  const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token);
    setRefreshTokenState(token);
  };

  const refreshSession = async () => {
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (!storedRefreshToken) {
      await logout();
      return;
    }

    try {
      const response = await authService.refreshAccessToken(storedRefreshToken);
      setAccessToken(response.accessToken);
      setRefreshTokenState(response.refreshToken);
    } catch {
      await logout();
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedAccessToken = localStorage.getItem('accessToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUser = localStorage.getItem('user');

    if (storedAccessToken && storedRefreshToken && storedUser) {
      setAccessTokenState(storedAccessToken);
      setRefreshTokenState(storedRefreshToken);
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch {
          await logout();
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken && !!user,
    isLoading,
    login,
    logout,
    setAccessToken,
    setRefreshToken,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
export type { User, AuthContextType };
