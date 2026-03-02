/**
 * Fast, synchronous key-value storage powered by react-native-mmkv.
 * Use this instead of AsyncStorage for better performance.
 */

import {createMMKV} from 'react-native-mmkv';
import type {MMKV} from 'react-native-mmkv';

export const storage: MMKV = createMMKV({
  id: 'wellvantage-storage',
});

/** Typed helpers for common patterns */
export const StorageKeys = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  ONBOARDED: 'onboarded',
  THEME: 'theme',
} as const;

type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

export const storageService = {
  setString: (key: StorageKey, value: string) => storage.set(key, value),

  getString: (key: StorageKey) => storage.getString(key),

  setObject: <T>(key: StorageKey, value: T) =>
    storage.set(key, JSON.stringify(value)),

  getObject: <T>(key: StorageKey): T | null => {
    const raw = storage.getString(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  setBoolean: (key: StorageKey, value: boolean) => storage.set(key, value),

  getBoolean: (key: StorageKey) => storage.getBoolean(key),

  remove: (key: StorageKey) => storage.remove(key),

  clearAll: () => storage.clearAll(),
};
