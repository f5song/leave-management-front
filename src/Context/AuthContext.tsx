import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/Api/auth-service';
import { useQueryClient } from '@tanstack/react-query';
import { getUserById } from '@/Api/users-service';
import { IUser } from '@/Interfaces/user.interface';
import { IAuthContextType } from '@/Interfaces/auth.interface';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
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

  const login = (userData: IUser) => {
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
