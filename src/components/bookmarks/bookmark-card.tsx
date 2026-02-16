'use client'

import { BookmarkWithTags } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ExternalLink, MoreVertical, Pencil, Trash2, FolderOpen } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'

interface BookmarkCardProps {
  bookmark: BookmarkWithTags
  onEdit?: (bookmark: BookmarkWithTags) => void
  onDelete?: (id: string) => void
}

export function BookmarkCard({ bookmark, onEdit, onDelete }: BookmarkCardProps) {
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Thumbnail */}
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            {bookmark.thumbnail_url ? (
              <Image
                src={bookmark.thumbnail_url}
                alt={bookmark.title || 'Bookmark'}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                {bookmark.favicon_url ? (
                  <Image src={bookmark.favicon_url} alt="" width={24} height={24} unoptimized />
                ) : (
                  <ExternalLink className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            {/* Title & Actions */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-2 font-medium hover:underline"
                >
                  {bookmark.title || 'Untitled'}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  {getHostname(bookmark.url)} •{' '}
                  {formatDistanceToNow(new Date(bookmark.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(bookmark)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Move to collection
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDelete?.(bookmark.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Description */}
            {bookmark.description && (
              <p className="line-clamp-2 text-sm text-muted-foreground">{bookmark.description}</p>
            )}

            {/* Tags & Collection */}
            <div className="flex flex-wrap gap-2">
              {bookmark.collection && (
                <Badge variant="outline" className="text-xs">
                  <FolderOpen className="mr-1 h-3 w-3" />
                  {bookmark.collection.name}
                </Badge>
              )}
              {bookmark.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag.id} variant="secondary" className="text-xs">
                  {tag.name}
                </Badge>
              ))}
              {bookmark.tags && bookmark.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{bookmark.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
