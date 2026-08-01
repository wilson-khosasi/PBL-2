import { useCallback, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/authApi';
import type { AuthUser } from '../types/auth';
import { AuthContext, type AuthContextValue } from './authContext';

const TOKEN_STORAGE_KEY = 'event-registration-token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  }, []);

  const signIn = useCallback((token: string, authenticatedUser: AuthUser) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    setUser(authenticatedUser);
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);

      if (!token) {
        setIsRestoringSession(false);
        return;
      }

      try {
        const authenticatedUser = await authApi.getCurrentUser(token);
        setUser(authenticatedUser);
      } catch {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
      } finally {
        setIsRestoringSession(false);
      }
    };

    void restoreSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isRestoringSession, signIn, logout }),
    [user, isRestoringSession, signIn, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
