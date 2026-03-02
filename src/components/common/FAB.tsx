/**
 * Floating action button — green circle with "+" icon.
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {lightColors as colors} from '@/theme/colors';
import {shadows} from '@/theme/metrics';

interface FABProps {
  onPress: () => void;
  style?: ViewStyle;
  icon?: string;
}

export const FAB: React.FC<FABProps> = ({onPress, style, icon = '+'}) => (
  <TouchableOpacity
    style={[styles.fab, style]}
    onPress={onPress}
    activeOpacity={0.8}
    accessibilityRole="button"
    accessibilityLabel="Add">
    <Text style={styles.icon}>{icon}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.fabBackground,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    ...shadows.lg,
  },
  icon: {
    fontSize: 28,
    color: colors.fabIcon,
    fontWeight: '300',
    marginTop: -2,
  },
});
