import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const updateTagSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long').optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').optional()
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

    const tagId = params.id

    const { data: tag, error } = await supabase
      .from('tags')
      .select('*')
      .eq('id', tagId)
      .eq('user_id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Tag not found' } },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch tag' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ tag, success: true })
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

    const tagId = params.id
    const body = await request.json()
    const validationResult = updateTagSchema.safeParse(body)

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

    // Check if updating name and if it conflicts with existing tag
    if (validationResult.data.name) {
      const { data: existingTag, error: checkError } = await supabase
        .from('tags')
        .select('id')
        .eq('user_id', user.id)
        .eq('name', validationResult.data.name)
        .neq('id', tagId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Database error:', checkError)
        return NextResponse.json(
          { error: { code: 'DATABASE_ERROR', message: 'Failed to update tag' } },
          { status: 500 }
        )
      }

      if (existingTag) {
        return NextResponse.json(
          { error: { code: 'CONFLICT', message: 'Tag with this name already exists' } },
          { status: 409 }
        )
      }
    }

    const { data: tag, error } = await supabase
      .from('tags')
      .update(validationResult.data)
      .eq('id', tagId)
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Tag not found' } },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to update tag' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ tag, success: true })
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

    const tagId = params.id

    // Check if tag exists and belongs to user
    const { data: existingTag, error: fetchError } = await supabase
      .from('tags')
      .select('id')
      .eq('id', tagId)
      .eq('user_id', user.id)
      .single()

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return NextResponse.json(
          { error: { code: 'NOT_FOUND', message: 'Tag not found' } },
          { status: 404 }
        )
      }
      console.error('Database error:', fetchError)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to delete tag' } },
        { status: 500 }
      )
    }

    // Delete the tag
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', tagId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to delete tag' } },
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