'use client'

import { useBookmarkStore } from '@/lib/store/bookmarks'
import { createClient, SUPABASE_MISSING_ENV_MESSAGE } from '@/lib/supabase/client'
import { useAuthStore } from '@/lib/store/auth'
import { useState, useCallback } from 'react'
import type { BookmarkInsert, BookmarkUpdate, BookmarkWithTags, Tag, Collection } from '@/lib/types'

type BookmarkRowWithRelations = {
  [key: string]: unknown
  tags?: Array<{ tag: Tag | null }> | null
  collection?: Collection | null
}

export function useBookmarks() {
  const supabase = createClient()
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    bookmarks,
    searchQuery,
    selectedCollectionId,
    setBookmarks,
    addBookmark,
    updateBookmark,
    removeBookmark,
    setSearchQuery,
    setSelectedCollectionId,
    getFilteredBookmarks,
  } = useBookmarkStore()

  const getErrorMessage = (err: unknown, fallback: string) =>
    err instanceof Error ? err.message : fallback

  const fetchBookmarks = useCallback(async () => {
    if (!user) return
    if (!supabase) {
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      let query = supabase
        .from('bookmarks')
        .select(`
          *,
          tags:bookmark_tags(
            tag:tags(*)
          ),
          collection:collections(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (selectedCollectionId) {
        query = query.eq('collection_id', selectedCollectionId)
      }

      const { data, error: fetchError } = await query

      if (fetchError) throw fetchError

      // Transform data to match BookmarkWithTags type
      const transformedData: BookmarkWithTags[] = (data ?? []).map((item: any) => {
        const { tags: rawTags, collection: rawCollection, ...bookmark } = item
        return {
          ...bookmark,
          tags: rawTags?.map((t: any) => t.tag).filter((tag: any): tag is Tag => tag !== null) || [],
          collection: rawCollection || undefined,
        }
      })

      setBookmarks(transformedData)
    } catch (err: unknown) {
      console.error('Error fetching bookmarks:', err)
      setError(getErrorMessage(err, 'Failed to fetch bookmarks'))
    } finally {
      setIsLoading(false)
    }
  }, [user, selectedCollectionId, supabase, setBookmarks])

  const createBookmark = async (bookmark: BookmarkInsert) => {
    if (!user) return { success: false, message: 'Not authenticated' }
    if (!supabase) return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }

    try {
      setIsLoading(true)
      setError(null)

      const { data, error: createError } = await supabase
        .from('bookmarks')
        .insert({ ...bookmark, user_id: user.id } as any)
        .select()
        .single()

      if (createError) throw createError

      addBookmark(data)
      return { success: true, data }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to create bookmark')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const updateBookmarkById = async (id: string, updates: BookmarkUpdate) => {
    if (!supabase) return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }

    try {
      setIsLoading(true)
      setError(null)

      const { data, error: updateError } = await supabase
        .from('bookmarks')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single()

      if (updateError) throw updateError

      updateBookmark(id, data)
      return { success: true, data }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to update bookmark')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBookmark = async (id: string) => {
    if (!supabase) return { success: false, message: SUPABASE_MISSING_ENV_MESSAGE }

    try {
      setIsLoading(true)
      setError(null)

      const { error: deleteError } = await supabase.from('bookmarks').delete().eq('id', id)

      if (deleteError) throw deleteError

      removeBookmark(id)
      return { success: true }
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err, 'Failed to delete bookmark')
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  const searchBookmarks = async (query: string) => {
    if (!user) return
    if (!supabase) {
      setError(SUPABASE_MISSING_ENV_MESSAGE)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const { data, error: searchError } = await supabase
        .from('bookmarks')
        .select(`
          *,
          tags:bookmark_tags(
            tag:tags(*)
          ),
          collection:collections(*)
        `)
        .eq('user_id', user.id)
        .textSearch('search_vector', query)
        .order('created_at', { ascending: false })

      if (searchError) throw searchError

      const transformedData: BookmarkWithTags[] = (data ?? []).map((item: any) => {
        const { tags: rawTags, collection: rawCollection, ...bookmark } = item
        return {
          ...bookmark,
          tags: rawTags?.map((t: any) => t.tag).filter((tag: any): tag is Tag => tag !== null) || [],
          collection: rawCollection || undefined,
        }
      })

      setBookmarks(transformedData)
    } catch (err: unknown) {
      console.error('Error searching bookmarks:', err)
      setError(getErrorMessage(err, 'Failed to search bookmarks'))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    // State
    bookmarks: getFilteredBookmarks(),
    allBookmarks: bookmarks,
    isLoading,
    error,
    searchQuery,
    selectedCollectionId,
    // Actions
    fetchBookmarks,
    createBookmark,
    updateBookmark: updateBookmarkById,
    deleteBookmark,
    searchBookmarks,
    setSearchQuery,
    setSelectedCollectionId,
  }
}
