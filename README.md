# WellVantage

A React Native fitness management app for personal trainers — create workout plans, set availability, and manage client bookings.

Built with TypeScript, React Native 0.84, React 19, and Firebase authentication.

## Features

- **Google Sign-In** — OAuth via Google Sign-In SDK + Firebase Auth with automatic token refresh
- **Workout Plans** — Create, view, and delete multi-day plans with exercises (sets/reps), muscle groups, and notes
- **Availability Scheduling** — Set available dates/times with repeat session support and an interactive calendar
- **Client Slot Booking** — View and manage booked/open time slots on a calendar view
- **Persistent Auth** — Atomic login/logout with Zustand + MMKV; Firebase ID token refreshed on every app launch
- **Auto Session Recovery** — 401 API responses trigger automatic sign-out and redirect to login

## Tech Stack

| Category             | Library                                       |
| -------------------- | --------------------------------------------- |
| **Framework**        | React Native 0.84 + React 19                  |
| **Language**         | TypeScript (strict mode)                      |
| **Auth**             | Firebase Auth 12.x + Google Sign-In SDK       |
| **Navigation**       | React Navigation (native stack)               |
| **State Management** | Zustand 5 (persisted with MMKV)               |
| **Data Fetching**    | TanStack React Query v5 + Axios               |
| **Storage**          | react-native-mmkv                             |
| **Animations**       | react-native-reanimated 4                     |
| **Gestures**         | react-native-gesture-handler                  |
| **Icons**            | react-native-svg (custom SVG icon components) |
| **Testing**          | Jest + React Native Testing Library           |

## Screens

| Screen                | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Login**             | Google OAuth sign-in via Firebase                                                      |
| **Home**              | Main hub with tabbed view — Workout plans, Clients (coming soon), and Availability     |
| **Add Workout Plan**  | Form to create plans with days, muscle groups, exercises (sets/reps), and notes        |
| **Set Availability**  | Date/time picker with repeat sessions, interactive calendar, and session naming        |
| **Book Client Slots** | Calendar view of available time slots with Open/Booked status badges and slot deletion |

## Navigation

```
RootNavigator (NativeStack)
├── Auth (unauthenticated)
│   └── AuthNavigator
│       └── Login
└── MainTabs (authenticated)
    └── MainTabNavigator (NativeStack)
        ├── HomeTabs (in-screen tab bar: Workout / Client / Availability)
        ├── AddWorkoutPlan
        ├── SetAvailability
        └── BookClientSlots
```

Navigation is conditional — `RootNavigator` reads `isAuthenticated` from the Zustand auth store and renders either the Auth or MainTabs stack. The "tabs" inside HomeScreen are a custom `TabBar` component, not React Navigation bottom tabs.

## Auth Flow

```
Google Sign-In prompt
  → Google ID token
  → Firebase credential exchange
  → Firebase ID token
  → Atomic login(user, token) → Zustand state + raw MMKV "auth_token"
```

- **Startup refresh** — On every app launch, `refreshFirebaseToken()` force-refreshes the Firebase ID token. If no Firebase session exists, the user is automatically logged out.
- **401 auto-logout** — The Axios response interceptor detects 401 errors and calls `logout()`, which signs out of Google + Firebase, clears state, and redirects to the login screen.
- **Token storage** — The API client reads the token from a raw MMKV key (`auth_token`) rather than the Zustand blob, avoiding hook dependencies in non-React contexts.

## Project Structure

```
src/
├── api/                 # Axios client & endpoint definitions
│   ├── client.ts        # Axios instance with auth interceptor & 401 handling
│   └── endpoints.ts     # API endpoint functions
├── assets/              # Fonts & images
├── components/
│   ├── common/          # Header, TabBar, FAB, Calendar, ErrorBoundary, etc.
│   ├── icons/           # SVG icons (Back, Calendar, ChevronLeft/Right, Delete, Google, Menu, Refresh)
│   └── ui/              # Reusable primitives (Button, Input, Typography)
├── config/              # Environment configuration (dev/staging/prod)
├── constants/           # App-wide constants
├── hooks/               # Custom hooks (useUser, useDebounce)
├── navigation/          # React Navigation stacks (Root, Auth, MainTab)
├── screens/
│   ├── Auth/            # LoginScreen
│   ├── Availability/    # SetAvailabilityScreen, BookClientSlotsScreen
│   ├── Home/            # HomeScreen
│   └── Workout/         # AddWorkoutPlanScreen
├── services/            # Google Auth, MMKV storage helpers
├── store/               # Zustand stores (authStore, appStore)
├── theme/               # Design tokens (palette, semantic colors, metrics, typography)
├── types/               # TypeScript types & navigation params
├── utils/               # Helper functions (scaling, formatting)
└── App.tsx              # Root component with providers & token refresh
```

