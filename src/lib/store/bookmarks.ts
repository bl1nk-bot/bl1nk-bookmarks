import { create } from 'zustand'
import { Bookmark } from '@/lib/types'

type BookmarkState = {
  bookmarks: Bookmark[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedCollectionId: string | null
}

type BookmarkActions = {
  setBookmarks: (bookmarks: Bookmark[]) => void
  addBookmark: (bookmark: Bookmark) => void
  updateBookmark: (bookmarkId: string, updates: Partial<Bookmark>) => void
  removeBookmark: (bookmarkId: string) => void
  clearBookmarks: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  setSearchQuery: (query: string) => void
  setSelectedCollectionId: (collectionId: string | null) => void
  getFilteredBookmarks: () => Bookmark[]
}

type BookmarkStore = BookmarkState & BookmarkActions

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedCollectionId: null,

  setBookmarks: (bookmarks) => set({ bookmarks }),
  addBookmark: (bookmark) =>
    set((state) => ({
      bookmarks: [bookmark, ...state.bookmarks.filter((item) => item.id !== bookmark.id)],
    })),
  updateBookmark: (bookmarkId, updates) =>
    set((state) => ({
      bookmarks: state.bookmarks.map((bookmark) =>
        bookmark.id === bookmarkId ? { ...bookmark, ...updates } : bookmark
      ),
    })),
  removeBookmark: (bookmarkId) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== bookmarkId),
    })),
  clearBookmarks: () => set({ bookmarks: [] }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedCollectionId: (selectedCollectionId) => set({ selectedCollectionId }),
  getFilteredBookmarks: () => {
    const { bookmarks, searchQuery, selectedCollectionId } = get()
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return bookmarks.filter((bookmark) => {
      const matchesCollection = selectedCollectionId
        ? bookmark.collection_id === selectedCollectionId
        : true
      const matchesQuery =
        normalizedQuery.length === 0
          ? true
          : [bookmark.title, bookmark.description, bookmark.url]
              .filter(Boolean)
              .some((value) => value?.toLowerCase().includes(normalizedQuery))

      return matchesCollection && matchesQuery
    })
  },
}))
