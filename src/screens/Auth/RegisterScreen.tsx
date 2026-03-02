/**
 * Sign Up / Register screen with Google OAuth button.
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '@/store';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';
import type {AuthScreenProps} from '@/types/navigation';

const RegisterScreen: React.FC<AuthScreenProps<'Register'>> = ({
  navigation,
}) => {
  const setToken = useAuthStore(state => state.setToken);

  const handleGoogleSignIn = () => {
    // Replace with real Google auth
    setToken('google-demo-token');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityLabel="Go back">
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome! Manage, Track and Grow your Gym with WellVantage.
        </Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google">
          <Text style={styles.googleIcon}>G</Text>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
  },
  backArrow: {
    fontSize: 24,
    color: colors.text,
    fontWeight: '400',
  },
  title: {
    ...textPresets.h2,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing['4xl'],
  },
  welcomeText: {
    ...textPresets.h3,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: spacing['2xl'],
    fontWeight: '700',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius['2xl'],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4285F4',
    marginRight: spacing.sm,
  },
  googleButtonText: {
    ...textPresets.bodyMedium,
    color: colors.text,
    fontWeight: '500',
  },
});

export default RegisterScreen;
