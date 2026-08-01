import { apiRequest } from './apiClient';
import type { Registration } from '../types/registration';

export const registrationApi = {
  register: async (eventId: string) => {
    const response = await apiRequest<unknown>('/registrations', {
      method: 'POST',
      body: JSON.stringify({ eventId }),
    });

    return response.data;
  },

  getMyRegistrations: async (): Promise<Registration[]> => {
    const response = await apiRequest<Registration[]>('/registrations/me', {
      method: 'GET',
    });

    return response.data;
  },

  cancel: async (registrationId: string) => {
    const response = await apiRequest<unknown>(`/registrations/${registrationId}`, {
      method: 'DELETE',
    });

    return response.data;
  },
};
