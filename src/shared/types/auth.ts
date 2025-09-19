export interface User {
  id: number
  email: string
  name: string
  phone?: string
  avatar?: string
  role?: 'user' | 'admin'
  createdAt?: string
  updatedAt?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  phone: string
  password: string
}
