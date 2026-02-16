'use client'

import { BookmarkWithTags } from '@/lib/types'
import { BookmarkCard } from './bookmark-card'
import { Skeleton } from '@/components/ui/skeleton'

interface BookmarkListProps {
  bookmarks: BookmarkWithTags[]
  isLoading?: boolean
  onEdit?: (bookmark: BookmarkWithTags) => void
  onDelete?: (id: string) => void
}

export function BookmarkList({ bookmarks, isLoading, onEdit, onDelete }: BookmarkListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">No bookmarks yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first bookmark to get started
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
