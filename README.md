# WellVantage

A React Native fitness management app for personal trainers — create workout plans, set availability, and manage client bookings.

Built with TypeScript, React Native 0.84, and Firebase authentication.

## Features

- **Google Sign-In** — OAuth via Google Sign-In SDK + Firebase Auth
- **Workout Plans** — Create, view, and delete multi-day plans with exercises (sets/reps), muscle groups, and notes
- **Availability Scheduling** — Set available dates/times with repeat session support and an interactive calendar
- **Client Slot Booking** — View and manage booked/open time slots on a calendar view
- **Persistent State** — Auth and app preferences persisted with MMKV via Zustand

## Tech Stack

| Category             | Library                                       |
| -------------------- | --------------------------------------------- |
| **Framework**        | React Native 0.84 + React 19                  |
| **Language**         | TypeScript (strict mode)                      |
| **Auth**             | Firebase Auth + Google Sign-In                |
| **Navigation**       | React Navigation (native stack)               |
| **State Management** | Zustand (persisted with MMKV)                 |
| **Data Fetching**    | TanStack React Query v5 + Axios               |
| **Storage**          | react-native-mmkv                             |
| **Animations**       | react-native-reanimated                       |
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

## Project Structure

```
src/
├── api/                 # Axios client & endpoint definitions
│   ├── client.ts        # Configured Axios instance with interceptors
│   └── endpoints.ts     # API endpoint functions (user profile, etc.)
├── assets/              # Fonts & images
├── components/
│   ├── common/          # Header, TabBar, FAB, Calendar, ErrorBoundary, etc.
│   ├── icons/           # SVG icon components (Back, Calendar, Delete, Google, etc.)
│   └── ui/              # Reusable primitives (Button, Input, Typography)
├── config/              # Environment configuration (dev/staging/prod)
├── constants/           # App-wide constants
├── hooks/               # Custom hooks (useUser, useDebounce)
├── navigation/          # React Navigation stacks
├── screens/             # Feature screens
│   ├── Auth/            # LoginScreen
│   ├── Availability/    # SetAvailabilityScreen, BookClientSlotsScreen
│   ├── Home/            # HomeScreen
│   └── Workout/         # AddWorkoutPlanScreen
├── services/            # Google Auth service, MMKV storage
├── store/               # Zustand stores (authStore, appStore)
├── theme/               # Design tokens (colors, metrics, typography)
├── types/               # TypeScript types & navigation params
├── utils/               # Helper functions (scaling, formatting)
└── App.tsx              # Root component with providers
```

## Getting Started

### Prerequisites

- Node.js >= 22
- Ruby (for CocoaPods)
- Xcode (iOS) / Android Studio (Android)

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

- **Path aliases** — `@/` maps to `src/` (configured in Babel + TSConfig)
- **Strict TypeScript** — `strict`, `noImplicitAny`, `strictNullChecks` enabled
- **Type-safe navigation** — Fully typed route params with React Navigation
- **Zustand + MMKV** — Lightweight, fast state persistence without Redux boilerplate
- **React Query** — Data-fetching layer with query key factory pattern, retry, and caching
- **Responsive scaling** — `scale()`, `moderateScale()` helpers based on reference device
- **Barrel exports** — Clean imports via `index.ts` re-exports in each module
- **Theme system** — Centralized design tokens for colors, spacing, typography, and shadows
- **Error boundary** — Global crash safety wrapper around the app
- **Design tokens** — Centralized colors, spacing, typography, shadows
- **API layer** — Axios with request/response interceptors, token injection, error handling
- **React Query** — Factory query-key pattern, configurable stale/cache times
- **Zustand + MMKV** — Lightweight persisted global state
- **Error boundary** — Catches unhandled JS errors with a user-friendly fallback
- **Accessibility** — `accessibilityRole`, `accessibilityLabel`, `accessibilityState` on interactive elements
- **Barrel exports** — Clean import paths via `index.ts` re-exports

## Environment Configuration

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Environment switching is handled in `src/config/env.ts`. In `__DEV__` mode it uses development settings; in release builds it uses production settings.

## License

MIT
