'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useCollections } from '@/hooks/use-collections'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { 
  Home, 
  Search, 
  FolderOpen, 
  Plus, 
  Tag, 
  Archive,
  Sparkles,
  Settings,
  Moon,
  Sun,
  ChevronRight,
  Star
} from 'lucide-react'
import { useEffect, useState } from 'react'

const mainNav = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Search',
    href: '/dashboard/search',
    icon: Search,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'All Bookmarks',
    href: '/dashboard/bookmarks',
    icon: Archive,
    gradient: 'from-orange-500 to-amber-500',
  },
  {
    name: 'Tags',
    href: '/dashboard/tags',
    icon: Tag,
    gradient: 'from-green-500 to-emerald-500',
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { collections, fetchCollections, isLoading, setSelectedCollectionId } = useCollections()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    void fetchCollections()
    // Check for dark mode
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [fetchCollections])

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark')
    setIsDark(!isDark)
  }

  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200/50 bg-gradient-to-b from-white via-slate-50/50 to-white backdrop-blur-xl dark:border-slate-800/50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900">
      {/* Logo Section */}
      <div className="p-6">
        <Link href="/dashboard" className="group flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 animate-glow rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-60 blur-lg transition duration-500 group-hover:opacity-100" />
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              bl1nk
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Bookmarks
            </p>
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <div className="space-y-1.5 px-3">
        {mainNav.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="group relative block"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  'relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-slate-900 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white'
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                )}
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-lg shadow-sm transition-all duration-300',
                    isActive
                      ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg`
                      : 'bg-slate-100 text-slate-500 group-hover:scale-110 group-hover:shadow-md dark:bg-slate-800 dark:text-slate-400'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Collections Section */}
      <div className="mt-6 flex-1 px-3">
        <div className="mb-3 flex items-center justify-between px-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Collections
          </h3>
          <button className="group flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white dark:bg-slate-800 dark:text-slate-400">
            <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
          </button>
        </div>

        <ScrollArea className="h-[calc(100vh-420px)] pr-2">
          <div className="space-y-1">
            {isLoading ? (
              // Loading skeletons with animation
              Array.from({ length: 4 }).map((_, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-2 w-12 rounded" />
                  </div>
                </div>
              ))
            ) : collections.length === 0 ? (
              // Empty state with illustration
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                  <FolderOpen className="h-8 w-8 text-slate-400" />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  No collections yet
                </p>
                <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                  Create your first collection
                </p>
              </div>
            ) : (
              // Collections list
              collections.map((collection, index) => {
                const isActive = pathname === `/dashboard/collections/${collection.id}`

                return (
                  <Link
                    key={collection.id}
                    href={`/dashboard/collections/${collection.id}`}
                    onClick={() => setSelectedCollectionId(collection.id)}
                    className="group block"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300',
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10'
                          : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/50'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-9 w-9 items-center justify-center rounded-lg text-lg transition-all duration-300',
                          isActive
                            ? 'scale-110 bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg'
                            : 'bg-slate-100 group-hover:scale-105 dark:bg-slate-800'
                        )}
                      >
                        {collection.icon ? (
                          <span>{collection.icon}</span>
                        ) : (
                          <FolderOpen className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={cn(
                            'truncate text-sm font-semibold transition-colors',
                            isActive
                              ? 'text-slate-900 dark:text-white'
                              : 'text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white'
                          )}
                        >
                          {collection.name}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          {collection.bookmark_count ?? 0} items
                        </p>
                      </div>
                      {index === 0 && (
                        <div className="flex h-5 w-5 items-center justify-center">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer Section */}
      <div className="border-t border-slate-200/50 p-4 dark:border-slate-800/50">
        <div className="flex items-center justify-between">
          <Link
            href="/settings"
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <Settings className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            <span>Settings</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="group flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white dark:bg-slate-800 dark:text-slate-400"
          >
            {isDark ? (
              <Sun className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
            ) : (
              <Moon className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
