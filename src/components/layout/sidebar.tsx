'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useCollections } from '@/hooks/use-collections'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Home, Search, FolderOpen, Plus, Tag, Archive } from 'lucide-react'
import { useEffect } from 'react'

const mainNav = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Search',
    href: '/dashboard/search',
    icon: Search,
  },
  {
    name: 'All Bookmarks',
    href: '/dashboard/bookmarks',
    icon: Archive,
  },
  {
    name: 'Tags',
    href: '/dashboard/tags',
    icon: Tag,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { collections, fetchCollections, isLoading, setSelectedCollectionId } = useCollections()

  useEffect(() => {
    void fetchCollections()
  }, [fetchCollections])

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/10">
      {/* Main Navigation */}
      <div className="space-y-1 p-4">
        {mainNav.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn('w-full justify-start', isActive && 'bg-secondary font-medium')}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          )
        })}
      </div>

      {/* Collections */}
      <div className="flex-1 px-4 py-2">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Collections</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-1">
            {isLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-9 w-full" />)
            ) : collections.length === 0 ? (
              // Empty state
              <p className="py-4 text-center text-sm text-muted-foreground">No collections yet</p>
            ) : (
              // Collections list
              collections.map((collection) => {
                const isActive = pathname === `/dashboard/collections/${collection.id}`

                return (
                  <Link
                    key={collection.id}
                    href={`/dashboard/collections/${collection.id}`}
                    onClick={() => setSelectedCollectionId(collection.id)}
                  >
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      className={cn('w-full justify-start', isActive && 'bg-secondary font-medium')}
                    >
                      <FolderOpen className="mr-2 h-4 w-4" />
                      <span className="flex-1 truncate text-left">{collection.name}</span>
                      {collection.bookmark_count !== undefined && (
                        <span className="text-xs text-muted-foreground">
                          {collection.bookmark_count}
                        </span>
                      )}
                    </Button>
                  </Link>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
