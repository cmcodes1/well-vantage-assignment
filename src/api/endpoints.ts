/**
 * Example API endpoints — follow this pattern for each resource.
 * Keep endpoint definitions thin; business logic lives in hooks/stores.
 */

import apiClient from './client';
import type {User} from '@/types';

export const userApi = {
  getProfile: () => apiClient.get<User>('/users/me'),

  updateProfile: (data: Partial<User>) =>
    apiClient.patch<User>('/users/me', data),

  getUsers: (page = 1, limit = 20) =>
    apiClient.get<User[]>('/users', {params: {page, limit}}),

  getUserById: (id: string) => apiClient.get<User>(`/users/${id}`),
};
