'use client'

import { useCollectionStore } from '@/lib/store/collections'
import { createClient, SUPABASE_MISSING_ENV_MESSAGE } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/store/auth'
import { useState, useCallback } from 'react'
import type { CollectionInsert, CollectionUpdate, CollectionWithBookmarks } from '@/lib/types'
import type { Database } from '@/lib/types/database.types'

type CollectionWithCount = CollectionWithBookmarks & {
  bookmarks?: Array<{ count?: number }>
}

export function useCollections() {
  const supabase = createClient()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Helper to ensure supabase client is available
  const getSupabaseClient = (): typeof supabase & NonNullable<typeof supabase> => {
    if (!supabase) {
      throw new Error(SUPABASE_MISSING_ENV_MESSAGE)
    }
    return supabase
  }

  const {
    collections,
    selectedCollectionId,
    setCollections,
    addCollection,
    updateCollection,
    removeCollection,
    setSelectedCollectionId,
    clearSelectedCollection,
    getSelectedCollection,
  } = useCollectionStore()

  const getErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback

  const fetchCollections = useCallback(async () => {
    if (!user) return
    if (!supabase) {
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const { data, error: fetchError } = await supabase
        .from('collections')
        .select('*, bookmarks(count)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      // Transform to include bookmark count
      const collectionsWithCount: CollectionWithBookmarks[] = (data ?? []).map((collection) => {
        const row = collection as CollectionWithCount
        return {
          ...row,
          bookmark_count: row.bookmarks?.[0]?.count || 0,
        }
      })

      setCollections(collectionsWithCount)
    } catch (err: unknown) {
      console.error('Error fetching collections:', err)
      setError(getErrorMessage(err, 'Failed to fetch collections'))
    } finally {
      setIsLoading(false)
    }
  }, [user, supabase, setCollections])

  const createCollection = async (collection: CollectionInsert) => {
    if (!user) return { success: false, message: 'Not authenticated' }
    if (!supabase) return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }

    try {
      setIsLoading(true)
      setError(null)

      const client = getSupabaseClient()
      const collectionToInsert = { ...collection, user_id: user.id } as Database['public']['Tables']['collections']['Insert']
      const { data, error: createError } = await (client as any)
        .from('collections')
        .insert(collectionToInsert)
        .select()
        .single()

      if (createError) throw createError

      addCollection(data)
      return { success: true, data }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to create collection')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const updateCollectionById = async (id: string, updates: CollectionUpdate) => {
    if (!supabase) return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }

    try {
      setIsLoading(true)
      setError(null)

      const client = getSupabaseClient()
      const updatesTyped = updates as Partial<Database['public']['Tables']['collections']['Update']>
      const { data, error: updateError } = await (client as any)
        .from('collections')
        .update(updatesTyped)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      updateCollection(id, data)
      return { success: true, data }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to update collection')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCollection = async (id: string) => {
    if (!supabase) return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }

    try {
      setIsLoading(true)
      setError(null)

      const { error: deleteError } = await supabase.from('collections').delete().eq('id', id)

      if (deleteError) throw deleteError

      removeCollection(id)

      // Clear selected collection if it was deleted
      if (selectedCollectionId === id) {
        clearSelectedCollection()
      }

      return { success: true }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to delete collection')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // State
    collections,
    selectedCollection: getSelectedCollection(),
    selectedCollectionId,
    isLoading,
    error,
    // Actions
    fetchCollections,
    createCollection,
    updateCollection: updateCollectionById,
    deleteCollection,
    setSelectedCollectionId,
    clearSelectedCollection,
  }
}
