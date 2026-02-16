// Database Types - Generated from Supabase Schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collections: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          icon: string | null
          template_type: string
          color: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          icon?: string | null
          template_type?: string
          color?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          icon?: string | null
          template_type?: string
          color?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: string
          user_id: string
          collection_id: string | null
          url: string
          title: string | null
          description: string | null
          thumbnail_url: string | null
          favicon_url: string | null
          custom_fields: Json
          search_vector: unknown | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          collection_id?: string | null
          url: string
          title?: string | null
          description?: string | null
          thumbnail_url?: string | null
          favicon_url?: string | null
          custom_fields?: Json
          search_vector?: unknown | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          collection_id?: string | null
          url?: string
          title?: string | null
          description?: string | null
          thumbnail_url?: string | null
          favicon_url?: string | null
          custom_fields?: Json
          search_vector?: unknown | null
          created_at?: string
          updated_at?: string
        }
      }
      tags: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          created_at?: string
        }
      }
      bookmark_tags: {
        Row: {
          bookmark_id: string
          tag_id: string
          created_at: string
        }
        Insert: {
          bookmark_id: string
          tag_id: string
          created_at?: string
        }
        Update: {
          bookmark_id?: string
          tag_id?: string
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
