import { create } from 'zustand'
import { CollectionWithBookmarks } from '@/lib/types'

type CollectionState = {
  collections: CollectionWithBookmarks[]
  selectedCollectionId: string | null
  isLoading: boolean
  error: string | null
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
}

type CollectionStore = CollectionState & CollectionActions

export const useCollectionStore = create<CollectionStore>((set, get) => ({
  collections: [],
  selectedCollectionId: null,
  isLoading: false,
  error: null,

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
}))
