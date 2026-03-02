/** App-wide string constants */

export const APP_NAME = 'WellVantageApp';

export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'No internet connection. Please check your network.',
  UNAUTHORIZED: 'Session expired. Please sign in again.',
  VALIDATION: 'Please check the entered information.',
} as const;

export const QUERY_KEYS = {
  USERS: 'users',
  PROFILE: 'profile',
} as const;
