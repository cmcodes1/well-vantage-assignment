/**
 * App-wide UI store (theme preference, modals, etc.)
 */

import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {storage} from '@/services/storage';

type ThemeMode = 'light' | 'dark' | 'system';

interface AppState {
  themeMode: ThemeMode;
  hasOnboarded: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setOnboarded: (value: boolean) => void;
}

const zustandMmkvStorage = {
  getItem: (name: string) => storage.getString(name) ?? null,
  setItem: (name: string, value: string) => storage.set(name, value),
  removeItem: (name: string) => storage.remove(name),
};

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      themeMode: 'system',
      hasOnboarded: false,

      setThemeMode: (themeMode: ThemeMode) => set({themeMode}),
      setOnboarded: (hasOnboarded: boolean) => set({hasOnboarded}),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => zustandMmkvStorage),
    },
  ),
);
