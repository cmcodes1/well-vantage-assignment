/**
 * Pressable button with loading state, variants, and accessibility.
 */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {lightColors as colors} from '@/theme/colors';
import {fontSize, fontWeight, radius, spacing, shadows} from '@/theme/metrics';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  style,
  textStyle,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{disabled: isDisabled, busy: loading}}
      accessibilityLabel={title}
      style={({pressed}) => [
        styles.base,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? '#fff' : colors.primary}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            variantTextStyles[variant],
            sizeTextStyles[size],
            isDisabled && styles.disabledText,
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius['2xl'],
    flexDirection: 'row',
    ...shadows.sm,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.85,
    transform: [{scale: 0.98}],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: fontWeight.semiBold,
  },
  disabledText: {
    color: colors.disabled,
  },
});

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {backgroundColor: colors.primary},
  secondary: {backgroundColor: colors.success},
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  ghost: {backgroundColor: 'transparent'},
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: {color: '#fff'},
  secondary: {color: '#fff'},
  outline: {color: colors.primary},
  ghost: {color: colors.primary},
};

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: {paddingVertical: spacing.xs, paddingHorizontal: spacing.md},
  md: {paddingVertical: spacing.sm, paddingHorizontal: spacing.base},
  lg: {paddingVertical: spacing.md, paddingHorizontal: spacing.xl},
};

const sizeTextStyles: Record<ButtonSize, TextStyle> = {
  sm: {fontSize: fontSize.sm},
  md: {fontSize: fontSize.base},
  lg: {fontSize: fontSize.md},
};
