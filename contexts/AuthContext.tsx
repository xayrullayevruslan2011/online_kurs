
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  unlockCourse: (courseId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('lms_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    if (email === 'admin@test.com' && password === '123') {
      const adminUser: User = {
        id: 'admin-1',
        email: 'admin@test.com',
        role: 'admin',
        fullName: 'Asosiy Admin',
        ownedCourses: []
      };
      setUser(adminUser);
      localStorage.setItem('lms_user', JSON.stringify(adminUser));
    } else {
      const studentUser: User = {
        id: 'student-1',
        email: email,
        role: 'student',
        fullName: email.split('@')[0],
        ownedCourses: ['c1'] // Pre-unlock one course for demo
      };
      setUser(studentUser);
      localStorage.setItem('lms_user', JSON.stringify(studentUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };

  const unlockCourse = (courseId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        ownedCourses: [...user.ownedCourses, courseId]
      };
      setUser(updatedUser);
      localStorage.setItem('lms_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, unlockCourse }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
