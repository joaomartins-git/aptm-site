'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Container from '@/components/ui/Container'

interface Slide {
  id: number
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  image: string
  imageAlt: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Excelência em Terapia da Mão",
    description: "Liderando o desenvolvimento profissional e a excelência no tratamento de condições da mão e membro superior em Portugal.",
    ctaLabel: "Contactar",
    ctaHref: "/contact",
    image: "/hero-1.jpg",
    imageAlt: "Terapia da mão especializada"
  },
  {
    id: 2,
    title: "Eventos e Formação",
    description: "Participe nos nossos eventos especializados, workshops e cursos de formação contínua para profissionais de saúde.",
    ctaLabel: "Ver Eventos",
    ctaHref: "/events",
    image: "/hero-2.jpg",
    imageAlt: "Eventos de formação em terapia"
  },
  {
    id: 3,
    title: "Serviços Especializados",
    description: "Descubra os nossos serviços especializados em reabilitação da mão e membro superior com uma equipa de especialistas.",
    ctaLabel: "Conhecer Serviços",
    ctaHref: "/services",
    image: "/hero-3.jpg",
    imageAlt: "Serviços de reabilitação"
  }
]

export function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-advance functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 6000) // 6 seconds
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
  }, [isAutoPlaying])

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

  const currentSlideData = slides[currentSlide]

  return (
    <section
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {/* Slide Images */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              className={cn(
                "object-cover",
                index === 0 ? "priority" : ""
              )}
              sizes="100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <Container>
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Slide content with transitions */}
            <div className="transition-all duration-700 ease-in-out">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {currentSlideData.title}
              </h1>
              <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white/90">
                {currentSlideData.description}
              </p>
              <Link href={currentSlideData.ctaHref}>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-semibold"
                >
                  {currentSlideData.ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <Container>
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              aria-label="Slide anterior"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <svg
                className="w-6 h-6"
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

            {/* Slide Indicators */}
            <div className="flex space-x-2" role="tablist">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir para slide ${index + 1}`}
                  aria-current={currentSlide === index ? "true" : "false"}
                  role="tab"
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent",
                    currentSlide === index
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              aria-label="Próximo slide"
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <svg
                className="w-6 h-6"
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
          </div>
        </div>
      </div>

      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Slide {currentSlide + 1} de {slides.length}: {currentSlideData.title}
      </div>

      {/* Gradient overlay at bottom for better transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}