## Getting Started

### Prerequisites

- Node.js >= 22
- Ruby (for CocoaPods)
- Xcode (iOS) / Android Studio (Android)

### Firebase Setup

1. Create a Firebase project and enable **Google Sign-In** as a sign-in provider
2. Register both iOS and Android apps in Firebase Console
3. **Android** — Add your debug SHA-1 fingerprint to the Firebase Android app:
   ```bash
   cd android && ./gradlew signingReport | grep SHA1
   ```
   Download the updated `google-services.json` (must have a populated `oauth_client` array) and place it in `android/app/`
4. **iOS** — Download `GoogleService-Info.plist` from Firebase Console and place it in `ios/WellVantageApp/`. Ensure it contains `CLIENT_ID` and `REVERSED_CLIENT_ID` fields. Add the `REVERSED_CLIENT_ID` value as a URL scheme in Xcode (Info → URL Types)

### Installation

```bash
# Install dependencies
npm install

# iOS only — install CocoaPods
npm run pod-install
```

### Running

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Available Scripts

| Script                  | Description                            |
| ----------------------- | -------------------------------------- |
| `npm start`             | Start Metro bundler                    |
| `npm run start:reset`   | Start Metro with cache reset           |
| `npm run ios`           | Build & run on iOS simulator           |
| `npm run android`       | Build & run on Android emulator/device |
| `npm run lint`          | Run ESLint on src/                     |
| `npm run lint:fix`      | Auto-fix ESLint issues                 |
| `npm run format`        | Format code with Prettier              |
| `npm run type-check`    | Run TypeScript compiler check          |
| `npm test`              | Run Jest tests                         |
| `npm run test:watch`    | Run tests in watch mode                |
| `npm run test:coverage` | Run tests with coverage report         |
| `npm run clean`         | Clean Android & iOS build artifacts    |
| `npm run pod-install`   | Install iOS CocoaPods                  |

## Architecture Highlights

- **Atomic auth state** — `login(user, token)` updates Zustand + MMKV in a single call; `logout()` clears everything and signs out of Google + Firebase
- **Token refresh** — Firebase ID token force-refreshed on every app startup; stale sessions auto-logout
- **401 auto-recovery** — Axios response interceptor triggers `logout()` on unauthorized responses
- **Path aliases** — `@/` maps to `src/` (configured in Babel + TSConfig)
- **Strict TypeScript** — `strict`, `noImplicitAny`, `strictNullChecks` enabled
- **Type-safe navigation** — Fully typed route params with React Navigation
- **Zustand + MMKV** — Lightweight persisted state (auth + app preferences) without Redux boilerplate
- **React Query** — Server state with query key factory pattern, retry, stale/cache time config
- **API layer** — Axios with request/response interceptors, token injection, and error handling
- **Palette-based theming** — Raw palette colors mapped to semantic light/dark theme tokens (colors, spacing, typography, shadows)
- **Responsive scaling** — `scale()`, `moderateScale()` helpers based on reference device dimensions
- **Error boundary** — Catches unhandled JS errors with a user-friendly fallback screen
- **Accessibility** — `accessibilityRole`, `accessibilityLabel`, `accessibilityState` on interactive elements
- **Barrel exports** — Clean import paths via `index.ts` re-exports in each module

## iOS Notes

Firebase Auth 12.x is Swift-based and requires static framework linking. The Podfile is configured with:

```ruby
use_frameworks! :linkage => :static
$RNFirebaseAsStaticFramework = true
```

A post-install hook suppresses non-modular header inclusion warnings that arise from this configuration.

## Environment Configuration

Environment switching is handled in `src/config/env.ts` with separate configs for development, staging, and production. In `__DEV__` mode it uses development settings; in release builds it uses production settings.

| Variable               | Dev                          | Production        |
| ---------------------- | ---------------------------- | ----------------- |
| `API_BASE_URL`         | `api.dev.example.com`        | `api.example.com` |
| `API_TIMEOUT`          | 30 s                         | 15 s              |
| `ENABLE_LOGGING`       | `true`                       | `false`           |
| `GOOGLE_WEB_CLIENT_ID` | Same across all environments |

## License

MIT
