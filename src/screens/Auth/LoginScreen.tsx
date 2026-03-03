/**
 * Login screen with Google OAuth.
 */

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuthStore} from '@/store';
import {signInWithGoogle, getGoogleSignInError} from '@/services/googleAuth';
import {GoogleIcon} from '@/components';
import {lightColors as colors} from '@/theme/colors';
import {radius, spacing} from '@/theme/metrics';
import {textPresets} from '@/theme/typography';
import type {AuthScreenProps} from '@/types/navigation';

const LoginScreen: React.FC<AuthScreenProps<'Login'>> = () => {
  const setToken = useAuthStore(state => state.setToken);
  const setUser = useAuthStore(state => state.setUser);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    // TODO: Restore Google Sign-In flow
    // if (loading) {
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const {user, idToken} = await signInWithGoogle();
    //   setUser({
    //     id: user.uid,
    //     email: user.email ?? '',
    //     name: user.displayName ?? '',
    //     avatar: user.photoURL ?? undefined,
    //     createdAt: user.metadata.creationTime ?? new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //   });
    //   setToken(idToken);
    // } catch (error) {
    //   const message = getGoogleSignInError(error);
    //   if (message) {
    //     Alert.alert('Sign-In Error', message);
    //   }
    // } finally {
    //   setLoading(false);
    // }

    // Dev shortcut: bypass auth and go to AddWorkoutPlan
    setToken('dev-token');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome! Manage, Track and Grow your Gym with WellVantage.
        </Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.7}
          disabled={loading}
          accessibilityRole="button"
          accessibilityLabel="Continue with Google">
          {loading ? (
            <ActivityIndicator size="small" color={colors.text} />
          ) : (
            <>
              <GoogleIcon size={24} />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </>
          )}
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
    borderRadius: radius.sm,
    elevation: 2,
    shadowOffset: {width: 0, height: 2},
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  googleIconWrapper: {
    marginRight: spacing.sm,
  },
  googleButtonText: {
    ...textPresets.bodyMedium,
    color: colors.text,
    fontWeight: '500',
    marginLeft: spacing.sm,
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
