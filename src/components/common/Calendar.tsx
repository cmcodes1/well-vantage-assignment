/**
 * Simple calendar component for date selection.
 */

import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  style?: ViewStyle;
}

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  style,
}) => {
  const [viewDate, setViewDate] = useState(selectedDate ?? new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      grid.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push(d);
    }
    return grid;
  }, [year, month]);

  const goToPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* Month header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPrevMonth} style={styles.navButton}>
          <Text style={styles.navText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>
          {MONTH_NAMES[month]} {year}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navText}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Day-of-week headers */}
      <View style={styles.weekRow}>
        {DAYS_OF_WEEK.map((d, i) => (
          <View key={i} style={styles.dayCell}>
            <Text style={styles.weekDay}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View style={styles.grid}>
        {days.map((day, i) => (
          <View key={i} style={styles.dayCell}>
            {day !== null ? (
              <TouchableOpacity
                style={[
                  styles.dayButton,
                  isSelected(day) && styles.selectedDay,
                  isToday(day) && !isSelected(day) && styles.todayDay,
                ]}
                onPress={() => onDateSelect?.(new Date(year, month, day))}>
                <Text
                  style={[
                    styles.dayText,
                    isSelected(day) && styles.selectedDayText,
                    isToday(day) && !isSelected(day) && styles.todayDayText,
                  ]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  navButton: {
    padding: spacing.xs,
    width: 32,
    alignItems: 'center',
  },
  navText: {
    fontSize: 24,
    color: colors.text,
    fontWeight: '600',
  },
  monthTitle: {
    ...textPresets.bodyMedium,
    color: colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: spacing.xs,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: spacing.xxs,
  },
  dayCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: spacing.xxs,
  },
  weekDay: {
    ...textPresets.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    fontSize: 13,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    ...textPresets.body,
    color: colors.text,
    fontSize: 14,
  },
  selectedDay: {
    backgroundColor: colors.primary,
  },
  selectedDayText: {
    color: colors.background,
    fontWeight: '700',
  },
  todayDay: {
    backgroundColor: colors.primaryDark,
  },
  todayDayText: {
    color: colors.background,
    fontWeight: '700',
  },
});
