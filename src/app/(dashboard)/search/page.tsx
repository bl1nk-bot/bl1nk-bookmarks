'use client'

import {
  Bookmark,
  BookmarkPlus,
  Bookmark as BookmarkSolid,
  History,
  Mic,
  Search,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { cn } from '@/lib/utils'

type FallbackResult = {
  id: string
  title: string
  url: string
  tags: string[]
  coverClass: string
  coverText?: string
  saved?: boolean
}

const fallbackResults: FallbackResult[] = [
  {
    id: '1',
    title: 'Minimalist UI Pattern Collection',
    url: 'dribbble.com/shots/popular/mobile',
    tags: ['Design', 'Inspiration'],
    coverClass: 'bg-gradient-to-br from-indigo-300 to-cyan-200',
    saved: true,
  },
  {
    id: '2',
    title: 'Modern Javascript Tutorials 2024',
    url: 'javascript.info/tutorial/new',
    tags: ['Dev', 'Learning'],
    coverClass: 'bg-emerald-100 text-emerald-700',
    coverText: 'JS',
  },
  {
    id: '3',
    title: 'Best Font Pairings for 2024',
    url: 'typewolf.com/recommendations',
    tags: ['Design', 'Typography'],
    coverClass: 'bg-gradient-to-br from-sky-300 to-indigo-300',
    saved: true,
  },
]

const tags = ['Design', 'Development', 'Inspiration', 'Articles', 'Tools']

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
  const [activeTag, setActiveTag] = useState('Design')
  const [recentSearches, setRecentSearches] = useState([
    'UX Case Studies',
    'Tailwind components',
    'Healthy dinner ideas',
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
      const coverVariants = [
        'bg-gradient-to-br from-indigo-300 to-cyan-200',
        'bg-gradient-to-br from-emerald-200 to-teal-200',
        'bg-gradient-to-br from-sky-300 to-indigo-300',
      ]

      return {
        id: bookmark.id,
        title: bookmark.title || bookmark.url,
        url: formatBookmarkUrl(bookmark.url),
        tags: ['General'],
        coverClass: coverVariants[index % coverVariants.length],
        saved: index % 2 === 0,
      }
    })
  }, [allBookmarks])

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return mappedBookmarks.filter((item) => {
      const inQuery =
        normalizedQuery.length === 0 ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.url.toLowerCase().includes(normalizedQuery)

      const inTag = item.tags.some((tag) => tag.toLowerCase().includes(activeTag.toLowerCase().slice(0, 4)))

      return inQuery && (activeTag === 'Design' ? true : inTag)
    })
  }, [mappedBookmarks, query, activeTag])

  const removeRecent = (value: string) => {
    setRecentSearches((prev) => prev.filter((item) => item !== value))
  }

  const clearRecent = () => setRecentSearches([])

  return (
    <div className="relative min-h-screen pb-24 text-slate-800 antialiased dark:text-slate-200">
      <div className="z-50 flex h-12 w-full items-end justify-between px-6 pb-2 text-xs font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-current opacity-80" />
          <span className="h-2 w-2 rounded-full bg-current opacity-80" />
          <span className="h-2 w-4 rounded-full bg-current opacity-80" />
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-100/95 px-5 pb-4 pt-2 backdrop-blur-md dark:border-slate-800/50 dark:bg-[#101622]/95">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Search</h1>
          <button className="rounded-full p-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800">
            <span className="text-slate-500 dark:text-slate-400">•••</span>
          </button>
        </div>

        <label className="group relative block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-primary" />
          </div>
          <input
            className="block w-full rounded-xl border-none bg-white py-3.5 pl-10 pr-10 text-sm shadow-sm transition-all placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary dark:bg-slate-800/60 dark:focus:bg-slate-800"
            placeholder="Search your bookmarks..."
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300">
              <Mic className="h-4 w-4" />
            </button>
          </div>
        </label>
      </header>

      <main className="no-scrollbar flex-1 overflow-y-auto pb-24">
        <section className="mt-4 pl-5">
          <div className="mb-3 flex items-center justify-between pr-5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter by Tag
            </h2>
          </div>
          <div className="no-scrollbar flex space-x-3 overflow-x-auto pb-2 pr-5">
            {tags.map((tag) => {
              const active = activeTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    'whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all active:scale-95',
                    active
                      ? 'flex items-center space-x-1.5 bg-primary text-white shadow-lg shadow-primary/20'
                      : 'border border-slate-100 bg-white text-slate-600 hover:border-primary/30 dark:border-slate-700/50 dark:bg-slate-800/60 dark:text-slate-300'
                  )}
                >
                  {active && <BookmarkPlus className="h-3.5 w-3.5" />}
                  <span>{tag}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="mt-6 px-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Top Results
            </h2>
            <button className="text-xs font-medium text-primary transition-colors hover:text-primary/80">View All</button>
          </div>
          <div className="space-y-3">
            {results.map((item) => (
              <a
                key={item.id}
                className="group block rounded-xl border border-transparent bg-white p-3 transition-all duration-200 hover:border-primary/20 hover:bg-white dark:border-slate-700/30 dark:bg-slate-800/40 dark:hover:bg-slate-800"
                href="#"
              >
                <div className="flex items-start gap-3">
                  <div className={cn('relative h-12 w-12 shrink-0 overflow-hidden rounded-lg', item.coverClass)}>
                    {item.coverText ? (
                      <div className="flex h-full w-full items-center justify-center font-bold">{item.coverText}</div>
                    ) : (
                      <div className="absolute inset-0 bg-black/10" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{item.url}</p>
                    <div className="mt-2 flex gap-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={`${item.id}-${tag}`}
                          className={cn(
                            'inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium',
                            idx === 0
                              ? 'bg-primary/10 text-primary'
                              : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                          )}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="shrink-0 p-1 text-slate-400 transition-colors hover:text-primary">
                    {item.saved ? <BookmarkSolid className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  </button>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-6 mt-8 px-5">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Recent Searches
            </h2>
            <button className="text-xs text-slate-400 hover:text-slate-300" onClick={clearRecent}>
              Clear
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {recentSearches.map((item) => (
              <div key={item} className="group flex cursor-pointer items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <History className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-700 transition-colors group-hover:text-primary dark:text-slate-300">{item}</span>
                </div>
                <button
                  className="text-slate-300 transition-colors hover:text-slate-500 dark:hover:text-slate-200"
                  onClick={() => removeRecent(item)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
