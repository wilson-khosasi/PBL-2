import { apiRequest } from './apiClient';
import type { Event } from '../types/registration';

export const eventApi = {
  getAll: async (): Promise<Event[]> => {
    const response = await apiRequest<Event[]>('/events');
    return response.data;
  },

  getById: async (id: string): Promise<Event> => {
    const response = await apiRequest<Event>(`/events/${id}`);
    return response.data;
  },

  create: async (eventData: Omit<Event, 'id'>): Promise<Event> => {
    const response = await apiRequest<Event>('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
    return response.data;
  },

  update: async (id: string, eventData: Partial<Omit<Event, 'id'>>): Promise<Event> => {
    const response = await apiRequest<Event>(`/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(eventData),
    });
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiRequest<null>(`/events/${id}`, { method: 'DELETE' });
  },
};
