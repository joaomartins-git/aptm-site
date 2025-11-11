'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getNews } from '@/lib/content'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { NewsItem } from '@/types/index'

export function HomeNewsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const news = getNews()
  const carouselNews = news.slice(0, 5) // First 5 items for carousel
  const headlinesNews = news.slice(0, 6) // First 6 items for headlines list

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselNews.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselNews.length) % carouselNews.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-advance functionality (5 seconds)
  useEffect(() => {
    if (isAutoPlaying && carouselNews.length > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, carouselNews.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide()
      } else if (event.key === 'ArrowRight') {
        nextSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Pause on hover/focus
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)
  const handleFocus = () => setIsAutoPlaying(false)
  const handleBlur = () => setIsAutoPlaying(true)

  const currentSlideData = carouselNews[currentSlide]

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (news.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Notícias e Destaques
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mantenha-se atualizado com as últimas notícias e eventos da APTM
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: News Carousel */}
          <div className="order-2 lg:order-1">
            <div
              className="relative rounded-lg overflow-hidden bg-muted/30"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {/* Carousel Slides */}
              <div className="relative aspect-[16/9]">
                {carouselNews.map((newsItem, index) => (
                  <div
                    key={newsItem.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700 ease-in-out",
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    )}
                  >
                    {/* Background Image */}
                    {newsItem.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={newsItem.image}
                          alt={newsItem.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="text-center p-8">
                          <h3 className="text-2xl font-bold text-foreground mb-4">
                            {newsItem.title}
                          </h3>
                        </div>
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <div className="transition-all duration-700 ease-in-out">
                        <div className="text-sm mb-2 opacity-90">
                          {formatDate(newsItem.date)}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">
                          {newsItem.title}
                        </h3>
                        {newsItem.excerpt && (
                          <p className="text-sm sm:text-base mb-4 opacity-90 line-clamp-3">
                            {newsItem.excerpt}
                          </p>
                        )}
                        <Link href={newsItem.href}>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                          >
                            Ler mais
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              {carouselNews.length > 1 && (
                <>
                  {/* Previous Button */}
                  <button
                    onClick={prevSlide}
                    aria-label="Anterior"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    aria-label="Próximo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2" role="tablist">
                    {carouselNews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir para notícia ${index + 1}`}
                        aria-current={currentSlide === index ? "true" : "false"}
                        role="tab"
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent",
                          currentSlide === index
                            ? "bg-white w-6"
                            : "bg-white/50 hover:bg-white/75"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Screen reader announcements */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                Notícia {currentSlide + 1} de {carouselNews.length}: {currentSlideData?.title}
              </div>
            </div>
          </div>

          {/* Right Column: Headlines List */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Últimas Notícias
              </h3>

              <div className="space-y-4 mb-8">
                {headlinesNews.map((newsItem, index) => (
                  <Card
                    key={newsItem.id}
                    className="hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <CardContent className="p-4">
                      <Link href={newsItem.href} className="block">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-sm text-primary mb-2 font-medium">
                              {formatDate(newsItem.date)}
                            </div>
                            <h4 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                              {newsItem.title}
                            </h4>
                            {newsItem.excerpt && (
                              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                {newsItem.excerpt}
                              </p>
                            )}
                          </div>
                          {index === 0 && (
                            <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full flex-shrink-0">
                              Nova
                            </div>
                          )}
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* More News Link */}
              <div className="text-center">
                <Link href="/about">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Ver mais notícias
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}