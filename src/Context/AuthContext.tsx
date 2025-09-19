import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/Api/auth-service';
import { useQueryClient } from '@tanstack/react-query';
import { getUserById } from '@/Api/users-service';

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
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData && userData.id) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
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

  const refreshUser = async () => {
    if (user?.id) {
      try {
        const updatedUser = await getUserById(user.id);
        setUser(updatedUser);
        // อัพเดท cache ด้วย
        queryClient.setQueryData(["user", user.id], updatedUser);
        console.log("🔄 รีเฟรช user data สำเร็จ");
      } catch (error) {
        console.error("❌ รีเฟรช user data ผิดพลาด:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, refreshUser }}>
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
