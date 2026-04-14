import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CollectionWithBookmarks } from '@/lib/types'

type CollectionState = {
  collections: CollectionWithBookmarks[]
  selectedCollectionId: string | null
  isLoading: boolean
  error: string | null
  lastFetched: number | null
  cacheExpiry: number // 5 minutes
}

type CollectionActions = {
  setCollections: (collections: CollectionWithBookmarks[]) => void
  addCollection: (collection: CollectionWithBookmarks) => void
  updateCollection: (collectionId: string, updates: Partial<CollectionWithBookmarks>) => void
  removeCollection: (collectionId: string) => void
  setSelectedCollectionId: (collectionId: string | null) => void
  clearSelectedCollection: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  getSelectedCollection: () => CollectionWithBookmarks | null

  // Enhanced actions
  fetchCollections: () => Promise<void>
  createCollection: (data: Omit<CollectionWithBookmarks, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateCollectionAsync: (collectionId: string, updates: Partial<CollectionWithBookmarks>) => Promise<void>
  deleteCollection: (collectionId: string) => Promise<void>
  invalidateCache: () => void
  isCacheValid: () => boolean
}

type CollectionStore = CollectionState & CollectionActions

export const useCollectionStore = create<CollectionStore>()(
  persist(
    (set, get) => ({
      collections: [],
      selectedCollectionId: null,
      isLoading: false,
      error: null,
      lastFetched: null,
      cacheExpiry: 5 * 60 * 1000, // 5 minutes

  setCollections: (collections) => set({ collections }),
  addCollection: (collection) =>
    set((state) => ({
      collections: [collection, ...state.collections.filter((item) => item.id !== collection.id)],
    })),
  updateCollection: (collectionId, updates) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === collectionId ? { ...collection, ...updates } : collection
      ),
    })),
  removeCollection: (collectionId) =>
    set((state) => ({
      collections: state.collections.filter((collection) => collection.id !== collectionId),
      selectedCollectionId:
        state.selectedCollectionId === collectionId ? null : state.selectedCollectionId,
    })),
  setSelectedCollectionId: (selectedCollectionId) => set({ selectedCollectionId }),
  clearSelectedCollection: () => set({ selectedCollectionId: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  getSelectedCollection: () => {
    const { collections, selectedCollectionId } = get()
    if (!selectedCollectionId) return null
    return collections.find((collection) => collection.id === selectedCollectionId) ?? null
  },

  // Enhanced async actions
  fetchCollections: async () => {
    const { isCacheValid, lastFetched, cacheExpiry } = get()
    if (isCacheValid() && lastFetched) {
      return // Use cached data
    }

    set({ isLoading: true, error: null })

    try {
      const response = await fetch('/api/collections')
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to fetch collections')
      }

      set({
        collections: result.collections || [],
        isLoading: false,
        error: null,
        lastFetched: Date.now()
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch collections'
      })
    }
  },

  createCollection: async (data) => {
    set({ isLoading: true, error: null })

    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error?.message || 'Failed to create collection')
      }

      const { addCollection } = get()
      addCollection(result.collection)
      set({ isLoading: false, error: null })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create collection'
      })
      throw error
    }
  },

  updateCollectionAsync: async (collectionId, updates) => {
    const originalCollection = get().collections.find(c => c.id === collectionId)

    // Optimistic update
    get().updateCollection(collectionId, updates)

    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      const result = await response.json()

      if (!response.ok) {
        // Revert optimistic update
        if (originalCollection) {
          get().updateCollection(collectionId, originalCollection)
        }
        throw new Error(result.error?.message || 'Failed to update collection')
      }

      // Update with server response
      get().updateCollection(collectionId, result.collection)
    } catch (error) {
      // Revert optimistic update
      if (originalCollection) {
        get().updateCollection(collectionId, originalCollection)
      }
      set({ error: error instanceof Error ? error.message : 'Failed to update collection' })
      throw error
    }
  },

  deleteCollection: async (collectionId) => {
    const originalCollections = [...get().collections]

    // Optimistic update
    get().removeCollection(collectionId)

    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        // Revert optimistic update
        set({ collections: originalCollections })
        const result = await response.json()
        throw new Error(result.error?.message || 'Failed to delete collection')
      }
    } catch (error) {
      // Revert optimistic update
      set({ collections: originalCollections })
      set({ error: error instanceof Error ? error.message : 'Failed to delete collection' })
      throw error
    }
  },

  invalidateCache: () => set({ lastFetched: null }),

  isCacheValid: () => {
    const { lastFetched, cacheExpiry } = get()
    if (!lastFetched) return false
    return Date.now() - lastFetched < cacheExpiry
  }
}),
{
  name: 'collection-store',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    collections: state.collections,
    selectedCollectionId: state.selectedCollectionId,
    lastFetched: state.lastFetched
  })
}
))
