/**
 * Typography presets for the WellVantage app.
 * Based on the design mockups — clean, readable, modern sans-serif.
 */

import {TextStyle, Platform} from 'react-native';
import {moderateScale} from './metrics';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

/** Font size tokens */
export const typographySize = {
  xs: moderateScale(10),
  sm: moderateScale(12),
  base: moderateScale(14),
  md: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  '2xl': moderateScale(24),
  '3xl': moderateScale(28),
  '4xl': moderateScale(32),
} as const;

/** Font weight tokens */
export const typographyWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

/** Pre-built text style presets matching the design */
export const textPresets: Record<string, TextStyle> = {
  // Headings
  h1: {
    fontFamily,
    fontSize: typographySize['4xl'],
    fontWeight: typographyWeight.bold,
    lineHeight: typographySize['4xl'] * 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily,
    fontSize: typographySize['3xl'],
    fontWeight: typographyWeight.bold,
    lineHeight: typographySize['3xl'] * 1.25,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily,
    fontSize: typographySize['2xl'],
    fontWeight: typographyWeight.semiBold,
    lineHeight: typographySize['2xl'] * 1.3,
  },
  h4: {
    fontFamily,
    fontSize: typographySize.xl,
    fontWeight: typographyWeight.semiBold,
    lineHeight: typographySize.xl * 1.35,
  },

  // Body text
  body: {
    fontFamily,
    fontSize: typographySize.base,
    fontWeight: typographyWeight.regular,
    lineHeight: typographySize.base * 1.5,
  },
  bodyMedium: {
    fontFamily,
    fontSize: typographySize.base,
    fontWeight: typographyWeight.medium,
    lineHeight: typographySize.base * 1.5,
  },
  bodySmall: {
    fontFamily,
    fontSize: typographySize.sm,
    fontWeight: typographyWeight.regular,
    lineHeight: typographySize.sm * 1.5,
  },
  bodyLarge: {
    fontFamily,
    fontSize: typographySize.md,
    fontWeight: typographyWeight.regular,
    lineHeight: typographySize.md * 1.5,
  },

  // Utility
  caption: {
    fontFamily,
    fontSize: typographySize.xs,
    fontWeight: typographyWeight.regular,
    lineHeight: typographySize.xs * 1.4,
  },
  label: {
    fontFamily,
    fontSize: typographySize.sm,
    fontWeight: typographyWeight.medium,
    lineHeight: typographySize.sm * 1.4,
  },
  button: {
    fontFamily,
    fontSize: typographySize.md,
    fontWeight: typographyWeight.semiBold,
    lineHeight: typographySize.md * 1.25,
  },
  tabLabel: {
    fontFamily,
    fontSize: typographySize.base,
    fontWeight: typographyWeight.medium,
    lineHeight: typographySize.base * 1.3,
  },
  headerTitle: {
    fontFamily,
    fontSize: typographySize.lg,
    fontWeight: typographyWeight.bold,
    lineHeight: typographySize.lg * 1.3,
  },
  badge: {
    fontFamily,
    fontSize: typographySize.sm,
    fontWeight: typographyWeight.bold,
    lineHeight: typographySize.sm * 1.3,
  },
  inputText: {
    fontFamily,
    fontSize: typographySize.base,
    fontWeight: typographyWeight.regular,
    lineHeight: typographySize.base * 1.4,
  },
  inputLabel: {
    fontFamily,
    fontSize: typographySize.sm,
    fontWeight: typographyWeight.medium,
    lineHeight: typographySize.sm * 1.4,
  },
} as const;
