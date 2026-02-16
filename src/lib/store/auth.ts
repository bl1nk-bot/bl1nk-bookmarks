import { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: User | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
  initialized: boolean
  error: string | null
}

type AuthActions = {
  setAuth: (user: User | null, session: Session | null) => void
  setSession: (session: Session | null) => void
  setUser: (user: User | null) => void
  setLoading: (isLoading: boolean) => void
  setInitialized: (initialized: boolean) => void
  setError: (error: string | null) => void
  clearAuth: () => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isLoading: false,
  initialized: false,
  error: null,
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (user, session) =>
        set({
          session,
          user: user ?? session?.user ?? null,
          isAuthenticated: Boolean(user ?? session?.user),
          error: null,
        }),
      setSession: (session) =>
        set({
          session,
          user: session?.user ?? null,
          isAuthenticated: Boolean(session?.user),
        }),
      setUser: (user) =>
        set((state) => ({
          user,
          session: user ? state.session : null,
          isAuthenticated: Boolean(user),
        })),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (initialized) => set({ initialized }),
      setError: (error) => set({ error }),
      clearAuth: () => set(initialState),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
