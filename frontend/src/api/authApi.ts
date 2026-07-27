import type { AuthResult, RegisterPayload } from '../types/auth';

const API_BASE_URL = 'http://localhost:8000/api';

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResult> => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.msg || 'Failed to register');
    }

    return json.data;
  },

};
