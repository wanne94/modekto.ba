'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ImageLightbox } from '@/components/ImageLightbox'

interface ProjectImageGalleryProps {
  images: string[]
  title: string
  featured?: boolean
}

export function ProjectImageGallery({ images, title, featured }: ProjectImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted group cursor-zoom-in"
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {featured && (
            <Badge className="absolute top-3 right-3 bg-yellow-500 text-white border-none">
              Izdvojeno
            </Badge>
          )}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-white/30 text-3xl font-bold tracking-widest uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] -rotate-12">
              MODEKTO.BA
            </span>
          </div>
          {/* Zoom hint */}
          <div className="absolute bottom-3 right-3 bg-black/40 text-white/80 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            🔍 Klikni za zoom
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3">
            {images.slice(1).map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] w-1/3 overflow-hidden rounded-lg bg-muted group cursor-zoom-in"
                onClick={() => openLightbox(i + 1)}
              >
                <img
                  src={img}
                  alt={`${title} ${i + 2}`}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <span className="text-white/30 text-sm font-bold tracking-widest uppercase select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                    MODEKTO.BA
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          alt={title}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
