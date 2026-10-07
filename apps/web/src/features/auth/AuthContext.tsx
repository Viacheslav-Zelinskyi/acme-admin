import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react';
import * as authService from './authService';
import type { AuthUser } from './authService';

export interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => authService.getStoredUser());

  const login = useCallback(async (email: string, password: string) => {
    setUser(await authService.login(email, password));
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setUser(await authService.register(name, email, password));
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
