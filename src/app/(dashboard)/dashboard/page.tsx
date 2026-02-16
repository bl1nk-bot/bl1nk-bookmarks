'use client'

import {
  Folder,
  FolderOpen,
  Plus,
  Search,
  Star,
  Sparkles,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-24 antialiased selection:bg-primary/30 dark:from-[#0a0e1a] dark:via-[#101622] dark:to-[#1a1f35]">
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-gradient-to-br from-white/80 via-blue-50/80 to-indigo-50/80 px-4 pb-4 pt-8 backdrop-blur-xl dark:border-slate-800/40 dark:from-[#0a0e1a]/80 dark:via-[#101622]/80 dark:to-[#1a1f35]/80 sm:px-6 md:px-8 md:pt-12 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg sm:h-10 sm:w-10">
                <Sparkles className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
              <h1 className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 sm:text-3xl">
                Collections
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/dashboard/search"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white/80 text-slate-600 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:text-blue-600 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 sm:h-10 sm:w-10"
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="/dashboard/collections"
                className="cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 sm:px-4 sm:py-2 sm:text-sm"
              >
                Edit
              </Link>
            </div>
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 sm:gap-3">
            <button className="whitespace-nowrap rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40 sm:px-5 sm:py-2 sm:text-sm">
              All Items
            </button>
            <button className="whitespace-nowrap rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold text-slate-700 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 sm:px-5 sm:py-2 sm:text-sm">
              Favorites
            </button>
            <button className="whitespace-nowrap rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold text-slate-700 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800 sm:px-5 sm:py-2 sm:text-sm">
              Archived
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex-grow overflow-y-auto px-4 pb-24 pt-4 sm:px-6 sm:pt-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
            <Link
              href="/dashboard/search"
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-blue-200/50 bg-gradient-to-br from-white via-blue-50 to-indigo-50 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-blue-300 hover:shadow-2xl active:scale-95 dark:border-blue-900/30 dark:from-slate-800 dark:via-blue-950 dark:to-indigo-950 sm:rounded-3xl sm:p-6"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 blur-2xl transition-all duration-300 group-hover:opacity-30 sm:h-24 sm:w-24" />
              <div className="relative mb-4 flex items-start justify-between sm:mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Folder className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 shadow-sm dark:bg-blue-900/50 dark:text-blue-300 sm:px-3 sm:py-1 sm:text-xs">
                  Pinned
                </span>
              </div>
              <h3 className="relative mb-1 text-base font-extrabold text-slate-900 dark:text-slate-100 sm:mb-2 sm:text-xl">All Bookmarks</h3>
              <p className="relative text-xs font-bold text-slate-600 dark:text-slate-300 sm:text-sm">
                {totalBookmarks.toLocaleString()} items
              </p>
            </Link>

            <Link
              href="/dashboard/search"
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-yellow-200/50 bg-gradient-to-br from-white via-yellow-50 to-orange-50 p-4 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-yellow-300 hover:shadow-2xl active:scale-95 dark:border-yellow-900/30 dark:from-slate-800 dark:via-yellow-950 dark:to-orange-950 sm:rounded-3xl sm:p-6"
            >
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 blur-2xl transition-all duration-300 group-hover:opacity-30 sm:h-24 sm:w-24" />
              <div className="relative mb-4 flex items-start justify-between sm:mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 sm:h-12 sm:w-12 sm:rounded-2xl">
                  <Star className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
              <h3 className="relative mb-1 text-base font-extrabold text-slate-900 dark:text-slate-100 sm:mb-2 sm:text-xl">Favorites</h3>
              <p className="relative text-xs font-bold text-slate-600 dark:text-slate-300 sm:text-sm">{favoritesCount} items</p>
            </Link>
          </div>

          <h2 className="mb-3 px-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400 sm:mb-4 sm:text-xs">
            My Folders
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                href={`/dashboard/collections/${collection.id}`}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-slate-200/50 bg-gradient-to-br from-white to-slate-50 p-4 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-slate-300 hover:shadow-xl active:scale-95 dark:border-slate-700/50 dark:from-slate-800 dark:to-slate-900 sm:rounded-3xl sm:p-6"
              >
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 blur-2xl transition-all duration-300 group-hover:opacity-20 sm:h-20 sm:w-20" />
                <div className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-3xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:from-slate-700 dark:to-slate-800 sm:mb-4 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-4xl">
                  {collection.icon ? (
                    <span>{collection.icon}</span>
                  ) : (
                    <FolderOpen className="h-6 w-6 text-slate-600 dark:text-slate-200 sm:h-7 sm:w-7" />
                  )}
                </div>
                <h3 className="relative truncate text-sm font-extrabold text-slate-900 dark:text-slate-100 sm:text-base">{collection.name}</h3>
                <p className="relative mt-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 sm:text-xs">
                  {(collection.bookmark_count ?? 0).toLocaleString()} items
                </p>
                {index === 0 && (
                  <div className="absolute right-3 top-3 h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg ring-2 ring-white dark:ring-slate-800 sm:right-4 sm:top-4 sm:h-2.5 sm:w-2.5" />
                )}
              </Link>
            ))}

            <Link
              href="/dashboard/collections"
              className="group flex min-h-[140px] h-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-blue-400 hover:from-blue-50 hover:to-indigo-50 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-blue-600 dark:hover:from-blue-950 dark:hover:to-indigo-950 sm:min-h-[160px] sm:gap-3 sm:rounded-3xl sm:p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 text-slate-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white dark:from-slate-700 dark:to-slate-800 dark:text-slate-400 sm:h-12 sm:w-12 sm:rounded-2xl">
                <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="text-xs font-extrabold text-slate-700 dark:text-slate-200 sm:text-sm">New Collection</span>
            </Link>
          </div>

          {!isLoading && collections.length === 0 && (
            <div className="mt-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 text-xs font-medium text-slate-600 shadow-lg dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 dark:text-slate-300 sm:p-5 sm:text-sm">
              No collections yet. Create one in{' '}
              <Link className="font-bold text-blue-600 underline transition-colors hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400" href="/dashboard/collections">
                Collection Builder
              </Link>
              .
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-20 right-4 z-40 sm:bottom-24 sm:right-6 md:right-8">
        <AddBookmarkDialog
          trigger={
            <button className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-blue-500/60 active:scale-95 sm:h-16 sm:w-16">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Plus className="relative h-7 w-7 sm:h-8 sm:w-8" />
            </button>
          }
          onCreated={() => void fetchCollections()}
        />
      </div>
    </div>
  )
}
