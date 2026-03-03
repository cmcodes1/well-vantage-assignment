/**
 * Delete icon button — red trash icon.
 */

import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {DeleteIcon} from '@/components/icons';
import {lightColors as colors} from '@/theme/colors';
import {hitSlop} from '@/theme/metrics';

interface DeleteButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({onPress, style}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, style]}
    hitSlop={hitSlop}
    accessibilityRole="button"
    accessibilityLabel="Delete">
    <DeleteIcon size={20} color={colors.deleteIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
});
