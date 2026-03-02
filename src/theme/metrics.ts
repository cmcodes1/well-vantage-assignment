import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// Base dimensions (iPhone 14 Pro)
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

/**
 * Scale a value proportionally to screen width.
 */
export const scale = (size: number): number =>
  (SCREEN_WIDTH / BASE_WIDTH) * size;

/**
 * Scale a value proportionally to screen height.
 */
export const verticalScale = (size: number): number =>
  (SCREEN_HEIGHT / BASE_HEIGHT) * size;

/**
 * Scale with a dampening factor (0.5 default).
 * Useful for font sizes where full scaling feels too extreme.
 */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

/** Spacing scale (4-pt grid) */
export const spacing = {
  xxs: scale(2),
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  base: scale(16),
  lg: scale(20),
  xl: scale(24),
  '2xl': scale(32),
  '3xl': scale(40),
  '4xl': scale(48),
  '5xl': scale(64),
} as const;

/** Border radius tokens */
export const radius = {
  none: 0,
  xs: scale(2),
  sm: scale(4),
  md: scale(8),
  lg: scale(12),
  xl: scale(16),
  '2xl': scale(24),
  full: 9999,
} as const;

/** Font size scale */
export const fontSize = {
  xs: moderateScale(10),
  sm: moderateScale(12),
  base: moderateScale(14),
  md: moderateScale(16),
  lg: moderateScale(18),
  xl: moderateScale(20),
  '2xl': moderateScale(24),
  '3xl': moderateScale(30),
  '4xl': moderateScale(36),
  '5xl': moderateScale(48),
} as const;

/** Line-height multipliers */
export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

/** Font weight tokens */
export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

/** Shadow presets (iOS & Android) */
export const shadows = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {elevation: 1},
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {elevation: 3},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {elevation: 6},
  }),
  xl: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: {elevation: 10},
  }),
} as const;

/** Hit-slop preset for small touchable areas */
export const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

/** Screen dimensions */
export {SCREEN_WIDTH, SCREEN_HEIGHT};

/** Is the device a notch device (approximate) */
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isSmallDevice = SCREEN_WIDTH < 375;
export const pixelRatio = PixelRatio.get();
