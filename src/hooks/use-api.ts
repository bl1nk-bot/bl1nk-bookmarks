'use client'

import { useState, useEffect, useCallback } from 'react'

interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: string) => void
  showToast?: boolean
}

export function useApi<T = any>(url: string, options: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const execute = useCallback(async (method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || 'Request failed')
      }

      setState({ data: result, loading: false, error: null })

      if (options.onSuccess) {
        options.onSuccess(result)
      }

      if (options.showToast !== false) {
        console.log('Operation completed successfully')
      }

      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'

      setState(prev => ({ ...prev, loading: false, error: errorMessage }))

      if (options.onError) {
        options.onError(errorMessage)
      }

      if (options.showToast !== false) {
        console.error('API Error:', errorMessage)
      }

      throw error
    }
  }, [url, options])

  const get = useCallback(() => execute('GET'), [execute])
  const post = useCallback((body: any) => execute('POST', body), [execute])
  const put = useCallback((body: any) => execute('PUT', body), [execute])
  const del = useCallback(() => execute('DELETE'), [execute])

  return {
    ...state,
    get,
    post,
    put,
    delete: del,
    execute
  }
}

export function useCollections() {
  return useApi('/api/collections', {
    showToast: true
  })
}

export function useBookmarks(options: { collectionId?: string } = {}) {
  const queryParams = new URLSearchParams()
  if (options.collectionId) {
    queryParams.set('collection_id', options.collectionId)
  }

  const url = `/api/bookmarks${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

  return useApi(url, {
    showToast: true
  })
}

export function useTags() {
  return useApi('/api/tags', {
    showToast: true
  })
}

export function useBookmarkSearch() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searching, setSearching] = useState(false)

  const search = useCallback(async (query: string, collectionId?: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setSearching(true)
    try {
      const params = new URLSearchParams({ query })
      if (collectionId) {
        params.set('collection_id', collectionId)
      }

      const response = await fetch(`/api/bookmarks/search?${params}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || 'Search failed')
      }

      setSearchResults(result.bookmarks || [])
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
      console.error('Search failed')
    } finally {
      setSearching(false)
    }
  }, [])

  return {
    searchResults,
    searching,
    search
  }
}