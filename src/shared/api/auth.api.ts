import { apiClient } from './client'
import type { User, LoginCredentials, RegisterData, UpdateProfileData } from '../types/auth'

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<User>('/auth/login', credentials),
    
  register: (data: RegisterData) =>
    apiClient.post<User>('/auth/register', data),
    
  logout: () =>
    apiClient.post<void>('/auth/logout'),
    
  getProfile: () =>
    apiClient.get<{ success: boolean; message: string; data: User }>('/auth/profile'),
    
  updateProfile: (data: UpdateProfileData) =>
    apiClient.put<{ success: boolean; message: string; data: User }>('/auth/profile', data),
    
  refreshToken: () =>
    apiClient.post<{ token: string }>('/auth/refresh'),
}
