/**
 * Global auth store — Zustand with MMKV persistence.
 */

import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {storage} from '@/services/storage';
import {signOutGoogle} from '@/services/googleAuth';
import type {User} from '@/types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
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

      login: (user: User, token: string) => {
        // Write token to raw MMKV key so the API client interceptor can read it
        storage.set('auth_token', token);
        set({user, token, isAuthenticated: true});
      },

      logout: () => {
        signOutGoogle().catch(() => {});
        storage.remove('auth_token');
        set({token: null, user: null, isAuthenticated: false});
      },

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
