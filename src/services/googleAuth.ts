/**
 * Google OAuth service — handles sign-in / sign-out via
 * @react-native-google-signin/google-signin + @react-native-firebase/auth.
 */

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {env} from '@/config';

/** Configure Google Sign-In — call once at app startup. */
export function configureGoogleSignIn() {
  GoogleSignin.configure({
    webClientId: env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: false,
  });
}

export interface GoogleAuthResult {
  user: FirebaseAuthTypes.User;
  idToken: string;
}

/**
 * Full Google sign-in flow:
 * 1. Trigger Google sign-in prompt
 * 2. Exchange Google credential for Firebase credential
 * 3. Sign in to Firebase and return the authenticated user + idToken
 */
export async function signInWithGoogle(): Promise<GoogleAuthResult> {
  // Ensure Google Play Services are available (Android)
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

  // Trigger the Google sign-in prompt
  const response = await GoogleSignin.signIn();

  if (!response.data?.idToken) {
    throw new Error('Google sign-in failed: no ID token returned.');
  }

  // Create a Firebase credential from the Google ID token
  const googleCredential = auth.GoogleAuthProvider.credential(
    response.data.idToken,
  );

  // Sign in to Firebase with the Google credential
  const userCredential = await auth().signInWithCredential(googleCredential);

  // Get a fresh Firebase ID token for API auth
  const idToken = await userCredential.user.getIdToken();

  return {
    user: userCredential.user,
    idToken,
  };
}

/** Sign out from both Firebase and Google. */
export async function signOutGoogle(): Promise<void> {
  await GoogleSignin.signOut();
  await auth().signOut();
}

/**
 * Refresh the Firebase ID token.
 * Returns a fresh token if a Firebase user session exists, otherwise null.
 * Call on app startup to replace any persisted expired tokens.
 */
export async function refreshFirebaseToken(): Promise<string | null> {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    return null;
  }
  // forceRefresh = true ensures a new token even if the cached one hasn't expired
  return currentUser.getIdToken(true);
}

/**
 * Map well-known error codes to user-friendly messages.
 * Returns null if the user simply cancelled (not an error to surface).
 */
export function getGoogleSignInError(error: unknown): string | null {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as {code: string}).code;

    switch (code) {
      case statusCodes.SIGN_IN_CANCELLED:
        // User cancelled — not an error
        return null;
      case statusCodes.IN_PROGRESS:
        return 'Sign-in is already in progress.';
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        return 'Google Play Services is not available on this device.';
      default:
        break;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred during Google sign-in.';
}
