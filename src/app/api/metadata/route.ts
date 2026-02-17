import { NextResponse } from 'next/server'
import type { UrlMetadata } from '@/lib/types'

const USER_AGENT =
  'Mozilla/5.0 (compatible; bl1nk-bookmarks/1.0; +https://example.com/bot)'

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

// Restrict which hosts/ports can be requested to mitigate SSRF.
// Adjust ALLOWED_HOSTNAMES / ALLOWED_HOST_SUFFIXES as appropriate for your app.
const ALLOWED_HOSTNAMES = new Set<string>()
const ALLOWED_HOST_SUFFIXES = ['example.com']
const ALLOWED_PORTS = new Set<number | undefined>([80, 443, undefined])

function isAllowedTargetUrl(value: string): boolean {
  try {
    const parsed = new URL(value)

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return false
    }

    const hostname = parsed.hostname.toLowerCase()
    const port = parsed.port ? Number(parsed.port) : undefined

    if (!ALLOWED_PORTS.has(port)) {
      return false
    }

    if (ALLOWED_HOSTNAMES.has(hostname)) {
      return true
    }

    return ALLOWED_HOST_SUFFIXES.some((suffix) =>
      hostname === suffix || hostname.endsWith('.' + suffix)
    )
  } catch {
    return false
  }
}

function resolveUrl(baseUrl: string, maybeRelative: string | null): string | null {
  if (!maybeRelative) return null
  try {
    return new URL(maybeRelative, baseUrl).toString()
  } catch {
    return null
  }
}

function decodeHtml(value: string | null): string | null {
  if (!value) return null
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function extractMetaContent(html: string, keys: string[]): string | null {
  for (const key of keys) {
    const propertyRegex = new RegExp(
      `<meta[^>]+(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>`,
      'i'
    )
    const contentFirstRegex = new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]*(?:property|name)=["']${key}["'][^>]*>`,
      'i'
    )

    const propertyMatch = html.match(propertyRegex)
    const contentFirstMatch = html.match(contentFirstRegex)
    const raw = propertyMatch?.[1] || contentFirstMatch?.[1]

    if (raw) {
      return decodeHtml(raw)
    }
  }

  return null
}

function extractTitle(html: string): string | null {
  const ogTitle = extractMetaContent(html, ['og:title', 'twitter:title'])
  if (ogTitle) return ogTitle

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return decodeHtml(titleMatch?.[1] ?? null)
}

function extractFavicon(html: string, baseUrl: string): string | null {
  const iconMatch = html.match(
    /<link[^>]+rel=["'][^"']*(?:icon|shortcut icon|apple-touch-icon)[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>/i
  )
  if (iconMatch?.[1]) {
    return resolveUrl(baseUrl, iconMatch[1])
  }

  return resolveUrl(baseUrl, '/favicon.ico')
}

function parseMetadata(html: string, sourceUrl: string): UrlMetadata {
  const title = extractTitle(html)
  const description = extractMetaContent(html, ['og:description', 'twitter:description', 'description'])
  const thumbnail = resolveUrl(
    sourceUrl,
    extractMetaContent(html, ['og:image', 'twitter:image', 'twitter:image:src'])
  )
  const favicon = extractFavicon(html, sourceUrl)

  return {
    url: sourceUrl,
    title,
    description,
    thumbnail,
    favicon,
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url || !isValidHttpUrl(url) || !isAllowedTargetUrl(url)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
      },
      redirect: 'follow',
      signal: controller.signal,
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch URL (${response.status})` }, { status: 400 })
    }

    const html = await response.text()
    const metadata = parseMetadata(html, response.url || url)

    return NextResponse.json(metadata)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch metadata'
    return NextResponse.json({ error: message }, { status: 500 })
  } finally {
    clearTimeout(timeout)
  }
}
