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
}

const development: EnvConfig = {
  ENV: 'development',
  API_BASE_URL: 'https://api.dev.example.com',
  API_TIMEOUT: 30_000,
  ENABLE_LOGGING: true,
};

const staging: EnvConfig = {
  ENV: 'staging',
  API_BASE_URL: 'https://api.staging.example.com',
  API_TIMEOUT: 30_000,
  ENABLE_LOGGING: true,
};

const production: EnvConfig = {
  ENV: 'production',
  API_BASE_URL: 'https://api.example.com',
  API_TIMEOUT: 15_000,
  ENABLE_LOGGING: false,
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
