import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'
import type { Database } from '@/lib/types/database.types'

const createTagSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').default('#3b82f6')
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

    const { data: tags, error } = await supabase
      .from('tags')
      .select('*')
      .eq('user_id', user.id)
      .order('name', { ascending: true })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch tags' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ tags: tags || [], success: true })
  } catch (error) {
    console.error('Unexpected error:', error)
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
    const validationResult = createTagSchema.safeParse(body)

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

    // Check if tag name already exists for this user
    const { data: existingTag, error: checkError } = await supabase
      .from('tags')
      .select('id')
      .eq('user_id', user.id)
      .eq('name', validationResult.data.name)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Database error:', checkError)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to create tag' } },
        { status: 500 }
      )
    }

    if (existingTag) {
      return NextResponse.json(
        { error: { code: 'CONFLICT', message: 'Tag with this name already exists' } },
        { status: 409 }
      )
    }

    const tagData = {
      ...validationResult.data,
      user_id: user.id,
      created_at: new Date().toISOString()
    }

    // Type assertion for Supabase insert - will be fixed in future version
    const { data: tag, error } = await (supabase as any)
      .from('tags')
      .insert(tagData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to create tag' } },
        { status: 500 }
      )
    }

    return NextResponse.json({ tag, success: true }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    )
  }
}