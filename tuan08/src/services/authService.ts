const BASE_URL = 'http://localhost:3000/api';

export class ApiError extends Error {
  status?: number;
  network: boolean;

  constructor(message: string, opts: { status?: number; network?: boolean } = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = opts.status;
    this.network = opts.network ?? false;
  }
}

export interface User {
  id: number;
  email: string;
}
export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}
export interface RegisterResponse {
  message: string;
  user: User;
}
export interface MeResponse {
  user: User;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
  } catch {
    throw new ApiError('Không kết nối được máy chủ', { network: true });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(data.message || 'Có lỗi xảy ra', { status: res.status });
  }
  return data as T;
}

export const authService = {
  login: (email: string, password: string) =>
    request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string) =>
    request<RegisterResponse>('/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: (token: string) =>
    request<MeResponse>('/me', { headers: { Authorization: `Bearer ${token}` } }),
};