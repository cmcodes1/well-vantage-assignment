/**
 * React Query hooks for user-related data fetching.
 * Follow this pattern for every API resource.
 */

import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {userApi} from '@/api';
import type {User} from '@/types';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (page: number) => [...userKeys.lists(), page] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
};

/** Fetch authenticated user profile */
export const useProfile = () =>
  useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      const {data} = await userApi.getProfile();
      return data;
    },
  });

/** Fetch a paginated list of users */
export const useUsers = (page = 1) =>
  useQuery({
    queryKey: userKeys.list(page),
    queryFn: async () => {
      const {data} = await userApi.getUsers(page);
      return data;
    },
  });

/** Fetch a single user by ID */
export const useUser = (id: string) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: async () => {
      const {data} = await userApi.getUserById(id);
      return data;
    },
    enabled: !!id,
  });

/** Update the authenticated user's profile */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<User>) =>
      userApi.updateProfile(updates).then(res => res.data),
    onSuccess: updatedUser => {
      queryClient.setQueryData(userKeys.profile(), updatedUser);
    },
  });
};
