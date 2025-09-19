import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: number
  email: string
  name: string
  phone?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, phone: string, password: string) => Promise<void>
  logout: () => void
  clearError: () => void
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set, get) => ({
        // State
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('https://berestaurantappformentee-production-7e24.up.railway.app/api/auth/login', {
              method: 'POST',
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}))
              throw new Error(errorData.message || 'Login failed')
            }

            const responseData = await response.json()
            
            // Handle the API response structure
            if (responseData.success && responseData.data) {
              const { user, token } = responseData.data
              set({ 
                user, 
                token,
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              })
            } else {
              throw new Error(responseData.message || 'Login failed')
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false 
            })
            throw error
          }
        },

        register: async (name: string, email: string, phone: string, password: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('https://berestaurantappformentee-production-7e24.up.railway.app/api/auth/register', {
              method: 'POST',
              headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name, email, phone, password }),
            })

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({}))
              throw new Error(errorData.message || 'Registration failed')
            }

            const responseData = await response.json()
            
            // Handle the API response structure
            if (responseData.success && responseData.data) {
              const { user, token } = responseData.data
              set({ 
                user, 
                token,
                isAuthenticated: true, 
                isLoading: false,
                error: null 
              })
            } else {
              throw new Error(responseData.message || 'Registration failed')
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Registration failed',
              isLoading: false 
            })
            throw error
          }
        },

        logout: () => {
          set({ 
            user: null, 
            token: null,
            isAuthenticated: false, 
            error: null 
          })
        },

        clearError: () => {
          set({ error: null })
        },

        setUser: (user: User | null) => {
          set({ 
            user, 
            isAuthenticated: !!user 
          })
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading })
        },
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({ 
          user: state.user,
          token: state.token,
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
)
