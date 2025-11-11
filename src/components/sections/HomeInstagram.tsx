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
 * Static placeholder Instagram gallery with future integration notes.
 *
 * Future Instagram Basic Display API Integration:
 *
 * Required environment variables:
 * - IG_APP_ID: Instagram app ID
 * - IG_APP_SECRET: Instagram app secret
 * - IG_REDIRECT_URI: OAuth redirect URL
 * - IG_ACCESS_TOKEN: Long-lived access token
 *
 * Integration approach:
 * 1. Implement OAuth2 flow for user authentication
 * 2. Use Instagram Basic Display API to fetch media
 * 3. Cache media data to avoid rate limits
 * 4. Display actual Instagram posts with captions
 * 5. Link posts to Instagram for engagement
 */
export function HomeInstagram() {
  // Placeholder images - in production these would be fetched from Instagram API
  const instagramImages = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    src: `/ig-${i + 1}.jpg`,
    alt: `Publicação APTM ${i + 1}`,
    href: 'https://instagram.com/aptm' // Placeholder Instagram profile URL
  }))

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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {instagramImages.map((image) => (
              <Link
                key={image.id}
                href={image.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square group block overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Ver no Instagram</p>
                  </div>
                </div>
              </Link>
            ))}
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