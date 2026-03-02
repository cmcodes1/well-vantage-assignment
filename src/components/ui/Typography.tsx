/**
 * Typography component for consistent text rendering.
 */

import React from 'react';
import {Text as RNText, TextProps, StyleSheet, TextStyle} from 'react-native';
import {lightColors as colors} from '@/theme/colors';
import {fontSize, fontWeight, lineHeight as lh} from '@/theme/metrics';

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  bold?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color,
  align,
  bold,
  style,
  children,
  ...rest
}) => (
  <RNText
    style={[
      variantStyles[variant],
      color ? {color} : undefined,
      align ? {textAlign: align} : undefined,
      bold ? {fontWeight: fontWeight.bold} : undefined,
      style,
    ]}
    {...rest}>
    {children}
  </RNText>
);

const variantStyles = StyleSheet.create<Record<TypographyVariant, TextStyle>>({
  h1: {
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight.bold,
    lineHeight: fontSize['4xl'] * lh.tight,
    color: colors.text,
  },
  h2: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    lineHeight: fontSize['3xl'] * lh.tight,
    color: colors.text,
  },
  h3: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize['2xl'] * lh.tight,
    color: colors.text,
  },
  h4: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.xl * lh.normal,
    color: colors.text,
  },
  body: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.base * lh.normal,
    color: colors.text,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.sm * lh.normal,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.xs * lh.normal,
    color: colors.textSecondary,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.sm * lh.normal,
    color: colors.text,
  },
});
