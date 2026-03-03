/**
 * Green app header with title, optional left/right icons.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {lightColors as colors} from '@/theme/colors';
import {spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onRefreshPress?: () => void;
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  onMenuPress,
  onRefreshPress,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}, style]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.headerBackground}
      />
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {onMenuPress && (
            <TouchableOpacity
              onPress={onMenuPress}
              style={styles.iconButton}
              accessibilityLabel="Menu">
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rightSection}>
          {onRefreshPress && (
            <TouchableOpacity
              onPress={onRefreshPress}
              style={styles.iconButton}
              accessibilityLabel="Refresh">
              <Text style={styles.iconText}>↻</Text>
            </TouchableOpacity>
          )}
          {onBackPress && (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.iconButton}
              accessibilityLabel="Go back">
              <Text style={styles.iconText}>←</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.headerBackground,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 48,
    justifyContent: 'flex-end',
  },
  title: {
    ...textPresets.headerTitle,
    color: colors.headerText,
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    padding: spacing.xs,
    marginHorizontal: spacing.xxs,
  },
  iconText: {
    fontSize: 22,
    color: colors.headerText,
    fontWeight: '700',
  },
});
