/**
 * Add / Edit Workout Plan screen.
 * Features: workout name, day list with muscle groups,
 * exercise table (sets/reps), notes with word counter, submit button.
 */

import React, {useState, useCallback} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, TabBar, DayBadge, FAB, DeleteButton} from '@/components';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing, shadows} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';

const TABS = [
  {key: 'workout', label: 'Workout'},
  {key: 'client', label: 'Client'},
  {key: 'availability', label: 'Availability'},
];

const MAX_NOTE_WORDS = 50;

interface DayEntry {
  id: string;
  day: number;
  muscleGroup: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
}

interface Props {
  navigation: any;
  route?: any;
}

const AddWorkoutPlanScreen: React.FC<Props> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('workout');
  const [planName, setPlanName] = useState("Beginner's Workout - 3 days");
  const [days, setDays] = useState<DayEntry[]>([
    {id: '1', day: 1, muscleGroup: 'Chest'},
  ]);
  const [exercises, setExercises] = useState<Exercise[]>([
    {id: '1', name: 'Chest', sets: '', reps: '5-8'},
    {id: '2', name: 'Bench Press', sets: '8', reps: '3'},
    {id: '3', name: 'Bench Press', sets: '8', reps: '5'},
    {id: '4', name: 'Planks', sets: '3', reps: '30 secs'},
  ]);
  const [notes, setNotes] = useState(
    'Bench Press: www.benchpress.com\nEat Oats',
  );

  const wordsRemaining =
    MAX_NOTE_WORDS - notes.trim().split(/\s+/).filter(Boolean).length;

  // Day management
  const addDay = useCallback(() => {
    const nextDay = days.length + 1;
    setDays(prev => [
      ...prev,
      {id: String(Date.now()), day: nextDay, muscleGroup: ''},
    ]);
  }, [days.length]);

  const removeDay = useCallback((id: string) => {
    setDays(prev => {
      const filtered = prev.filter(d => d.id !== id);
      return filtered.map((d, i) => ({...d, day: i + 1}));
    });
  }, []);

  const updateDayMuscle = useCallback((id: string, value: string) => {
    setDays(prev =>
      prev.map(d => (d.id === id ? {...d, muscleGroup: value} : d)),
    );
  }, []);

  // Exercise management
  const addExercise = useCallback(() => {
    setExercises(prev => [
      ...prev,
      {id: String(Date.now()), name: '', sets: '', reps: ''},
    ]);
  }, []);

  const removeExercise = useCallback((id: string) => {
    setExercises(prev => prev.filter(e => e.id !== id));
  }, []);

  const updateExercise = useCallback(
    (id: string, field: keyof Exercise, value: string) => {
      setExercises(prev =>
        prev.map(e => (e.id === id ? {...e, [field]: value} : e)),
      );
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (!planName.trim()) {
      Alert.alert('Error', 'Please enter a workout plan name');
      return;
    }
    Alert.alert('Success', 'Workout plan saved!', [
      {text: 'OK', onPress: () => navigation.goBack()},
    ]);
  }, [planName, navigation]);

  return (
    <View style={styles.screen}>
      <Header
        title="Add Workout Plan"
        onMenuPress={() => navigation.openDrawer?.()}
        onRefreshPress={() => {}}
        onBackPress={() => navigation.goBack()}
      />
      <TabBar tabs={TABS} activeTab={activeTab} onTabPress={setActiveTab} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* Workout Name */}
        <View style={styles.nameInputWrapper}>
          <TextInput
            style={styles.nameInput}
            value={planName}
            onChangeText={setPlanName}
            placeholder="Workout Plan Name"
            placeholderTextColor={colors.placeholder}
          />
        </View>

        {/* Day List */}
        {days.map(day => (
          <View key={day.id} style={styles.dayRow}>
            <DayBadge day={day.day} />
            <TextInput
              style={styles.dayInput}
              value={day.muscleGroup}
              onChangeText={v => updateDayMuscle(day.id, v)}
              placeholder="Muscle group"
              placeholderTextColor={colors.placeholder}
            />
            <DeleteButton onPress={() => removeDay(day.id)} />
          </View>
        ))}

        <FAB onPress={addDay} style={styles.addDayFab} />

        {/* Exercise Table */}
        <View style={styles.exerciseHeader}>
          <View style={styles.exerciseNameCol} />
          <Text style={styles.colLabel}>Sets</Text>
          <Text style={styles.colLabel}>Reps</Text>
          <View style={styles.deleteCol} />
        </View>

        {exercises.map(exercise => (
          <View key={exercise.id} style={styles.exerciseRow}>
            <View style={styles.exerciseNameCol}>
              <TextInput
                style={styles.exerciseName}
                value={exercise.name}
                onChangeText={v => updateExercise(exercise.id, 'name', v)}
                placeholder="Exercise"
                placeholderTextColor={colors.placeholder}
              />
            </View>
            <View style={styles.cellInput}>
              <TextInput
                style={styles.cellText}
                value={exercise.sets}
                onChangeText={v => updateExercise(exercise.id, 'sets', v)}
                placeholder="–"
                placeholderTextColor={colors.placeholder}
                keyboardType="default"
                textAlign="center"
              />
            </View>
            <View style={styles.cellInput}>
              <TextInput
                style={styles.cellText}
                value={exercise.reps}
                onChangeText={v => updateExercise(exercise.id, 'reps', v)}
                placeholder="–"
                placeholderTextColor={colors.placeholder}
                keyboardType="default"
                textAlign="center"
              />
            </View>
            <DeleteButton
              onPress={() => removeExercise(exercise.id)}
              style={styles.deleteCol}
            />
          </View>
        ))}

        <FAB onPress={addExercise} style={styles.addExerciseFab} />

        {/* Notes */}
        <View style={styles.notesContainer}>
          <TextInput
            style={styles.notesInput}
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add notes (links, diet tips...)  "
            placeholderTextColor={colors.placeholder}
            textAlignVertical="top"
          />
          <Text
            style={[
              styles.wordCounter,
              wordsRemaining < 0 && styles.wordCounterError,
            ]}>
            {wordsRemaining} words remaining
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}>
          <Text style={styles.submitText}>Submit</Text>
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
    paddingTop: spacing['2xl'],
    paddingBottom: spacing['3xl'],
  },

  // Workout name
  nameInputWrapper: {
    marginBottom: spacing.xl,
  },
  nameInput: {
    ...textPresets.bodyLarge,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    elevation: 3,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    color: colors.text,
    backgroundColor: colors.background,
  },

  // Day rows
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  dayInput: {
    flex: 1,
    ...textPresets.body,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
  },
  addDayFab: {
    marginVertical: spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Exercise table
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    marginTop: spacing.sm,
  },
  exerciseNameCol: {
    flex: 1,
  },
  colLabel: {
    ...textPresets.label,
    color: colors.text,
    width: 60,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteCol: {
    width: 36,
    alignItems: 'center',
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.planBorder,
  },
  exerciseName: {
    ...textPresets.body,
    color: colors.text,
  },
  cellInput: {
    width: 60,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    alignItems: 'center',
    marginHorizontal: spacing.xxs,
  },
  cellText: {
    ...textPresets.body,
    color: colors.text,
    textAlign: 'center',
    padding: 0,
    minWidth: 55,
  },
  addExerciseFab: {
    marginVertical: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
  },

  // Notes
  notesContainer: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  notesInput: {
    ...textPresets.body,
    color: colors.notesText,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  wordCounter: {
    ...textPresets.caption,
    color: colors.wordCounterText,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  wordCounterError: {
    color: colors.error,
  },

  // Submit
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing['3xl'],
    alignSelf: 'center',
    marginTop: spacing.xl,
    ...shadows.md,
  },
  submitText: {
    ...textPresets.button,
    color: colors.headerText,
    textAlign: 'center',
  },

  bottomSpacer: {
    height: spacing['2xl'],
  },
});

export default AddWorkoutPlanScreen;
