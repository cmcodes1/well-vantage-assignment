/**
 * Day badge — green pill showing "Day 1", "Day 2", etc.
 */

import React from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';

interface DayBadgeProps {
  day: number;
  style?: ViewStyle;
}

export const DayBadge: React.FC<DayBadgeProps> = ({day, style}) => (
  <View style={[styles.badge, style]}>
    <Text style={styles.text}>Day {day}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.badgeBackground,
    borderTopLeftRadius: radius['2xl'],
    borderBottomLeftRadius: radius['2xl'],
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    alignSelf: 'flex-start',
  },
  text: {
    ...textPresets.badge,
    color: colors.badgeText,
  },
});
