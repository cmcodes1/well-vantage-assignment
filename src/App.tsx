/**
 * Root application component.
 *
 * Wraps the app with all required providers:
 * - React Query (data fetching)
 * - SafeAreaProvider (safe area insets)
 * - GestureHandler (gestures)
 * - ErrorBoundary (crash safety)
 * - Navigation
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ErrorBoundary} from '@/components/common/ErrorBoundary';
import {RootNavigator} from '@/navigation';
import {configureGoogleSignIn} from '@/services/googleAuth';
import {StyleSheet} from 'react-native';

// Configure Google Sign-In once at module load
configureGoogleSignIn();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime)
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const App: React.FC = () => (
  <GestureHandlerRootView style={styles.root}>
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RootNavigator />
        </ErrorBoundary>
      </QueryClientProvider>
    </SafeAreaProvider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
