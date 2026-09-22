"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface NewsImage {
  id: string
  imageUrl: string
  caption: string | null
  altText: string | null
  sortOrder: number
}

interface NewsGalleryProps {
  images: NewsImage[]
  articleTitle: string
}

export function NewsGallery({
  images,
  articleTitle,
}: NewsGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const visibleImages = images.slice(0, 3)
  const remainingCount = images.length - 3

  const closeGallery = () => {
    setSelectedIndex(null)
  }

  const showPrevious = () => {
    setSelectedIndex((current) => {
      if (current === null) return null

      return current === 0
        ? images.length - 1
        : current - 1
    })
  }

  const showNext = () => {
    setSelectedIndex((current) => {
      if (current === null) return null

      return current === images.length - 1
        ? 0
        : current + 1
    })
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeGallery()
      }

      if (event.key === "ArrowLeft") {
        showPrevious()
      }

      if (event.key === "ArrowRight") {
        showNext()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [selectedIndex])

  if (images.length === 0) {
    return null
  }

  const selectedImage =
    selectedIndex !== null
      ? images[selectedIndex]
      : null

  return (
    <>
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          Galeria
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
              aria-label={`Abrir imagem ${index + 1} de ${images.length}`}
            >
              <figure>
                <img
                  src={image.imageUrl}
                  alt={image.altText || articleTitle}
                  className="w-full aspect-[4/3] object-cover rounded-lg transition-transform duration-200 group-hover:scale-[1.02]"
                />

                {image.caption && (
                  <figcaption className="mt-2 text-sm text-muted-foreground">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            </button>
          ))}

          {remainingCount > 0 && (
            <button
              type="button"
              onClick={() => setSelectedIndex(3)}
              className="relative aspect-[4/3] overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Abrir galeria com mais ${remainingCount} imagens`}
            >
              <img
                src={images[3].imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">
                  + {remainingCount} {remainingCount === 1 ? "imagem" : "imagens"}
                </span>
              </div>
            </button>
          )}
        </div>
      </section>

      {selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeria de imagens: ${articleTitle}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeGallery()
            }
          }}
        >
          <button
            type="button"
            onClick={closeGallery}
            className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Fechar galeria"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-2 sm:left-6 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-2 sm:right-6 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          <div className="max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.altText || articleTitle}
              className="max-h-[75vh] max-w-full object-contain rounded-lg"
            />

            <div className="mt-4 text-center text-white">
              {selectedImage.caption && (
                <p className="text-sm sm:text-base">
                  {selectedImage.caption}
                </p>
              )}

              <p className="mt-2 text-sm text-white/70">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}