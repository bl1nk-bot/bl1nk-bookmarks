'use client'

import {
  Bookmark,
  Bookmark as BookmarkSolid,
  History,
  Mic,
  Search,
  X,
  Sparkles,
  Filter,
  ArrowUpDown,
  Grid3X3,
  List,
  SlidersHorizontal,
  TrendingUp,
  Clock,
  Star,
  Check,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type FallbackResult = {
  id: string
  title: string
  url: string
  tags: string[]
  coverClass: string
  coverText?: string
  saved?: boolean
  description?: string
}

const fallbackResults: FallbackResult[] = [
  {
    id: '1',
    title: 'Minimalist UI Pattern Collection',
    url: 'dribbble.com/shots/popular/mobile',
    tags: ['Design', 'Inspiration'],
    coverClass: 'bg-gradient-to-br from-indigo-400 to-purple-500',
    saved: true,
    description: 'A curated collection of minimalist UI patterns for modern web applications.',
  },
  {
    id: '2',
    title: 'Modern Javascript Tutorials 2024',
    url: 'javascript.info/tutorial/new',
    tags: ['Dev', 'Learning'],
    coverClass: 'bg-gradient-to-br from-emerald-400 to-teal-500',
    coverText: 'JS',
    description: 'Comprehensive JavaScript tutorials covering ES6+ features and best practices.',
  },
  {
    id: '3',
    title: 'Best Font Pairings for 2024',
    url: 'typewolf.com/recommendations',
    tags: ['Design', 'Typography'],
    coverClass: 'bg-gradient-to-br from-sky-400 to-blue-500',
    saved: true,
    description: 'Expert font pairing recommendations for beautiful typography.',
  },
  {
    id: '4',
    title: 'React Performance Optimization Guide',
    url: 'react.dev/learn/performance',
    tags: ['Dev', 'React'],
    coverClass: 'bg-gradient-to-br from-indigo-400 to-violet-500',
    coverText: 'R',
    description: 'Learn how to optimize your React applications for better performance.',
  },
  {
    id: '5',
    title: 'Tailwind CSS Components',
    url: 'tailwindui.com/components',
    tags: ['Design', 'CSS'],
    coverClass: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    description: 'Beautiful UI components built with Tailwind CSS.',
  },
  {
    id: '6',
    title: 'UX Design Principles',
    url: 'nngroup.com/articles/principles',
    tags: ['Design', 'UX'],
    coverClass: 'bg-gradient-to-br from-pink-400 to-rose-500',
    saved: true,
    description: 'Essential principles for creating great user experiences.',
  },
]

const filterTags = [
  { name: 'All', icon: Sparkles },
  { name: 'Design', icon: Star },
  { name: 'Development', icon: Filter },
  { name: 'Inspiration', icon: TrendingUp },
  { name: 'Articles', icon: Clock },
  { name: 'Tools', icon: SlidersHorizontal },
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'date', label: 'Date Added' },
  { value: 'title', label: 'Title' },
  { value: 'url', label: 'URL' },
]

const formatBookmarkUrl = (rawUrl: string) => {
  try {
    const parsed = new URL(rawUrl)
    return `${parsed.host}${parsed.pathname}`
  } catch {
    return rawUrl
  }
}

