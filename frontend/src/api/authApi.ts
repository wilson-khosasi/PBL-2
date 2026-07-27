import type { AuthResult, LoginPayload, RegisterPayload } from '../types/auth';

const API_BASE_URL = 'http://localhost:8000/api';

export const authApi: {
  register: (payload: RegisterPayload) => Promise<AuthResult>;
  login: (payload: LoginPayload) => Promise<AuthResult>;
} = {
  register: async (payload: RegisterPayload): Promise<AuthResult> => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0,200)}`);
    }

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json?.msg || `Failed to register (${res.status})`);
    }

    return json.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResult> => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0,200)}`);
    }

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json?.msg || `Failed to login (${res.status})`);
    }

    return json.data;
  },
};
