import { Database } from './database.types'

// Table types
export type Collection = Database['public']['Tables']['collections']['Row']
export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
export type Tag = Database['public']['Tables']['tags']['Row']
export type BookmarkTag = Database['public']['Tables']['bookmark_tags']['Row']

// Insert types
export type CollectionInsert = Database['public']['Tables']['collections']['Insert']
export type BookmarkInsert = Omit<Database['public']['Tables']['bookmarks']['Insert'], 'user_id'>
export type TagInsert = Database['public']['Tables']['tags']['Insert']

// Update types
export type CollectionUpdate = Database['public']['Tables']['collections']['Update']
export type BookmarkUpdate = Database['public']['Tables']['bookmarks']['Update']
export type TagUpdate = Database['public']['Tables']['tags']['Update']

// Extended types with relations
export interface BookmarkWithTags extends Bookmark {
  tags?: Tag[]
  collection?: Collection
}

export interface CollectionWithBookmarks extends Collection {
  bookmarks?: Bookmark[]
  bookmark_count?: number
}

// Template types
export type TemplateType = 'default' | 'books' | 'recipes' | 'articles' | 'videos'

export interface BookTemplate {
  author?: string
  isbn?: string
  publishedYear?: number
  rating?: number
}

export interface RecipeTemplate {
  ingredients?: string[]
  cookTime?: number
  servings?: number
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface ArticleTemplate {
  author?: string
  readTime?: number
  publishedDate?: string
  source?: string
}

export interface VideoTemplate {
  duration?: number
  channel?: string
  platform?: 'youtube' | 'vimeo' | 'other'
}

// Metadata fetching
export interface UrlMetadata {
  url: string
  title: string | null
  description: string | null
  thumbnail: string | null
  favicon: string | null
}

// Search types
export interface SearchFilters {
  collectionId?: string
  tags?: string[]
  query?: string
  sortBy?: 'created_at' | 'updated_at' | 'title'
  sortOrder?: 'asc' | 'desc'
}
