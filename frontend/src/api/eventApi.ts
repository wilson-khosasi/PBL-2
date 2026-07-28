import type { Event } from '../types/registration';

const API_BASE_URL = 'http://localhost:8000/api';

export const eventApi = {
  getAll: async (): Promise<Event[]> => {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.msg || 'Failed to load events');
    }

    return json.data;
  },

  getById: async (id: string): Promise<Event> => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.msg || 'Failed to load event');
    }

    return json.data;
  },

  create: async (eventData: Omit<Event, 'id'>): Promise<Event> => {
    const res = await fetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.msg || 'Failed to create event');
    }

    return json.data;
  },

  update: async (id: string, eventData: Partial<Omit<Event, 'id'>>): Promise<Event> => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.msg || 'Failed to update event');
    }

    return json.data;
  },

  delete: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json?.msg || 'Failed to delete event');
    }
  },
};
