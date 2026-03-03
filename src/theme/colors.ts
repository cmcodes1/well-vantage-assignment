/**
 * App color palette — single source of truth.
 * Green-based WellVantage brand theme derived from UI mockups.
 */

export const palette = {
  // Brand
  primary: '#4CAF50',
  primaryLight: '#81C784',
  primaryDark: '#388E3C',

  // Accents
  secondary: '#43A047',
  secondaryLight: '#A5D6A7',
  secondaryDark: '#2E7D32',

  // Feedback
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Transparent
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type PaletteColor = keyof typeof palette;

export const lightColors = {
  primary: palette.primary,
  primaryDark: palette.primaryDark,
  background: palette.white,
  card: palette.gray50,
  cardBorder: palette.gray300,
  text: palette.gray900,
  textSecondary: palette.gray600,
  textMuted: palette.gray500,
  border: palette.gray300,
  borderLight: palette.gray200,
  notification: palette.error,
  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,
  disabled: palette.gray300,
  placeholder: palette.gray400,
  inputBackground: palette.white,
  headerBackground: palette.primary,
  headerText: palette.white,
  tabActive: '#28A745',
  tabInactive: '#333333',
  tabUnderline: palette.primary,
  tabBorderBottom: '#737373',
  badgeBackground: palette.primary,
  badgeText: palette.white,
  deleteIcon: palette.error,
  fabBackground: palette.primary,
  fabIcon: palette.white,
  planBorder: '#737373',
  notesText: '#737373',
  wordCounterText: '#FF9933',
  slotBorder: '#28A745',
} as const;

export const darkColors = {
  primary: palette.primaryLight,
  primaryDark: palette.primaryDark,
  background: palette.gray900,
  card: palette.gray800,
  cardBorder: palette.gray700,
  text: palette.white,
  textSecondary: palette.gray400,
  textMuted: palette.gray500,
  border: palette.gray700,
  borderLight: palette.gray800,
  notification: palette.error,
  success: palette.success,
  warning: palette.warning,
  error: palette.error,
  info: palette.info,
  disabled: palette.gray600,
  placeholder: palette.gray500,
  inputBackground: palette.gray800,
  headerBackground: palette.primaryDark,
  headerText: palette.white,
  tabActive: palette.primaryLight,
  tabInactive: palette.gray400,
  tabUnderline: palette.primaryLight,
  badgeBackground: palette.primaryDark,
  badgeText: palette.white,
  deleteIcon: palette.error,
  fabBackground: palette.primaryDark,
  fabIcon: palette.white,
} as const;

export type ThemeColors = typeof lightColors;
