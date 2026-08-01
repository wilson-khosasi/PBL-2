export interface ValidationIssue {
  path: Array<string | number>;
  message: string;
}

interface ApiErrorPayload {
  msg?: string;
  errors?: ValidationIssue[];
}

export interface ApiResponse<T> {
  msg: string;
  data: T;
}

const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!configuredApiBaseUrl) {
  throw new Error('VITE_API_BASE_URL is not configured. Copy .env.example to .env.local.');
}

export const API_BASE_URL = configuredApiBaseUrl.replace(/\/$/, '');

const TOKEN_STORAGE_KEY = 'event-registration-token';

export class ApiError extends Error {
  status: number;
  validationIssues: ValidationIssue[];

  constructor(message: string, status: number, validationIssues: ValidationIssue[] = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.validationIssues = validationIssues;
  }
}

export const getFieldErrors = (issues: ValidationIssue[]) =>
  issues.reduce<Record<string, string>>((errors, issue) => {
    const field = issue.path[0];

    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }

    return errors;
  }, {});

export const apiRequest = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const payload = (await response.json().catch(() => ({}))) as ApiResponse<T> & ApiErrorPayload;

  if (!response.ok) {
    throw new ApiError(
      payload.msg ?? 'Something went wrong. Please try again.',
      response.status,
      payload.errors ?? [],
    );
  }

  return payload;
};
