import { apiClient } from './client'
import type { User, LoginCredentials, RegisterData } from '../types/auth'

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<User>('/auth/login', credentials),
    
  register: (data: RegisterData) =>
    apiClient.post<User>('/auth/register', data),
    
  logout: () =>
    apiClient.post<void>('/auth/logout'),
    
  getProfile: () =>
    apiClient.get<User>('/auth/profile'),
    
  refreshToken: () =>
    apiClient.post<{ token: string }>('/auth/refresh'),
}
