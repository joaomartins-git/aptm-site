'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle?: string
  description: string
  backgroundImage?: string
  primaryAction?: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
  className?: string
}

export function Hero({
  title,
  subtitle,
  description,
  backgroundImage,
  primaryAction,
  secondaryAction,
  className
}: HeroProps) {
  return (
    <section
      className={cn(
        'relative min-h-[560px] lg:min-h-[620px] overflow-hidden',
        className
      )}
    >
      {/* Background image */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 min-h-[560px] lg:min-h-[620px] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">

            {/* Subtitle */}
            {subtitle && (
              <p className="text-sm sm:text-base font-semibold mb-4 tracking-wide uppercase text-white/90">
                {subtitle}
              </p>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white/90">
              {description}
            </p>

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                {primaryAction && (
                  <Link href={primaryAction.href}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                    >
                      {primaryAction.label}
                    </Button>
                  </Link>
                )}

                {secondaryAction && (
                  <Link href={secondaryAction.href}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-white bg-white/10 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                    >
                      {secondaryAction.label}
                    </Button>
                  </Link>
                )}

              </div>
            )}

          </div>
        </div>
      </div>

      {/* Transition into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
    </section>
  )
}