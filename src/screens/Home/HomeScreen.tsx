/**
 * Workout Management — main screen with tabs (Workout | Client | Availability).
 * Workout tab shows list of custom workout plans.
 */

import React, {useState, useCallback} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, TabBar, FAB, DeleteButton} from '@/components';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';
import type {MainStackScreenProps} from '@/types/navigation';

const TABS = [
  {key: 'workout', label: 'Workout'},
  {key: 'client', label: 'Client'},
  {key: 'availability', label: 'Availability'},
];

interface WorkoutPlan {
  id: string;
  name: string;
}

const INITIAL_PLANS: WorkoutPlan[] = [
  {id: '1', name: "Beginner's Workout - 3 Days"},
  {id: '2', name: "Beginner's Full Body - 1 Day"},
];

const HomeScreen: React.FC<MainStackScreenProps<'HomeTabs'>> = ({
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState('workout');
  const [plans, setPlans] = useState<WorkoutPlan[]>(INITIAL_PLANS);

  const handleDeletePlan = useCallback((id: string) => {
    Alert.alert('Delete Plan', 'Are you sure you want to delete this plan?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setPlans(prev => prev.filter(p => p.id !== id)),
      },
    ]);
  }, []);

  const handleAddPlan = useCallback(() => {
    // Navigate to Add Workout Plan screen
    navigation.navigate('AddWorkoutPlan');
  }, [navigation]);

  const handleTabPress = useCallback(
    (key: string) => {
      setActiveTab(key);
      if (key === 'availability') {
        navigation.navigate('SetAvailability');
      }
    },
    [navigation],
  );

  const renderPlan = useCallback(
    ({item}: {item: WorkoutPlan}) => (
      <View style={styles.planRow}>
        <TouchableOpacity
          style={styles.planTextWrapper}
          onPress={() =>
            navigation.navigate('AddWorkoutPlan', {planId: item.id})
          }
          activeOpacity={0.7}>
          <Text style={styles.planName}>{item.name}</Text>
        </TouchableOpacity>
        <DeleteButton onPress={() => handleDeletePlan(item.id)} />
      </View>
    ),
    [handleDeletePlan, navigation],
  );

  const renderWorkoutTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Custom Workout Plans</Text>
      </View>

      <FlatList
        data={plans}
        keyExtractor={item => item.id}
        renderItem={renderPlan}
        contentContainerStyle={styles.planList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<FAB onPress={handleAddPlan} style={styles.fab} />}
      />
    </View>
  );

  const renderClientTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Client management coming soon</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'workout':
        return renderWorkoutTab();
      case 'client':
        return renderClientTab();
      case 'availability':
        return renderWorkoutTab();
      default:
        return renderWorkoutTab();
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        title="Workout Management"
        onMenuPress={() => {}}
        onRefreshPress={() => {}}
      />
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={handleTabPress} />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: spacing.base,
  },
  sectionHeader: {
    backgroundColor: colors.card,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    marginTop: spacing['3xl'],
    borderRadius: radius.md,
    elevation: 3,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  sectionTitle: {
    ...textPresets.bodyMedium,
    color: colors.text,
    fontWeight: '500',
  },
  planList: {
    paddingTop: spacing.xs,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.planBorder,
  },
  planTextWrapper: {
    flex: 1,
    marginRight: spacing.sm,
  },
  planName: {
    ...textPresets.body,
    color: colors.text,
  },
  fab: {
    marginTop: 28,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...textPresets.body,
    color: colors.textSecondary,
  },
});

export default HomeScreen;
