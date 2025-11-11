import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Instagram post interface
interface InstagramPost {
  id: string
  image: string
  caption: string
  date: string
  permalink: string
  type: 'image' | 'video'
  username: string
}

// API response interface
interface InstagramApiResponse {
  ok: boolean
  posts?: InstagramPost[]
  error?: string
}

/**
 * HomeInstagram Component
 *
 * Instagram gallery with real posts from Instagram Basic Display API.
 * Falls back to placeholder images when API is not available.
 *
 * Fetches 4 Instagram posts and displays them in a 2x2 grid.
 * Each post links to its Instagram permalink in a new tab.
 */
export async function HomeInstagram() {
  // Fetch Instagram data from our API route
  let instagramResponse: InstagramApiResponse | null = null
  let useFallback = false

  try {
    const response = await fetch('/api/instagram', {
      // Use no-store to always get fresh data when not cached
      cache: 'no-store'
    })

    if (response.ok) {
      instagramResponse = await response.json()
    }
  } catch (error) {
    console.error('Failed to fetch Instagram data:', error)
  }

  // Determine if we should use fallback (placeholder) behavior
  useFallback = !instagramResponse?.ok || !instagramResponse?.posts || instagramResponse.posts.length === 0

  // Fallback placeholder images when API fails or not configured
  const placeholderImages = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `/ig-${i + 1}.jpg`,
    alt: `Publicação APTM ${i + 1}`,
    href: 'https://instagram.com/aptm'
  }))

  // Real Instagram posts or fallback - use proper typing
  const instagramPosts = !useFallback ? instagramResponse!.posts! : placeholderImages as any

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Siga-nos no Instagram
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Acompanhe as nossas atividades, eventos e a comunidade de terapia da mão em Portugal.
          </p>

          {/* Instagram Follow Button */}
          <Link
            href="https://instagram.com/aptm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
              <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z"/>
              <circle cx="18.406" cy="5.594" r="1.44"/>
            </svg>
            Seguir no Instagram
          </Link>
        </div>

        {/* Instagram Gallery Grid */}
        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "grid gap-1",
            // Use 2-column grid for real Instagram posts, 2-3 columns for placeholders
            useFallback
              ? "grid-cols-2 md:grid-cols-3"
              : "grid-cols-2"
          )}>
            {instagramPosts.map((post) => {
              // Handle different post types (real Instagram vs placeholders)
              const isRealPost = !useFallback && 'image' in post
              const postImage = isRealPost ? post.image : post.src
              const postAlt = isRealPost
                ? (post.caption
                    ? (post.caption.length > 100
                        ? `${post.caption.slice(0, 100)}...`
                        : post.caption)
                    : `Instagram post by ${post.username}`)
                : post.alt
              const postLink = isRealPost ? post.permalink : post.href

              return (
                <Link
                  key={post.id}
                  href={postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square group block overflow-hidden"
                >
                  <Image
                    src={postImage}
                    alt={postAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    // Use appropriate sizes based on grid layout
                    sizes={useFallback
                      ? "(max-width: 768px) 50vw, 33vw"
                      : "(max-width: 768px) 50vw, 50vw"
                    }
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        {isRealPost ? 'Ver no Instagram' : 'Ver no Instagram'}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Partilhe a sua jornada com a hashtag{' '}
            <span className="font-semibold text-foreground">#APTMTerapiaDaMao</span>
          </p>
        </div>
      </div>
    </section>
  )
}