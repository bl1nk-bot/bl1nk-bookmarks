import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  collection_id: z.string().uuid().optional(),
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
    const searchParamsValidation = searchSchema.safeParse({
      query: searchParams.get('query'),
      collection_id: searchParams.get('collection_id'),
      limit: parseInt(searchParams.get('limit') || '50'),
      offset: parseInt(searchParams.get('offset') || '0')
    })

    if (!searchParamsValidation.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid search parameters',
            details: searchParamsValidation.error.issues
          }
        },
        { status: 400 }
      )
    }

    const { query, collection_id, limit, offset } = searchParamsValidation.data

    let searchQuery = supabase
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

    // Apply collection filter if provided
    if (collection_id) {
      searchQuery = searchQuery.eq('collection_id', collection_id)
    }

    // Perform full-text search on title, description, and URL
    const searchTerm = query.toLowerCase()
    searchQuery = searchQuery.or(
      `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,url.ilike.%${searchTerm}%`
    )

    // Apply ordering and pagination
    searchQuery = searchQuery
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: bookmarks, error, count } = await searchQuery

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to search bookmarks' } },
        { status: 500 }
      )
    }

    return NextResponse.json({
      bookmarks: bookmarks || [],
      total: count || 0,
      query,
      limit,
      offset,
      success: true
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}