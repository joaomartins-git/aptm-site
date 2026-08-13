import { NextResponse } from 'next/server'
import { fetchInstagramMedia } from '@/lib/instagram'

export const revalidate = 900

export async function GET() {
  try {
    const posts = await fetchInstagramMedia()

    return NextResponse.json({
      ok: true,
      posts,
    })
  } catch (error) {
    console.error('Instagram API error:', error)

    let errorMessage = 'Failed to fetch Instagram posts'

    if (error instanceof Error) {
      if (error.message.includes('access token expired')) {
        errorMessage = 'Instagram access token expired'
      } else if (error.message.includes('temporarily unavailable')) {
        errorMessage = 'Instagram service temporarily unavailable'
      } else if (error.message.includes('Invalid response format')) {
        errorMessage = 'Invalid Instagram API response'
      } else if (
        error.message.includes('Invalid Instagram access token')
      ) {
        errorMessage = 'Invalid Instagram access token or user ID'
      } else if (error.message.includes('forbidden')) {
        errorMessage = 'Instagram access forbidden'
      }
    }

    return NextResponse.json(
      {
        ok: false,
        error: errorMessage,
      },
      {
        status: 200,
      }
    )
  }
}