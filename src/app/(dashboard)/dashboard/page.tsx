'use client'

import {
  Folder,
  FolderOpen,
  Plus,
  Search,
  Star,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { useCollections } from '@/hooks/use-collections'
import { AddBookmarkDialog } from '@/components/bookmarks/add-bookmark-dialog'

export default function DashboardPage() {
  const { collections, fetchCollections, isLoading } = useCollections()

  useEffect(() => {
    void fetchCollections()
  }, [fetchCollections])

  const favoritesCount = useMemo(() => {
    const favoriteCollection = collections.find((item) =>
      item.name.toLowerCase().includes('favorite')
    )
    return favoriteCollection?.bookmark_count ?? 0
  }, [collections])

  const totalBookmarks = useMemo(
    () => collections.reduce((sum, item) => sum + (item.bookmark_count ?? 0), 0),
    [collections]
  )

  return (
    <div className="min-h-screen bg-[#f6f6f8] pb-24 antialiased selection:bg-primary/30 dark:bg-[#101622]">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#f6f6f8]/80 px-6 pb-4 pt-12 backdrop-blur-md dark:border-slate-800/50 dark:bg-[#101622]/80">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My Collections</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/search"
              className="cursor-pointer rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Search className="h-6 w-6" />
            </Link>
            <Link
              href="/dashboard/collections"
              className="cursor-pointer text-base font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Edit
            </Link>
          </div>
        </div>

        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
          <button className="whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-primary/25">
            All Items
          </button>
          <button className="whitespace-nowrap rounded-full bg-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            Favorites
          </button>
          <button className="whitespace-nowrap rounded-full bg-slate-200 px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
            Archived
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto px-4 pb-24 pt-6">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <Link
            href="/dashboard/search"
            className="group relative cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/50 active:scale-95 dark:border-slate-800 dark:bg-[#1C1C1E] dark:hover:border-primary/50"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-primary dark:bg-blue-500/10">
                <Folder className="h-5 w-5" />
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                Pinned
              </span>
            </div>
            <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-100">All Bookmarks</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {totalBookmarks.toLocaleString()} items
            </p>
          </Link>

          <Link
            href="/dashboard/search"
            className="group relative cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-yellow-500/50 active:scale-95 dark:border-slate-800 dark:bg-[#1C1C1E]"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-500">
                <Star className="h-5 w-5" />
              </div>
            </div>
            <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-slate-100">Favorites</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{favoritesCount} items</p>
          </Link>
        </div>

        <h2 className="mb-4 px-1 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          My Folders
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/dashboard/collections/${collection.id}`}
              className="relative cursor-pointer rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-transform duration-200 active:scale-95 dark:border-slate-800 dark:bg-[#1C1C1E]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center text-3xl">
                {collection.icon ? (
                  <span>{collection.icon}</span>
                ) : (
                  <FolderOpen className="h-6 w-6 text-slate-600 dark:text-slate-200" />
                )}
              </div>
              <h3 className="truncate text-base font-bold text-slate-900 dark:text-slate-100">{collection.name}</h3>
              <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                {(collection.bookmark_count ?? 0).toLocaleString()} items
              </p>
              {index === 0 && (
                <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary ring-2 ring-white dark:ring-[#1C1C1E]" />
              )}
            </Link>
          ))}

          <Link
            href="/dashboard/collections"
            className="flex min-h-[140px] h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 p-5 transition-colors hover:border-primary/50 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">New Collection</span>
          </Link>
        </div>

        {!isLoading && collections.length === 0 && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-[#1C1C1E] dark:text-slate-300">
            No collections yet. Create one in{' '}
            <Link className="font-semibold text-primary underline" href="/dashboard/collections">
              Collection Builder
            </Link>
            .
          </div>
        )}
      </main>

      <div className="fixed bottom-24 right-6 z-40">
        <AddBookmarkDialog
          trigger={
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 transition-all duration-200 hover:scale-105 hover:bg-primary/90 active:scale-95">
              <Plus className="h-8 w-8" />
            </button>
          }
          onCreated={() => void fetchCollections()}
        />
      </div>
    </div>
  )
}
