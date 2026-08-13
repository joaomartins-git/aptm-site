export interface InstagramPost {
  id: string
  image: string
  caption: string
  date: string
  permalink: string
  type: 'image' | 'video'
  username: string
}

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

/**
 * Fetch the latest Instagram posts for APTM.
 *
 * This function runs on the server and uses the Instagram
 * access token stored in environment variables.
 */
export async function fetchInstagramMedia(): Promise<InstagramPost[]> {
  const accessToken = process.env.IG_ACCESS_TOKEN
  const userId = process.env.IG_USER_ID

  if (!accessToken || !userId) {
    console.warn(
      'Instagram integration not configured: IG_ACCESS_TOKEN or IG_USER_ID is missing.'
    )
    return []
  }

  const url =
    `https://graph.instagram.com/${userId}/media` +
    `?fields=id,caption,media_url,thumbnail_url,permalink,media_type,timestamp,username` +
    `&limit=8` +
    `&access_token=${encodeURIComponent(accessToken)}`

  const response = await fetch(url, {
    next: {
      revalidate: 900,
    },
  })

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error('Invalid Instagram access token or user ID')
    }

    if (response.status === 401) {
      throw new Error('Instagram access token expired')
    }

    if (response.status === 403) {
      throw new Error('Instagram access forbidden')
    }

    if (response.status >= 500) {
      throw new Error('Instagram API temporarily unavailable')
    }

    throw new Error(`Instagram API error: ${response.status}`)
  }

  const data: InstagramApiResponse = await response.json()

  if (!data.data || !Array.isArray(data.data)) {
    throw new Error('Invalid response format from Instagram API')
  }

  return data.data
    .filter((item) => {
      return Boolean(
        item.id &&
          item.media_url &&
          item.permalink &&
          item.timestamp &&
          item.username
      )
    })
    .map((item): InstagramPost => ({
      id: item.id,

      image:
        item.media_type === 'VIDEO' && item.thumbnail_url
          ? item.thumbnail_url
          : item.media_url,

      caption: item.caption || '',
      date: item.timestamp,
      permalink: item.permalink,

      type: item.media_type === 'VIDEO' ? 'video' : 'image',

      username: item.username,
    }))
    .slice(0, 6)
}