/**
 * Login screen — redirects to Register (Sign Up) with Google OAuth.
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '@/store';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';
import type {AuthScreenProps} from '@/types/navigation';

const LoginScreen: React.FC<AuthScreenProps<'Login'>> = ({navigation}) => {
  const setToken = useAuthStore(state => state.setToken);

  const handleGoogleSignIn = () => {
    // Replace with real Google auth
    setToken('google-demo-token');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Sign In</Text>

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

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={styles.linkButton}>
          <Text style={styles.linkText}>
            Don't have an account?{' '}
            <Text style={styles.linkBold}>Sign Up</Text>
          </Text>
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
  title: {
    ...textPresets.h2,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xl,
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
  linkButton: {
    marginTop: spacing.xl,
  },
  linkText: {
    ...textPresets.body,
    color: colors.textSecondary,
  },
  linkBold: {
    color: colors.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
