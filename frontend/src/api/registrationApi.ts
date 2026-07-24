const API_BASE_URL = 'http://localhost:8000/api';

export const registrationApi = {
  register: async (eventId: string, userId: string) => {
    const res = await fetch(`${API_BASE_URL}/registrations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, userId }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.msg || 'Failed to register');
    }

    return json.data;
  },

  getMyRegistrations: async (userId: string) => {
    const res = await fetch(`${API_BASE_URL}/registrations/me?userId=${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.msg || 'Failed to fetch registrations');
    }

    return json.data;
  },

  cancel: async (registrationId: string, userId: string) => {
    const res = await fetch(`${API_BASE_URL}/registrations/${registrationId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.msg || 'Failed to cancel registration');
    }

    return json.data;
  },
};