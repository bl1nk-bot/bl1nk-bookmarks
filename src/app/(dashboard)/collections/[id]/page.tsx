'use client'

import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { useCollections } from '@/hooks/use-collections'
import { BookmarkList } from '@/components/bookmarks/bookmark-list'

export default function CollectionDetailPage() {
  const params = useParams<{ id: string }>()
  const collectionId = params?.id ?? ''

  const { collections, fetchCollections, isLoading: collectionsLoading } = useCollections()
  const {
    bookmarks,
    fetchBookmarks,
    setSelectedCollectionId,
    isLoading: bookmarksLoading,
  } = useBookmarks()

  useEffect(() => {
    if (!collectionId) return
    setSelectedCollectionId(collectionId)
    void Promise.all([fetchCollections(), fetchBookmarks()])
  }, [collectionId, setSelectedCollectionId, fetchCollections, fetchBookmarks])

  const currentCollection = useMemo(
    () => collections.find((item) => item.id === collectionId),
    [collections, collectionId]
  )

  return (
    <main className="min-h-screen px-4 pb-24 pt-8">
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {currentCollection?.name ?? 'Collection'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {(currentCollection?.bookmark_count ?? bookmarks.length).toLocaleString()} items
          </p>
        </div>
      </div>

      <BookmarkList
        bookmarks={bookmarks}
        isLoading={collectionsLoading || bookmarksLoading}
      />
    </main>
  )
}
