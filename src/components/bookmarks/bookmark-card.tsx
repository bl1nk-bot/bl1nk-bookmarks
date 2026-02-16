'use client'

import { BookmarkWithTags } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ExternalLink, MoreVertical, Pencil, Trash2, FolderOpen, Star, Copy, Share2, Globe } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'

interface BookmarkCardProps {
  bookmark: BookmarkWithTags
  onEdit?: (bookmark: BookmarkWithTags) => void
  onDelete?: (id: string) => void
}

export function BookmarkCard({ bookmark, onEdit, onDelete }: BookmarkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  const getFavicon = (url: string) => {
    try {
      const hostname = new URL(url).hostname
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`
    } catch {
      return null
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookmark.url)
  }

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white transition-all duration-300 hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-500/5 dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:border-blue-600/50 dark:hover:shadow-blue-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative p-4">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
            {bookmark.thumbnail_url && !imageError ? (
              <Image
                src={bookmark.thumbnail_url}
                alt={bookmark.title || 'Bookmark'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                {bookmark.favicon_url ? (
                  <Image 
                    src={bookmark.favicon_url} 
                    alt="" 
                    width={32} 
                    height={32} 
                    unoptimized
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <Globe className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                )}
              </div>
            )}
            
            {/* Favorite indicator */}
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
              <Star className="h-3.5 w-3.5 fill-white text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title & Actions */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/title flex items-center gap-1.5 font-semibold text-slate-900 transition-colors hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400 line-clamp-1"
                >
                  <span className="truncate">{bookmark.title || 'Untitled'}</span>
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 opacity-0 transition-all duration-300 group-hover/title:opacity-100" />
                </a>
                
                <div className="mt-1.5 flex items-center gap-2">
                  {bookmark.favicon_url ? (
                    <Image 
                      src={bookmark.favicon_url} 
                      alt="" 
                      width={14} 
                      height={14} 
                      unoptimized
                      className="rounded-sm"
                    />
                  ) : (
                    <div className="h-3.5 w-3.5 rounded-sm bg-gradient-to-br from-blue-500 to-purple-500" />
                  )}
                  <span className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {getHostname(bookmark.url)}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {formatDistanceToNow(new Date(bookmark.created_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-0 transition-all duration-300 hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100 dark:hover:bg-slate-700 dark:hover:text-slate-300">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200/50 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/95">
                  <DropdownMenuItem 
                    onClick={() => onEdit?.(bookmark)}
                    className="group/item my-0.5 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 dark:text-slate-300 dark:hover:from-blue-950 dark:hover:to-purple-950 dark:hover:text-blue-400"
                  >
                    <Pencil className="mr-2.5 h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="group/item my-0.5 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 dark:text-slate-300 dark:hover:from-blue-950 dark:hover:to-purple-950 dark:hover:text-blue-400">
                    <FolderOpen className="mr-2.5 h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                    Move to collection
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={copyToClipboard}
                    className="group/item my-0.5 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 dark:text-slate-300 dark:hover:from-blue-950 dark:hover:to-purple-950 dark:hover:text-blue-400"
                  >
                    <Copy className="mr-2.5 h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                    Copy URL
                  </DropdownMenuItem>
                  <DropdownMenuItem className="group/item my-0.5 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 dark:text-slate-300 dark:hover:from-blue-950 dark:hover:to-purple-950 dark:hover:text-blue-400">
                    <Share2 className="mr-2.5 h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1.5 bg-slate-100 dark:bg-slate-700" />
                  <DropdownMenuItem
                    className="group/item my-0.5 cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition-all duration-200 hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 dark:text-rose-400 dark:hover:from-rose-950 dark:hover:to-pink-950"
                    onClick={() => onDelete?.(bookmark.id)}
                  >
                    <Trash2 className="mr-2.5 h-4 w-4 transition-transform duration-200 group-hover/item:scale-110" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Description */}
            {bookmark.description && (
              <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                {bookmark.description}
              </p>
            )}

            {/* Tags & Collection */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {bookmark.collection && (
                <Badge 
                  variant="outline" 
                  className="gap-1.5 rounded-lg border-blue-200/50 bg-gradient-to-r from-blue-50 to-purple-50 px-2.5 py-1 text-xs font-semibold text-blue-700 transition-all duration-300 hover:from-blue-100 hover:to-purple-100 dark:border-blue-800/50 dark:from-blue-950/50 dark:to-purple-950/50 dark:text-blue-300"
                >
                  <FolderOpen className="h-3 w-3" />
                  {bookmark.collection.name}
                </Badge>
              )}
              {bookmark.tags?.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={tag.id} 
                  variant="secondary" 
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-300 hover:scale-105 ${
                    index === 0 
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/50 dark:to-pink-900/50 dark:text-purple-300'
                      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  #{tag.name}
                </Badge>
              ))}
              {bookmark.tags && bookmark.tags.length > 3 && (
                <Badge 
                  variant="secondary" 
                  className="rounded-lg bg-gradient-to-r from-slate-100 to-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 dark:from-slate-700 dark:to-slate-600 dark:text-slate-300"
                >
                  +{bookmark.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  )
}
