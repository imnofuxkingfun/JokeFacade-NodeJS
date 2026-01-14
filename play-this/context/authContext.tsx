'use client'
import React, { createContext, useContext, useState } from 'react';
import { logout as logoutAction } from '@/actions/auth';

// 1. Definim structura datelor pentru User
interface User {
  id: string;
  username: string;
  email: string;
  role: {
    id: string;
  };
}

// 2. Definim ce conține Contextul (date + funcții)
interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// 3. Creăm Contextul propriu-zis (Aici lipsea codul tău!)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ 
  children, 
  initialUser 
}: { 
  children: React.ReactNode, 
  initialUser: User | null 
}) => {
  // Inițializăm starea cu datele venite de la server (din layout.tsx)
  const [user, setUser] = useState<User | null>(initialUser);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    // Aici poți adăuga un apel către un Server Action care șterge cookie-ul
    await logoutAction();
    setUser(null);

    window.location.href = '/login';
  };

  return (
    // 4. Folosim AuthContext.Provider creat mai sus
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Hook personalizat pentru a folosi contextul mai ușor
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};