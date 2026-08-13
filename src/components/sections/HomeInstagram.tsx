import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Camera } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  fetchInstagramMedia,
  type InstagramPost,
} from '@/lib/instagram'

const INSTAGRAM_ENABLED =
  !!process.env.IG_ACCESS_TOKEN &&
  !!process.env.IG_USER_ID &&
  !process.env.DISABLE_INSTAGRAM

interface PlaceholderImage {
  id: number
  src: string
  alt: string
  href: string
}

type PostItem = InstagramPost | PlaceholderImage

/**
 * Instagram gallery for the APTM homepage.
 *
 * Fetches Instagram posts directly on the server using
 * the shared Instagram service.
 *
 * Falls back to local placeholder images if Instagram
 * is not configured or temporarily unavailable.
 */
export async function HomeInstagram() {
  let instagramPosts: InstagramPost[] = []
  let useFallback = false

  try {
    if (INSTAGRAM_ENABLED) {
      instagramPosts = await fetchInstagramMedia()
    }
  } catch (error) {
    console.error('Failed to fetch Instagram data:', error)
  }

  // Use placeholders when Instagram is unavailable
  useFallback = instagramPosts.length === 0

  const placeholderImages: PlaceholderImage[] = Array.from(
    { length: 6 },
    (_, i) => ({
      id: i + 1,
      src: `/ig-${i + 1}.jpg`,
      alt: `Publicação APTM ${i + 1}`,
      href: 'https://instagram.com/apterapiamao',
    })
  )

  const posts: PostItem[] = useFallback
    ? placeholderImages
    : instagramPosts

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Acompanhe a APTM no Instagram
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Descubra os bastidores da associação, eventos, formações e
            novidades da comunidade de Terapia da Mão em Portugal.
          </p>

          {/* Instagram Follow Button */}
          <Link
            href="https://instagram.com/apterapiamao"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-4.849 0-3.204.012-3.584.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618-6.979-6.98-.059-1.28-.073-1.689-.073-4.948 0-3.259.014-3.667.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
              <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />
              <circle cx="18.406" cy="5.594" r="1.44" />
            </svg>

            Seguir no Instagram
          </Link>
        </div>

        {/* Instagram Gallery Grid */}
        <div className="max-w-5xl mx-auto">
          <div
            className={cn(
              'grid gap-4',
              useFallback
                ? 'grid-cols-2 md:grid-cols-3'
                : 'grid-cols-2 md:grid-cols-3'
            )}
          >
            {posts.map((post) => {
              const isRealPost = 'image' in post

              const postImage = isRealPost
                ? post.image
                : post.src

              const postAlt = isRealPost
                ? post.caption
                  ? post.caption.length > 100
                    ? `${post.caption.slice(0, 100)}...`
                    : post.caption
                  : `Instagram post by ${post.username}`
                : post.alt

              const postLink = isRealPost
                ? post.permalink
                : post.href

              return (
                <Link
                  key={post.id}
                  href={postLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square group block overflow-hidden rounded-2xl"
                >
                  <Image
                    src={postImage}
                    alt={postAlt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110 shadow-md hover:shadow-xl"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2" />

                      <p className="text-sm font-medium">
                        {isRealPost
                          ? 'Ver no Instagram'
                          : 'Abrir publicação'}
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
            <span className="font-semibold text-foreground">
              #APTMTerapiaDaMao
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}