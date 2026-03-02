/**
 * Type-safe environment configuration.
 * Replace values here or wire up react-native-dotenv / react-native-config.
 */

type Environment = 'development' | 'staging' | 'production';

interface EnvConfig {
  ENV: Environment;
  API_BASE_URL: string;
  API_TIMEOUT: number;
  ENABLE_LOGGING: boolean;
  GOOGLE_WEB_CLIENT_ID: string;
}

const development: EnvConfig = {
  ENV: 'development',
  API_BASE_URL: 'https://api.dev.example.com',
  API_TIMEOUT: 30_000,
  ENABLE_LOGGING: true,
  GOOGLE_WEB_CLIENT_ID:
    '89573235463-diikrgo2h09amrue63np67aqkm71ii6b.apps.googleusercontent.com',
};

const staging: EnvConfig = {
  ENV: 'staging',
  API_BASE_URL: 'https://api.staging.example.com',
  API_TIMEOUT: 30_000,
  ENABLE_LOGGING: true,
  GOOGLE_WEB_CLIENT_ID:
    '89573235463-diikrgo2h09amrue63np67aqkm71ii6b.apps.googleusercontent.com',
};

const production: EnvConfig = {
  ENV: 'production',
  API_BASE_URL: 'https://api.example.com',
  API_TIMEOUT: 15_000,
  ENABLE_LOGGING: false,
  GOOGLE_WEB_CLIENT_ID:
    '89573235463-diikrgo2h09amrue63np67aqkm71ii6b.apps.googleusercontent.com',
};

const configs: Record<Environment, EnvConfig> = {
  development,
  staging,
  production,
};

const currentEnv: Environment = (
  __DEV__ ? 'development' : 'production'
) as Environment;

export const env: EnvConfig = configs[currentEnv];
