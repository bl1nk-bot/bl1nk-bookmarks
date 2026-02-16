'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { useBookmarks } from '@/hooks/use-bookmarks'
import { useCollections } from '@/hooks/use-collections'
import { fetchMetadata } from '@/lib/utils/metadata-fetcher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AddBookmarkDialogProps {
  trigger?: ReactNode
  onCreated?: () => void
}

export function AddBookmarkDialog({ trigger, onCreated }: AddBookmarkDialogProps) {
  const { createBookmark, isLoading: isSaving } = useBookmarks()
  const { collections, fetchCollections } = useCollections()

  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [faviconUrl, setFaviconUrl] = useState('')
  const [collectionId, setCollectionId] = useState('none')
  const [isFetchingMetadata, setIsFetchingMetadata] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      void fetchCollections()
    }
  }, [open, fetchCollections])

  const canFetchMetadata = useMemo(() => url.startsWith('http://') || url.startsWith('https://'), [url])

  const handleFetchMetadata = async () => {
    if (!canFetchMetadata) {
      setError('URL must start with http:// or https://')
      return
    }

    try {
      setIsFetchingMetadata(true)
      setError(null)
      setMessage(null)

      const metadata = await fetchMetadata(url)
      setTitle(metadata.title || '')
      setDescription(metadata.description || '')
      setThumbnailUrl(metadata.thumbnail || '')
      setFaviconUrl(metadata.favicon || '')
      setMessage('Metadata fetched successfully')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch metadata'
      setError(errorMessage)
    } finally {
      setIsFetchingMetadata(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setMessage(null)

    const result = await createBookmark({
      url,
      title: title || null,
      description: description || null,
      thumbnail_url: thumbnailUrl || null,
      favicon_url: faviconUrl || null,
      collection_id: collectionId === 'none' ? null : collectionId,
    })

    if (!result.success) {
      setError(result.message || 'Failed to create bookmark')
      return
    }

    setMessage('Bookmark added successfully')
    setUrl('')
    setTitle('')
    setDescription('')
    setThumbnailUrl('')
    setFaviconUrl('')
    setCollectionId('none')
    onCreated?.()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add bookmark
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Bookmark</DialogTitle>
          <DialogDescription>
            Paste a URL and optionally fetch metadata to pre-fill title and description.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="bookmark-url">URL</Label>
            <div className="flex gap-2">
              <Input
                id="bookmark-url"
                placeholder="https://example.com/article"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                required
              />
              <Button
                type="button"
                variant="secondary"
                disabled={isFetchingMetadata || !canFetchMetadata}
                onClick={() => void handleFetchMetadata()}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                {isFetchingMetadata ? 'Fetching...' : 'Fetch'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookmark-title">Title</Label>
            <Input
              id="bookmark-title"
              placeholder="Bookmark title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bookmark-description">Description</Label>
            <textarea
              id="bookmark-description"
              className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none ring-offset-background focus:ring-1 focus:ring-ring"
              placeholder="Short description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="bookmark-thumbnail">Thumbnail URL</Label>
              <Input
                id="bookmark-thumbnail"
                placeholder="https://..."
                value={thumbnailUrl}
                onChange={(event) => setThumbnailUrl(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bookmark-favicon">Favicon URL</Label>
              <Input
                id="bookmark-favicon"
                placeholder="https://..."
                value={faviconUrl}
                onChange={(event) => setFaviconUrl(event.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Collection</Label>
            <Select value={collectionId} onValueChange={setCollectionId}>
              <SelectTrigger>
                <SelectValue placeholder="Select collection" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No collection</SelectItem>
                {collections.map((collection) => (
                  <SelectItem key={collection.id} value={collection.id}>
                    {collection.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {!error && message && <p className="text-sm text-emerald-600">{message}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save bookmark'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
