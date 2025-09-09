import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/Api/auth-service';

interface User {
  id: string;
  googleId: string;
  firstName: string;
  lastName: string;
  nickName: string;
  avatarUrl: string;
  birthDate: Date;
  jobTitleId: string;
  departmentId: string;
  email: string;
  role: string; // backend ส่ง role
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData && userData.id) {
          setUser(userData); // ใช้ role ที่ backend ส่งมา
          console.log('user form auth', userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    authService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
