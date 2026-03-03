/**
 * Axios instance pre-configured with base URL, timeouts,
 * request/response interceptors, and token injection.
 */

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {env} from '@/config';
import {storage} from '@/services/storage';
import {useAuthStore} from '@/store';

const apiClient: AxiosInstance = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request Interceptor ─────────────────────────────────
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = storage.getString('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (env.ENABLE_LOGGING) {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ── Response Interceptor ────────────────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear token and reset auth state so the user is redirected to login
      useAuthStore.getState().logout();
    }
    if (env.ENABLE_LOGGING) {
      console.error(
        `[API Error] ${error.config?.method?.toUpperCase()} ${
          error.config?.url
        }`,
        error.response?.status,
        error.response?.data,
      );
    }
    return Promise.reject(error);
  },
);

export default apiClient;
