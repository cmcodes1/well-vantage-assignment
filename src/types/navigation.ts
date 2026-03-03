/**
 * Navigation type declarations.
 * Keep all param lists here so screens get type-safe route params.
 */

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {NavigatorScreenParams} from '@react-navigation/native';

// ── Root Stack ──────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  MainTabs: NavigatorScreenParams<MainStackParamList>;
};

// ── Auth Stack ──────────────────────────────────────────
export type AuthStackParamList = {
  Login: undefined;
};

// ── Main Stack (screens within main flow) ───────────────
export type MainStackParamList = {
  HomeTabs: {activeTab?: string} | undefined;
  AddWorkoutPlan: {planId?: string} | undefined;
  SetAvailability: undefined;
  BookClientSlots: undefined;
};

// ── Screen prop types ───────────────────────────────────
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

// ── Global declaration for useNavigation ────────────────
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
