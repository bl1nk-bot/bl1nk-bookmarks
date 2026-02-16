import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/lib/types/database.types'

export const SUPABASE_MISSING_ENV_MESSAGE =
  "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."

function getSupabasePublicEnv() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

export function hasSupabasePublicEnv() {
  const { url, anonKey } = getSupabasePublicEnv()
  return Boolean(url && anonKey)
}

export function createClient(): SupabaseClient<Database> | null {
  const { url, anonKey } = getSupabasePublicEnv()
  if (!url || !anonKey) return null

  return createBrowserClient<Database>(url, anonKey)
}
