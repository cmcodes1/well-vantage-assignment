/**
 * Book Client Slots screen — calendar + available time slots.
 */

import React, {useState, useCallback} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, TabBar, Calendar, DeleteButton} from '@/components';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';

const TABS = [
  {key: 'workout', label: 'Workout'},
  {key: 'client', label: 'Client'},
  {key: 'availability', label: 'Availability'},
];

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  status: 'Open' | 'Booked';
}

const INITIAL_SLOTS: TimeSlot[] = [
  {id: '1', startTime: '11:00 AM', endTime: '11:45 AM', status: 'Open'},
  {id: '2', startTime: '5:00 PM', endTime: '5:30 PM', status: 'Open'},
];

interface Props {
  navigation: any;
}

const BookClientSlotsScreen: React.FC<Props> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('availability');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 1, 6));
  const [slots, setSlots] = useState<TimeSlot[]>(INITIAL_SLOTS);

  const handleDeleteSlot = useCallback((id: string) => {
    Alert.alert('Delete Slot', 'Are you sure you want to delete this slot?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setSlots(prev => prev.filter(s => s.id !== id)),
      },
    ]);
  }, []);

  const handleTabPress = useCallback(
    (key: string) => {
      setActiveTab(key);
      if (key === 'workout' || key === 'client') {
        navigation.navigate('HomeTabs', {activeTab: key});
      }
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      <Header
        title="Workout Management"
        onBackPress={() => navigation.goBack()}
        onRefreshPress={() => {}}
      />
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={handleTabPress} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Book Client Slots</Text>

        {/* Calendar */}
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          style={styles.calendar}
        />

        {/* Available Slots */}
        <Text style={styles.slotsLabel}>Available Slots:</Text>

        {slots.map(slot => (
          <View key={slot.id} style={styles.slotRow}>
            <View style={styles.slotTimeBox}>
              <Text style={styles.slotTimeText}>
                {slot.startTime} - {slot.endTime}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.statusBadge,
                slot.status === 'Open'
                  ? styles.statusOpen
                  : styles.statusBooked,
              ]}
              activeOpacity={0.7}>
              <Text style={styles.statusText}>{slot.status}</Text>
            </TouchableOpacity>

            <DeleteButton onPress={() => handleDeleteSlot(slot.id)} />
          </View>
        ))}

        {slots.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              No slots available for this date
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing['3xl'],
  },
  sectionTitle: {
    ...textPresets.h3,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    fontWeight: '700',
  },
  calendar: {
    marginBottom: spacing.xl,
  },
  slotsLabel: {
    ...textPresets.bodyMedium,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.md,
    fontSize: 16,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  slotTimeBox: {
    borderWidth: 1,
    borderColor: colors.slotBorder,
    borderRadius: radius['2xl'],
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
    flex: 1,
  },
  slotTimeText: {
    ...textPresets.body,
    color: colors.planBorder,
    textAlign: 'center',
  },
  statusBadge: {
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  statusOpen: {
    backgroundColor: colors.primary,
  },
  statusBooked: {
    backgroundColor: colors.error,
  },
  statusText: {
    ...textPresets.label,
    color: colors.headerText,
    fontWeight: '600',
  },
  emptyState: {
    paddingVertical: spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    ...textPresets.body,
    color: colors.textSecondary,
  },
  bottomSpacer: {
    height: spacing['2xl'],
  },
});

export default BookClientSlotsScreen;
