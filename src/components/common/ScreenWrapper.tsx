/**
 * Consistent screen wrapper with safe area + scroll support.
 */

import React, {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {lightColors as colors} from '@/theme/colors';
import {spacing} from '@/theme/metrics';

interface ScreenWrapperProps {
  scroll?: boolean;
  padding?: boolean;
  style?: ViewStyle;
  statusBarStyle?: 'light-content' | 'dark-content';
  backgroundColor?: string;
  keyboardAvoiding?: boolean;
}

export const ScreenWrapper: React.FC<PropsWithChildren<ScreenWrapperProps>> = ({
  children,
  scroll = false,
  padding = true,
  style,
  statusBarStyle = 'dark-content',
  backgroundColor = colors.background,
  keyboardAvoiding = false,
}) => {
  const content = (
    <View style={[styles.fill, padding && styles.padding, style]}>
      {children}
    </View>
  );

  const wrappedContent = scroll ? (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      {content}
    </ScrollView>
  ) : (
    content
  );

  const body = keyboardAvoiding ? (
    <KeyboardAvoidingView
      style={styles.fill}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {wrappedContent}
    </KeyboardAvoidingView>
  ) : (
    wrappedContent
  );

  return (
    <SafeAreaView style={[styles.fill, {backgroundColor}]}>
      <StatusBar barStyle={statusBarStyle} backgroundColor={backgroundColor} />
      {body}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: spacing.base,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
