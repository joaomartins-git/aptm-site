import { NextRequest, NextResponse } from 'next/server'

// Instagram API response caching for 15 minutes
export const revalidate = 900

// Instagram post interface matching the component requirements
interface InstagramPost {
  id: string
  image: string          // media_url for images, thumbnail_url for videos
  caption: string        // Instagram caption text
  date: string          // ISO date string from timestamp
  permalink: string     // Instagram post URL
  type: 'image' | 'video' // media_type from API
  username: string       // username from API
}

// Instagram API response interface
interface InstagramMediaResponse {
  id: string
  caption?: string
  media_url: string
  thumbnail_url?: string
  permalink: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  timestamp: string
  username: string
}

interface InstagramApiResponse {
  data: InstagramMediaResponse[]
  paging?: {
    cursors?: {
      before?: string
      after?: string
    }
    next?: string
  }
}

// Function to fetch Instagram media
async function fetchInstagramMedia(): Promise<InstagramPost[]> {
  const accessToken = process.env.IG_ACCESS_TOKEN
  const userId = process.env.IG_USER_ID

  // Validate environment variables
  if (!accessToken || !userId) {
    //throw new Error('Missing environment variables: IG_ACCESS_TOKEN and IG_USER_ID are required')
    return [];
  }

  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,thumbnail_url,permalink,media_type,timestamp,username&limit=8&access_token=${accessToken}`

  const response = await fetch(url)

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Invalid access token or user ID')
    } else if (response.status === 401) {
      throw new Error('Access token expired')
    } else if (response.status === 403) {
      throw new Error('Access forbidden')
    } else if (response.status >= 500) {
      throw new Error('Instagram API temporarily unavailable')
    } else {
      throw new Error(`Instagram API error: ${response.status}`)
    }
  }

  const data: InstagramApiResponse = await response.json()

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Invalid response format from Instagram API')
  }

  // Normalize Instagram API response to component format
  const posts: InstagramPost[] = data.data
    .filter((item): item is InstagramMediaResponse => {
      // Only include valid items with required fields
      return !!(
        item.id &&
        item.media_url &&
        item.permalink &&
        item.timestamp &&
        item.username
      )
    })
    .map((item): InstagramPost => ({
      id: item.id,
      // Use thumbnail_url for videos, media_url for images
      image: item.media_type === 'VIDEO' && item.thumbnail_url
        ? item.thumbnail_url
        : item.media_url,
      caption: item.caption || '',
      date: item.timestamp,
      permalink: item.permalink,
      // Normalize CAROUSEL_ALBUM to 'image' since we're using the cover image
      type: item.media_type === 'VIDEO' ? 'video' : 'image',
      username: item.username
    }))
    .slice(0, 4) // Only return first 4 posts for the 2x2 grid

  return posts
}

export async function GET() {
  try {
    const posts = await fetchInstagramMedia()

    return NextResponse.json({
      ok: true,
      posts
    })

  } catch (error) {
    console.error('Instagram API error:', error)

    // Return appropriate error response
    let errorMessage = 'Failed to fetch Instagram posts'

    if (error instanceof Error) {
      if (error.message.includes('Missing environment variables')) {
        errorMessage = 'Instagram integration not configured'
      } else if (error.message.includes('Access token expired')) {
        errorMessage = 'Instagram access token expired'
      } else if (error.message.includes('temporarily unavailable')) {
        errorMessage = 'Instagram service temporarily unavailable'
      } else if (error.message.includes('Invalid response format')) {
        errorMessage = 'Invalid Instagram API response'
      }
    }

    return NextResponse.json({
      ok: false,
      error: errorMessage
    }, {
      status: 200 // Always return 200 to avoid client-side errors
    })
  }
}