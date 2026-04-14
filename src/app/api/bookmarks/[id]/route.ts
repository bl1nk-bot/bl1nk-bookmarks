import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const updateBookmarkSchema = z.object({
  url: z.string().url('Invalid URL format').optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  collection_id: z.string().uuid().nullable().optional(),
  custom_fields: z.record(z.any()).optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const bookmarkId = params.id

    const { data: bookmark, error } = await supabase
      .from('bookmarks')
      .select(`
        *,
        collections (
          id,
          name,
          color
        )
      `)
      .eq('id', bookmarkId)
      .eq('user_id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Bookmark not found' } },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch bookmark' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookmark, success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const bookmarkId = params.id
    const body = await request.json()
    const validationResult = updateBookmarkSchema.safeParse(body)

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

    const updateData = {
      ...validationResult.data,
      updated_at: new Date().toISOString()
    }

    const { data: bookmark, error } = await supabase
      .from('bookmarks')
      .update(updateData)
      .eq('id', bookmarkId)
      .eq('user_id', user.id)
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
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Bookmark not found' } },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to update bookmark' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookmark, success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const bookmarkId = params.id

    // Check if bookmark exists and belongs to user
    const { data: existingBookmark, error: fetchError } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('id', bookmarkId)
      .eq('user_id', user.id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Bookmark not found' } },
          { status: 404 }
        )
      }
      console.error('Database error:', fetchError)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to delete bookmark' } },
        { status: 500 }
      )
    }

    // Delete the bookmark
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', bookmarkId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to delete bookmark' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 204 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}