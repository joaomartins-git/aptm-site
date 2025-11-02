'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
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
  const router = useRouter()
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary",
        className
      )}
    >
      {/* Background Image Overlay */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        />
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-24 lg:py-32">
          {/* Subtitle */}
          {subtitle && (
            <p className="text-primary-foreground/90 text-sm sm:text-base font-medium mb-4 tracking-wide uppercase">
              {subtitle}
            </p>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {primaryAction && (
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-background text-foreground hover:bg-background/90"
                  onClick={() => router.push(primaryAction.href)}
                >
                  {primaryAction.label}
                </Button>
              )}

              {secondaryAction && (
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => router.push(secondaryAction.href)}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}