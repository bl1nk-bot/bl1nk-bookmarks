'use client'

import { useAuthStore } from '@/lib/store/auth'
import { createClient, SUPABASE_MISSING_ENV_MESSAGE } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function useAuth() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    user,
    session,
    isAuthenticated,
    isLoading: authLoading,
    initialized,
  } = useAuthStore()

  const getErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) throw signUpError

      // Check if email confirmation is required
      if (data.user && !data.session) {
        return {
          success: true,
          message: 'Please check your email to confirm your account',
        }
      }

      return { success: true, message: 'Account created successfully' }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to sign up')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }
    }

    try {
      setLoading(true)
      setError(null)

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      router.push('/dashboard')
      return { success: true, message: 'Signed in successfully' }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to sign in')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    if (!supabase) {
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }
    }

    try {
      setLoading(true)
      setError(null)

      const { error: signOutError } = await supabase.auth.signOut()

      if (signOutError) throw signOutError

      router.push('/login')
      return { success: true, message: 'Signed out successfully' }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to sign out')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    if (!supabase) {
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }
    }

    try {
      setLoading(true)
      setError(null)

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signInError) throw signInError

      return { success: true }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to sign in with Google')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    // State
    user,
    session,
    isAuthenticated,
    isLoading: authLoading || loading,
    initialized,
    error: error || (!supabase ? SUPABASE_MISSING_ENV_MESSAGE : null),
    // Actions
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
  }
}
