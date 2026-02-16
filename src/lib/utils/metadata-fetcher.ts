import type { UrlMetadata } from '@/lib/types'

export async function fetchMetadata(url: string): Promise<UrlMetadata> {
  const response = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`)

  if (!response.ok) {
    let errorMessage = 'Failed to fetch metadata'
    try {
      const data = (await response.json()) as { error?: string }
      if (data.error) errorMessage = data.error
    } catch {
      // Ignore JSON parse errors and keep default message
    }
    throw new Error(errorMessage)
  }

  return (await response.json()) as UrlMetadata
}
