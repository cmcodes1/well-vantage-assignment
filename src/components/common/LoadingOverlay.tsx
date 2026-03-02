/**
 * Full-screen loading indicator.
 */

import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {lightColors as colors} from '@/theme/colors';

interface LoadingOverlayProps {
  visible?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
});
