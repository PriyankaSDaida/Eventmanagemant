import { User } from '../types';

const STORAGE_KEY = 'eh_user';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email.includes('error')) {
      throw new Error('Invalid credentials');
    }

    const user: User = {
      id: 'u1',
      name: email.split('@')[0],
      email: email,
      role: 'USER'
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'USER'
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  }
};