export default function SearchPage() {
  const { allBookmarks, fetchBookmarks, setSearchQuery } = useBookmarks()
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [sortBy, setSortBy] = useState('relevance')
  const [showFilters, setShowFilters] = useState(false)
  const [recentSearches, setRecentSearches] = useState([
    'UX Case Studies',
    'Tailwind components',
    'React hooks tutorial',
  ])

  useEffect(() => {
    void fetchBookmarks()
  }, [fetchBookmarks])

  useEffect(() => {
    setSearchQuery(query)
  }, [query, setSearchQuery])

  const mappedBookmarks: FallbackResult[] = useMemo(() => {
    if (allBookmarks.length === 0) return fallbackResults

    return allBookmarks.map((bookmark, index) => {
      const tagsList: string[] = []
      if ('tags' in bookmark && Array.isArray(bookmark.tags)) {
        bookmark.tags.forEach((tag: string | { name?: string }) => {
          if (typeof tag === 'string') tagsList.push(tag)
          else if (tag?.name) tagsList.push(tag.name)
        })
      }

      const firstTag = tagsList[0] ?? 'General'
      const secondTag = tagsList[1]
      const coverVariants = [
        'bg-gradient-to-br from-indigo-400 to-purple-500',
        'bg-gradient-to-br from-emerald-400 to-teal-500',
        'bg-gradient-to-br from-sky-400 to-blue-500',
        'bg-gradient-to-br from-pink-400 to-rose-500',
        'bg-gradient-to-br from-amber-400 to-orange-500',
      ]

      return {
        id: bookmark.id,
        title: bookmark.title || bookmark.url,
        url: formatBookmarkUrl(bookmark.url),
        tags: secondTag ? [firstTag, secondTag] : [firstTag],
        coverClass: coverVariants[index % coverVariants.length],
        saved: index % 2 === 0,
        description: bookmark.description || undefined,
      }
    })
  }, [allBookmarks])

  const results = useMemo(() => {
    let filtered = mappedBookmarks.filter((item) => {
      const normalizedQuery = query.trim().toLowerCase()
      const inQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.url.toLowerCase().includes(normalizedQuery)

      const inTag = activeTag === 'All' || item.tags.some((tag) => tag.toLowerCase().includes(activeTag.toLowerCase().slice(0, 4)))

      return inQuery && inTag
    })

    // Sort results
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'url':
          return a.url.localeCompare(b.url)
        case 'date':
          return (b.saved ? 1 : 0) - (a.saved ? 1 : 0)
        default:
          return (b.saved ? 1 : 0) - (a.saved ? 1 : 0)
      }
    })

    return filtered
  }, [mappedBookmarks, query, activeTag, sortBy])

  const removeRecent = (value: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== value))
  }

  const clearRecent = () => setRecentSearches([])

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24 antialiased selection:bg-indigo-500/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 animate-glow rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 opacity-20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-float rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 opacity-20 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 px-6 pb-6 pt-6 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
        <div className="mx-auto max-w-[1400px]">
          {/* Title */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 shadow-lg shadow-indigo-500/25">
                <Search className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Search
                </h1>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Find your bookmarks
                </p>
              </div>
            </div>

            {/* View Toggle & Filters */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  'hidden gap-2 lg:flex',
                  showFilters && 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                )}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all duration-200',
                    viewMode === 'list'
                      ? 'bg-white text-indigo-600 shadow-md dark:bg-slate-700 dark:text-indigo-400'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-all duration-200',
                    viewMode === 'grid'
                      ? 'bg-white text-indigo-600 shadow-md dark:bg-slate-700 dark:text-indigo-400'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                  )}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-slate-400 transition-all duration-200 group-focus-within:scale-110 group-focus-within:text-indigo-500" />
            </div>
            <input
              className="block w-full rounded-2xl border-2 border-slate-200/50 bg-white/80 py-4 pl-12 pr-24 text-base text-slate-900 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-white dark:shadow-slate-900/50 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-indigo-400"
              placeholder="Search your bookmarks..."
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-700 dark:hover:text-indigo-400">
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 pb-24 pt-6">
        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop */}
          <aside className={cn(
            'hidden w-64 shrink-0 space-y-6 lg:block',
            showFilters && 'block'
          )}>
            {/* Sort */}
            <div className="rounded-2xl border border-slate-200/50 bg-white/70 p-4 shadow-md backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/70">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <ArrowUpDown className="h-4 w-4" />
                Sort By
              </h3>
              <div className="space-y-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-all duration-200',
                      sortBy === option.value
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400'
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                    )}
                  >
                    {option.label}
                    {sortBy === option.value && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="rounded-2xl border border-slate-200/50 bg-white/70 p-4 shadow-md backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/70">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <SlidersHorizontal className="h-4 w-4" />
                Quick Filters
              </h3>
              <div className="space-y-2">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  Saved only
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  With thumbnails
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  Recent (7 days)
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Filter Tags - Mobile & Desktop */}
            <section>
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
                {filterTags.map((tag) => {
                  const Icon = tag.icon
                  const active = activeTag === tag.name
                  return (
                    <button
                      key={tag.name}
                      onClick={() => setActiveTag(tag.name)}
                      className={cn(
                        'group flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                        active
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'border border-slate-200/50 bg-white/80 text-slate-600 hover:border-indigo-300 hover:bg-white hover:text-indigo-600 hover:shadow-sm dark:border-slate-700/50 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-indigo-600 dark:hover:text-indigo-400'
                      )}
                    >
                      <Icon className={cn('h-4 w-4 transition-transform duration-200', !active && 'group-hover:scale-110')} />
                      <span>{tag.name}</span>
                    </button>
                  )
                })}
              </div>
            </section>

            {/* Results */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  Results
                </h2>
                <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
                  {results.length} {results.length === 1 ? 'result' : 'results'}
                </span>
              </div>

              <div className={cn(
                'gap-4',
                viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-3'
              )}>
                {results.map((item, index) => (
                  <a
                    key={item.id}
                    className="group relative block overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 p-4 shadow-md backdrop-blur-lg transition-all duration-200 hover:border-indigo-300/50 hover:bg-white/80 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700/50 dark:bg-slate-900/70 dark:hover:border-indigo-600/50 dark:hover:bg-slate-900/80"
                    href="#"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={cn(
                      'gap-4',
                      viewMode === 'grid' ? 'flex flex-col' : 'flex items-start'
                    )}>
                      {/* Cover */}
                      <div className={cn(
                        'relative shrink-0 overflow-hidden rounded-xl',
                        viewMode === 'grid' ? 'h-32 w-full' : 'h-14 w-14'
                      )}>
                        <div className={cn('absolute inset-0', item.coverClass)}>
                          <div className="absolute inset-0 bg-black/10" />
                        </div>
                        {item.coverText && (
                          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                            {item.coverText}
                          </div>
                        )}

                        {/* Save indicator */}
                        {item.saved && (
                          <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
                            <BookmarkSolid className="h-3.5 w-3.5 text-indigo-600" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-slate-100 dark:group-hover:text-indigo-400">
                            {item.title}
                          </h3>
                          {viewMode === 'list' && (
                            <button className="shrink-0 rounded-lg p-1.5 text-slate-400 opacity-0 transition-all duration-200 hover:bg-slate-100 hover:text-indigo-600 group-hover:opacity-100 dark:hover:bg-slate-700 dark:hover:text-indigo-400">
                              <Bookmark className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                          {item.url}
                        </p>

                        {viewMode === 'grid' && item.description && (
                          <p className="mt-2 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                            {item.description}
                          </p>
                        )}

                        <div className="mt-2.5 flex flex-wrap gap-1.5">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={`${item.id}-${tag}`}
                              className={cn(
                                'inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] font-semibold',
                                idx === 0
                                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 dark:from-indigo-900/50 dark:to-purple-900/50 dark:text-indigo-300'
                                  : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                              )}
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom gradient line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </a>
                ))}
              </div>

              {results.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                    No results found
                  </p>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </section>

            {/* Recent Searches */}
            <section className="mt-10">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  <History className="h-3.5 w-3.5" />
                  Recent Searches
                </h2>
                <button
                  className="text-xs font-semibold text-slate-400 transition-colors duration-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                  onClick={clearRecent}
                >
                  Clear all
                </button>
              </div>

              <div className="space-y-1">
                {recentSearches.map((item, index) => (
                  <div
                    key={item}
                    className="group flex cursor-pointer items-center justify-between rounded-xl px-3 py-3 transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 transition-all duration-200 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:bg-slate-800 dark:group-hover:bg-indigo-900/50 dark:group-hover:text-indigo-400">
                        <Clock className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 transition-colors duration-200 group-hover:text-indigo-600 dark:text-slate-300 dark:group-hover:text-indigo-400">
                        {item}
                      </span>
                    </div>
                    <button
                      className="rounded-lg p-1.5 text-slate-300 opacity-0 transition-all duration-200 hover:bg-slate-200 hover:text-slate-500 group-hover:opacity-100 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeRecent(item)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
