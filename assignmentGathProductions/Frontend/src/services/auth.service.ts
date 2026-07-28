import { apiClient } from '@/api/axios';
import type {
  User,
  AuthResponse,
  RefreshResponse,
  SignupRequest,
  LoginRequest,
} from '@/types/auth';

interface ApiResponseEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
}

interface MeResponse {
  success: boolean;
  user: User;
}

export const authService = {
  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponseEnvelope<AuthResponse>>('/auth/signup', data);
    return response.data.data;
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<ApiResponseEnvelope<AuthResponse>>('/auth/login', data);
    return response.data.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
    const response = await apiClient.post<ApiResponseEnvelope<RefreshResponse>>('/auth/refresh', { refreshToken });
    return response.data.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<MeResponse>('/auth/me');
    return response.data.user;
  },
};

