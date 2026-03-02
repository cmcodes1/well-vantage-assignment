/**
 * Global auth store — Zustand with MMKV persistence.
 */

import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {storage} from '@/services/storage';
import type {User} from '@/types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

/**
 * Zustand storage adapter for react-native-mmkv.
 */
const zustandMmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setToken: (token: string) => set({token, isAuthenticated: true}),

      setUser: (user: User) => set({user}),

      logout: () => set({token: null, user: null, isAuthenticated: false}),

      setLoading: (isLoading: boolean) => set({isLoading}),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandMmkvStorage),
      partialize: state => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
