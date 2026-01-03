import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/product';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock user data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin Adminov',
    email: 'admin@bozoruz.com',
    phone: '+998901234567',
    isAdmin: true,
  },
  {
    id: '2',
    name: 'Foydalanuvchi',
    email: 'user@example.com',
    phone: '+998907654321',
  },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        // Mock authentication - in real app, this would call an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const user = MOCK_USERS.find(u => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      register: async (name, email, password) => {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const newUser: User = {
          id: Date.now().toString(),
          name,
          email,
          isAdmin: false,
        };
        
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateProfile: (updates) => {
        const user = get().user;
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
