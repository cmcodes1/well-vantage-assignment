/**
 * Horizontal tab bar — Workout | Client | Availability.
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {lightColors as colors} from '@/theme/colors';
import {spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';

interface Tab {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabPress: (key: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({tabs, activeTab, onTabPress}) => (
  <View style={styles.container}>
    {tabs.map(tab => {
      const isActive = tab.key === activeTab;
      return (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
          accessibilityRole="tab"
          accessibilityState={{selected: isActive}}>
          <Text
            style={[
              styles.tabText,
              isActive && styles.activeTabText,
            ]}>
            {tab.label}
          </Text>
          {isActive && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    position: 'relative',
  },
  tabText: {
    ...textPresets.tabLabel,
    color: colors.tabInactive,
  },
  activeTabText: {
    color: colors.tabActive,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: spacing.lg,
    right: spacing.lg,
    height: 3,
    backgroundColor: colors.tabUnderline,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
