import type { Event } from '../types/registration';
import { dummyEvents, findDummyEventById } from '../data/dummyEvents';

const API_BASE_URL = 'http://localhost:8000/api';

const isNetworkError = (err: unknown): boolean => err instanceof TypeError;

export const eventApi = {
  getAll: async (): Promise<Event[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.msg || 'Failed to load events');
      }

      if (!Array.isArray(json.data) || json.data.length === 0) {
        return dummyEvents;
      }

      return json.data;
    } catch (err) {
      if (isNetworkError(err)) {
       
      }
      throw err;
    }
  },

  getById: async (id: string): Promise<Event> => {
    try {
      const res = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();
      if (!res.ok) {
        const fallback = findDummyEventById(id);
        if (fallback) return fallback;
        throw new Error(json?.msg || 'Failed to load event');
      }

      return json.data;
    } catch (err) {
      const fallback = findDummyEventById(id);
      if (fallback) return fallback;
      if (isNetworkError(err)) {
        throw new Error('Unable to reach the server, and no matching dummy event was found.');
      }
      throw err;
    }
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