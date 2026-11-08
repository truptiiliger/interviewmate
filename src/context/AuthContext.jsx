import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'user-001',
  fullName: 'Aarav Patel',
  email: 'aarav.patel@example.com',
  education: 'B.Tech in Computer Science',
  collegeName: 'National Institute of Technology',
  graduationYear: '2025',
  experienceLevel: 'Fresher (0-1 yrs)',
  preferredLanguages: ['Python', 'JavaScript', 'C++'],
  targetJobRole: 'Software Development Engineer (SDE 1)',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  createdAt: '2024-01-15'
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('interviewmate_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register' | 'forgot' | 'profile'

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('interviewmate_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('interviewmate_user');
    }
  }, [currentUser]);

  const login = (email, password) => {
    // In real backend, verify with API/Supabase. Here we authenticate candidate
    const user = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      fullName: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Candidate'
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return { success: true, user };
  };

  const register = (userData) => {
    const newUser = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName || 'Candidate',
      email: userData.email,
      education: userData.education || 'B.Tech Computer Science',
      collegeName: userData.collegeName || 'Engineering Institute',
      graduationYear: userData.graduationYear || '2025',
      experienceLevel: userData.experienceLevel || 'Fresher',
      preferredLanguages: userData.preferredLanguages || ['Python', 'JavaScript'],
      targetJobRole: userData.targetJobRole || 'Software Development Engineer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true, user: newUser };
  };

  const updateProfile = (updatedFields) => {
    setCurrentUser(prev => ({ ...prev, ...updatedFields }));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const openAuth = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthModalOpen,
      authModalTab,
      setAuthModalTab,
      openAuth,
      closeAuth,
      login,
      register,
      updateProfile,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
