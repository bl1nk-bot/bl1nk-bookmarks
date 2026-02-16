'use client'

import {
  Folder,
  FolderOpen,
  Plus,
  Search,
  Star,
  Sparkles,
  TrendingUp,
  Clock,
  Bookmark,
  ArrowRight,
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-24 antialiased selection:bg-blue-500/30 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 animate-glow rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-float rounded-full bg-gradient-to-r from-pink-400 to-orange-400 opacity-20 blur-[100px]" />
        <div className="pointer-events-none fixed inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 px-6 pb-6 pt-8 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 animate-glow rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-60 blur-lg" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-xl shadow-purple-500/25">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                  Dashboard
                </h1>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Welcome back! Here's your overview.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/search"
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200/50 bg-white/80 text-slate-500 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:text-blue-600 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
              >
                <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Link>
              <Link
                href="/dashboard/collections"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 active:scale-95"
              >
                <span>Edit Collections</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            <button className="group flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <Sparkles className="h-4 w-4" />
              All Items
            </button>
            <button className="group flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200/50 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:text-blue-600 hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400">
              <Star className="h-4 w-4" />
              Favorites
            </button>
            <button className="group flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200/50 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:text-blue-600 hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400">
              <Clock className="h-4 w-4" />
              Recent
            </button>
            <button className="group flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-200/50 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-600 shadow-md backdrop-blur-sm transition-all duration-300 hover:border-blue-300 hover:bg-white hover:text-blue-600 hover:shadow-lg dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400">
              <TrendingUp className="h-4 w-4" />
              Trending
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl flex-grow overflow-y-auto px-6 pb-24 pt-8">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link
            href="/dashboard/search"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50 hover:bg-white hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/80 dark:hover:border-blue-600/50 dark:hover:bg-slate-800"
          >
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 blur-2xl transition-all duration-300 group-hover:opacity-30" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Bookmark className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{totalBookmarks}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Bookmarks</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/collections"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50 hover:bg-white hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/80 dark:hover:border-blue-600/50 dark:hover:bg-slate-800"
          >
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 blur-2xl transition-all duration-300 group-hover:opacity-30" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Folder className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{collections.length}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Collections</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/search"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/50 hover:bg-white hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/80 dark:hover:border-yellow-600/50 dark:hover:bg-slate-800"
          >
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-20 blur-2xl transition-all duration-300 group-hover:opacity-30" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{favoritesCount}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Favorites</p>
              </div>
            </div>
          </Link>

          <div className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-green-300/50 hover:bg-white hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/80 dark:hover:border-green-600/50 dark:hover:bg-slate-800">
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 opacity-20 blur-2xl transition-all duration-300 group-hover:opacity-30" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-white">+12%</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">This Week</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collections Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            <FolderOpen className="h-4 w-4" />
            My Collections
          </h2>
          <Link
            href="/dashboard/collections"
            className="text-sm font-semibold text-blue-600 transition-colors hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/dashboard/collections/${collection.id}`}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-blue-300/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 active:scale-95 dark:border-slate-700/50 dark:bg-slate-800/80 dark:hover:border-blue-600/50 dark:hover:bg-slate-800"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-10 blur-2xl transition-all duration-300 group-hover:opacity-20" />
              
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-3xl shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 dark:from-slate-700 dark:to-slate-800">
                {collection.icon ? (
                  <span>{collection.icon}</span>
                ) : (
                  <FolderOpen className="h-7 w-7 text-slate-500 dark:text-slate-300" />
                )}
              </div>
              
              <h3 className="relative truncate text-base font-bold text-slate-900 dark:text-white">
                {collection.name}
              </h3>
              <p className="relative mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                {(collection.bookmark_count ?? 0).toLocaleString()} items
              </p>
              
              {index === 0 && (
                <div className="absolute right-4 top-4 h-2.5 w-2.5 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg ring-2 ring-white dark:ring-slate-800" />
              )}
              
              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          ))}

          {/* Add New Collection Card */}
          <Link
            href="/dashboard/collections"
            className="group flex min-h-[160px] h-full cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-5 transition-all duration-300 hover:border-blue-400 hover:from-blue-50 hover:to-indigo-50 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 dark:hover:border-blue-600 dark:hover:from-blue-950 dark:hover:to-indigo-950"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 text-slate-500 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white dark:from-slate-700 dark:to-slate-800 dark:text-slate-400">
              <Plus className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90" />
            </div>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">New Collection</span>
          </Link>
        </div>

        {/* Empty State */}
        {!isLoading && collections.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200/50 bg-white/80 p-8 text-center shadow-lg backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
              <FolderOpen className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
              No collections yet
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Create your first collection in{' '}
              <Link className="font-semibold text-blue-600 underline transition-colors hover:text-purple-600 dark:text-blue-400 dark:hover:text-purple-400" href="/dashboard/collections">
                Collection Builder
              </Link>
            </p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <AddBookmarkDialog
          trigger={
            <button className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/30 transition-all duration-300 hover:scale-110 hover:shadow-purple-500/40 active:scale-95">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Plus className="relative h-8 w-8 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          }
          onCreated={() => void fetchCollections()}
        />
      </div>
    </div>
  )
}
