/**
 * Set Availability screen — date/time picker, repeat toggle, calendar, session name.
 */

import React, {useState, useCallback} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, TabBar, Calendar} from '@/components';
import {CalendarIcon} from '@/components/icons';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing, shadows} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';

const TABS = [
  {key: 'workout', label: 'Workout'},
  {key: 'client', label: 'Client'},
  {key: 'availability', label: 'Availability'},
];

interface Props {
  navigation: any;
}

const SetAvailabilityScreen: React.FC<Props> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('availability');
  const [selectedDate, _setSelectedDate] = useState(new Date(2024, 6, 24));
  const [startTime, setStartTime] = useState('11:30 AM');
  const [endTime, setEndTime] = useState('11:45 AM');
  const [repeatSessions, setRepeatSessions] = useState(true);
  const [calendarDate, setCalendarDate] = useState<Date>(new Date(2025, 1, 6));
  const [sessionName, setSessionName] = useState('PT');

  const formatDate = (date: Date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleTabPress = useCallback(
    (key: string) => {
      setActiveTab(key);
      if (key === 'workout') {
        navigation.goBack();
      }
    },
    [navigation],
  );

  const handleCreate = useCallback(() => {
    if (!sessionName.trim()) {
      Alert.alert('Error', 'Please enter a session name');
      return;
    }
    Alert.alert('Success', 'Availability created!', [
      {text: 'OK', onPress: () => navigation.navigate('BookClientSlots')},
    ]);
  }, [sessionName, navigation]);

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
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.sectionTitle}>Set Availability</Text>

        {/* Date */}
        <Text style={styles.fieldLabel}>Date*</Text>
        <View style={styles.dateInput}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <CalendarIcon size={18} color={colors.text} />
        </View>

        {/* Time row */}
        <View style={styles.timeRow}>
          <View style={styles.timeCol}>
            <Text style={styles.fieldLabel}>Start Time*</Text>
            <TextInput
              style={styles.timeInput}
              value={startTime}
              onChangeText={setStartTime}
              placeholder="HH:MM AM"
              placeholderTextColor={colors.placeholder}
            />
          </View>
          <View style={styles.timeCol}>
            <Text style={styles.fieldLabel}>End Time*</Text>
            <TextInput
              style={styles.timeInput}
              value={endTime}
              onChangeText={setEndTime}
              placeholder="HH:MM AM"
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>

        {/* Repeat toggle */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Repeat Sessions</Text>
          <Switch
            value={repeatSessions}
            onValueChange={setRepeatSessions}
            trackColor={{false: colors.border, true: colors.primary}}
            thumbColor={colors.background}
          />
        </View>

        {/* Calendar */}
        <Calendar
          selectedDate={calendarDate}
          onDateSelect={setCalendarDate}
          style={styles.calendar}
        />

        {/* Session Name */}
        <Text style={styles.fieldLabel}>Session Name*</Text>
        <TextInput
          style={styles.sessionInput}
          value={sessionName}
          onChangeText={setSessionName}
          placeholder="Session Name"
          placeholderTextColor={colors.placeholder}
        />

        {/* Create button */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreate}
          activeOpacity={0.8}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>

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
    marginBottom: spacing.lg,
    fontWeight: '700',
  },
  fieldLabel: {
    ...textPresets.label,
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dateText: {
    ...textPresets.body,
    color: colors.text,
  },
  calendarIcon: {
    fontSize: 18,
  },
  timeRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  timeCol: {
    flex: 1,
  },
  timeInput: {
    ...textPresets.body,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    color: colors.text,
    backgroundColor: colors.background,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  toggleLabel: {
    ...textPresets.bodyMedium,
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  calendar: {
    marginBottom: spacing.lg,
  },
  sessionInput: {
    ...textPresets.body,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    color: colors.text,
    backgroundColor: colors.background,
  },
  createButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
    alignSelf: 'center',
    marginTop: spacing['2xl'],
    ...shadows.md,
  },
  createButtonText: {
    ...textPresets.button,
    color: colors.headerText,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: spacing['2xl'],
  },
});

export default SetAvailabilityScreen;
