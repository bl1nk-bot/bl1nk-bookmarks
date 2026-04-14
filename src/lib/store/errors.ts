import { create } from 'zustand'

export interface AppError {
  id: string
  message: string
  type: 'error' | 'warning' | 'info'
  timestamp: number
  context?: string
  retry?: () => void
}

interface ErrorState {
  errors: AppError[]
  globalError: string | null
}

interface ErrorActions {
  addError: (error: Omit<AppError, 'id' | 'timestamp'>) => void
  removeError: (errorId: string) => void
  clearErrors: () => void
  setGlobalError: (error: string | null) => void
  clearGlobalError: () => void
  retryError: (errorId: string) => void
}

type ErrorStore = ErrorState & ErrorActions

export const useErrorStore = create<ErrorStore>((set, get) => ({
  errors: [],
  globalError: null,

  addError: (error) => set((state) => ({
    errors: [...state.errors, {
      ...error,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    }]
  })),

  removeError: (errorId) => set((state) => ({
    errors: state.errors.filter(error => error.id !== errorId)
  })),

  clearErrors: () => set({ errors: [] }),

  setGlobalError: (error) => set({ globalError: error }),

  clearGlobalError: () => set({ globalError: null }),

  retryError: (errorId) => {
    const error = get().errors.find(e => e.id === errorId)
    if (error?.retry) {
      error.retry()
      get().removeError(errorId)
    }
  }
}))

// Helper functions for common error patterns
export const errorHelpers = {
  apiError: (message: string, context?: string, retry?: () => void) => ({
    message,
    type: 'error' as const,
    context: context || 'API Error',
    retry
  }),

  validationError: (message: string, context?: string) => ({
    message,
    type: 'warning' as const,
    context: context || 'Validation Error'
  }),

  networkError: (retry?: () => void) => ({
    message: 'Network connection failed. Please check your internet connection.',
    type: 'error' as const,
    context: 'Network Error',
    retry
  }),

  authError: (message: string = 'Authentication failed. Please sign in again.') => ({
    message,
    type: 'error' as const,
    context: 'Authentication Error'
  })
}