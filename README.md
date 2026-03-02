# WellVantageApp

A production-ready React Native app built with best practices.

## Tech Stack

| Category             | Library                                       |
| -------------------- | --------------------------------------------- |
| **Language**         | TypeScript (strict mode)                      |
| **Navigation**       | React Navigation (native stack + bottom tabs) |
| **State Management** | Zustand (persisted with MMKV)                 |
| **Data Fetching**    | TanStack React Query + Axios                  |
| **Storage**          | react-native-mmkv                             |
| **Animations**       | react-native-reanimated                       |
| **Gestures**         | react-native-gesture-handler                  |
| **Testing**          | Jest + React Native Testing Library           |

## Project Structure

```
src/
├── api/                 # Axios client & endpoint definitions
│   ├── client.ts        # Configured Axios instance with interceptors
│   └── endpoints.ts     # API endpoint functions by resource
├── assets/              # Fonts, images, icons
├── components/
│   ├── common/          # Layout components (ScreenWrapper, ErrorBoundary, etc.)
│   └── ui/              # Reusable UI primitives (Button, Input, Typography)
├── config/              # Environment configuration
├── constants/           # App-wide string & numeric constants
├── hooks/               # Custom React hooks (data fetching, utilities)
├── navigation/          # React Navigation stacks & tabs
├── screens/             # Screen components grouped by feature
│   ├── Auth/
│   ├── Home/
│   ├── Profile/
│   └── Settings/
├── services/            # Device services (storage, notifications, etc.)
├── store/               # Zustand stores (auth, app preferences)
├── theme/               # Design tokens (colors, spacing, typography, shadows)
├── types/               # Shared TypeScript types & navigation params
├── utils/               # Pure helper functions
└── App.tsx              # Root component with all providers
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

## Best Practices Included

- **Path aliases** — `@/` maps to `src/` (configured in Babel + TSConfig)
- **Strict TypeScript** — `strict`, `noImplicitAny`, `strictNullChecks` enabled
- **Type-safe navigation** — Fully typed route params with React Navigation
- **Responsive scaling** — `scale()`, `moderateScale()` helpers based on reference device
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
