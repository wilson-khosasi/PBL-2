import { apiRequest } from './apiClient';
import type { Registration } from '../types/registration';

export const registrationApi = {
  register: async (eventId: string, userId: string) => {
    const response = await apiRequest<unknown>('/registrations', {
      method: 'POST',
      body: JSON.stringify({ eventId, userId }),
    });

    return response.data;
  },

  getMyRegistrations: async (userId: string): Promise<Registration[]> => {
    const response = await apiRequest<Registration[]>(`/registrations/me?userId=${userId}`, {
      method: 'GET',
    });

    return response.data;
  },

  cancel: async (registrationId: string, userId: string) => {
    const response = await apiRequest<unknown>(`/registrations/${registrationId}`, {
      method: 'DELETE',
      body: JSON.stringify({ userId }),
    });

    return response.data;
  },
};
