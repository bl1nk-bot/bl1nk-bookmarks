import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const createBookmarkSchema = z.object({
  url: z.string().url('Invalid URL format'),
  title: z.string().optional(),
  description: z.string().optional(),
  collection_id: z.string().uuid().optional(),
  custom_fields: z.record(z.any()).optional()
})

const bookmarkFiltersSchema = z.object({
  collection_id: z.string().uuid().optional(),
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).default(50),
  offset: z.number().min(0).default(0)
})

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json(
        { error: { code: 'CONFIG_ERROR', message: 'Database configuration error' } },
        { status: 500 }
      )
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const filters = bookmarkFiltersSchema.parse({
      collection_id: searchParams.get('collection_id'),
      search: searchParams.get('search'),
      tags: searchParams.get('tags')?.split(','),
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0')
    })

    let query = supabase
      .from('bookmarks')
      .select(`
        *,
        collections (
          id,
          name,
          color
        )
      `)
      .eq('user_id', user.id)

    // Apply filters
    if (filters.collection_id) {
      query = query.eq('collection_id', filters.collection_id)
    }

    if (filters.search) {
      query = query.ilike('title', `%${filters.search}%`)
    }

    // Apply pagination
    query = query
      .order('created_at', { ascending: false })
      .range(filters.offset, filters.offset + filters.limit - 1)

    const { data: bookmarks, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch bookmarks' } },
        { status: 500 }
      )
    }

    return NextResponse.json({
      bookmarks: bookmarks || [],
      total: count || 0,
      limit: filters.limit,
      offset: filters.offset,
      success: true
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid query parameters',
            details: error.issues
          }
        },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    if (!supabase) {
      return NextResponse.json(
        { error: { code: 'CONFIG_ERROR', message: 'Database configuration error' } },
        { status: 500 }
      )
    }
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validationResult = createBookmarkSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: validationResult.error.issues
          }
        },
        { status: 400 }
      )
    }

    // Fetch metadata if title is not provided
    let metadata: { title?: string; description?: string; thumbnail?: string; favicon?: string } = {}
    if (!validationResult.data.title) {
      try {
        const metadataFetcher = await import('@/lib/utils/metadata-fetcher')
        const fetchedMetadata = await metadataFetcher.fetchMetadata(validationResult.data.url)
        metadata = {
          title: fetchedMetadata.title || undefined,
          description: fetchedMetadata.description || undefined,
          thumbnail: fetchedMetadata.thumbnail || undefined,
          favicon: fetchedMetadata.favicon || undefined
        }
      } catch (error) {
        console.warn('Failed to fetch metadata:', error)
      }
    }

    const bookmarkData = {
      ...validationResult.data,
      user_id: user.id,
      title: validationResult.data.title || metadata.title || validationResult.data.url,
      description: validationResult.data.description || metadata.description,
      thumbnail_url: metadata.thumbnail,
      favicon_url: metadata.favicon,
      custom_fields: validationResult.data.custom_fields || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data: bookmark, error } = await supabase
      .from('bookmarks')
      .insert(bookmarkData)
      .select(`
        *,
        collections (
          id,
          name,
          color
        )
      `)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to create bookmark' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookmark, success: true }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}