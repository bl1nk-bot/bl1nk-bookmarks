'use client'

import { useEffect, type ReactNode } from 'react'
import { createClient, SUPABASE_MISSING_ENV_MESSAGE } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/store/auth'

export function AuthProvider({ children }: { children: ReactNode }) {
  const { setAuth, setLoading, setInitialized, clearAuth, setError } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) {
      clearAuth()
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      setInitialized(true)
      return
    }

    // Get initial session
    const initAuth = async () => {
      try {
        setLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) throw error

        if (session) {
          setAuth(session.user, session)
        } else {
          clearAuth()
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        clearAuth()
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }

    initAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email)

      if (session) {
        setAuth(session.user, session)
      } else {
        clearAuth()
      }

      // Reload page on sign in/out for fresh data
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        window.location.reload()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setAuth, setLoading, setInitialized, clearAuth, setError])

  return <>{children}</>
}
