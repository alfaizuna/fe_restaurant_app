import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
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
        isAuthenticated: false,
        isLoading: false,
        error: null,

        // Actions
        login: async (email: string, password: string) => {
          set({ isLoading: true, error: null })
          
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
              throw new Error('Login failed')
            }

            const user = await response.json()
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false,
              error: null 
            })
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'Login failed',
              isLoading: false 
            })
          }
        },

        logout: () => {
          set({ 
            user: null, 
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
          isAuthenticated: state.isAuthenticated 
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
)
