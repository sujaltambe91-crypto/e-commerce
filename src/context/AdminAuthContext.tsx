import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types/index.ts';

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  changeCredentials: (
    currentPassword: string,
    newUsername?: string,
    newPassword?: string
  ) => Promise<{ success: boolean; error?: string }>;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_TOKEN_KEY = 'shopkart_admin_token_v1';

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  });
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Authenticated fetch helper
  const authFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return fetch(url, { ...options, headers });
  };

  // Verify session on mount or token change
  useEffect(() => {
    let isMounted = true;
    const verify = async () => {
      if (!token) {
        setAdminUser(null);
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setAdminUser(data.user);
        } else {
          // Token invalid or expired
          if (isMounted) {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            setToken(null);
            setAdminUser(null);
          }
        }
      } catch {
        if (isMounted) {
          setAdminUser(null);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    verify();
    return () => {
      isMounted = false;
    };
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      setAdminUser(data.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Connection error while connecting to server.' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } finally {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      setToken(null);
      setAdminUser(null);
    }
  };

  const changeCredentials = async (
    currentPassword: string,
    newUsername?: string,
    newPassword?: string
  ) => {
    try {
      const res = await authFetch('/api/auth/change-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newUsername, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Failed to update credentials' };
      }
      if (newUsername && adminUser) {
        setAdminUser({ ...adminUser, username: newUsername });
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Network error updating credentials' };
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        token,
        isAuthenticated: !!adminUser,
        isLoading,
        login,
        logout,
        changeCredentials,
        authFetch,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
