import { apiRequest } from './apiClient';
import type { AuthUser, LoginInput, LoginResult, RegisterInput } from '../types/auth';

export const authApi = {
  register: async (input: RegisterInput) => {
    const response = await apiRequest<{ user: AuthUser }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    return response.data.user;
  },

  login: async (input: LoginInput): Promise<LoginResult> => {
    const response = await apiRequest<LoginResult>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    return response.data;
  },

  getCurrentUser: async (token: string): Promise<AuthUser> => {
    const response = await apiRequest<{ user: AuthUser }>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.user;
  },
};
