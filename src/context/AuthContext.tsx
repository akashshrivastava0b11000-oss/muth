import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, StartupStage } from '../types';
import { storage, DEMO_FOUNDER_USER, DEMO_FREELANCER_USER } from '../services/storageService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsDemo: (role: 'founder' | 'freelancer') => void;
  register: (name: string, email: string, role: UserRole) => Promise<User>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  completeOnboarding: (data: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => storage.getCurrentUser());

  useEffect(() => {
    // Keep local storage in sync
    if (user) {
      storage.setCurrentUser(user);
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    const users = storage.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setUser(existing);
      storage.setCurrentUser(existing);
      return true;
    }
    // Default fallback to founder if test email
    const newUser: User = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: 'founder',
      onboardingCompleted: false,
      createdAt: new Date().toISOString()
    };
    storage.saveUser(newUser);
    setUser(newUser);
    return true;
  };

  const loginAsDemo = (role: 'founder' | 'freelancer') => {
    const demoUser = role === 'founder' ? DEMO_FOUNDER_USER : DEMO_FREELANCER_USER;
    setUser(demoUser);
    storage.setCurrentUser(demoUser);
    storage.saveUser(demoUser);
  };

  const register = async (name: string, email: string, role: UserRole): Promise<User> => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      onboardingCompleted: false,
      createdAt: new Date().toISOString()
    };
    storage.saveUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    storage.setCurrentUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    storage.saveUser(updated);
  };

  const completeOnboarding = (data: any) => {
    if (!user) return;
    const updated: User = {
      ...user,
      onboardingCompleted: true,
      location: data.location || user.location,
      ...(user.role === 'founder'
        ? {
            founderProfile: {
              stage: (data.stage as StartupStage) || 'idea',
              industry: data.industry || 'Technology',
              supportNeeds: data.supportNeeds || [],
              preferredMentorship: data.preferredMentorship || []
            }
          }
        : {
            freelancerProfile: {
              title: data.title || 'Professional Specialist',
              skills: data.skills || [],
              category: data.category || 'Services',
              experienceYears: data.experienceYears || 3,
              hourlyRate: data.hourlyRate || 2500,
              availability: 'Available Now',
              portfolioUrls: data.portfolioUrls || [],
              services: data.services || [],
              rating: 5.0,
              reviewsCount: 1
            }
          })
    };

    // If founder provided an initial venture during onboarding, create it
    if (user.role === 'founder' && data.ventureName) {
      storage.addVenture({
        userId: user.id,
        name: data.ventureName,
        tagline: data.ventureTagline || '',
        description: data.ventureDescription || '',
        industry: data.industry || 'Technology',
        location: data.location || 'India',
        stage: data.stage || 'idea',
        businessModel: data.businessModel || 'B2B SaaS',
        targetAudience: data.targetAudience || 'Early adopters',
        problemSolved: data.problemSolved || '',
        isArchived: false
      });
    }

    setUser(updated);
    storage.saveUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        register,
        logout,
        updateUser,
        completeOnboarding
      }}
    >
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
