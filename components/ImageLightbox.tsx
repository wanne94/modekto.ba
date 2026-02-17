'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageLightboxProps {
  images: string[]
  initialIndex: number
  alt: string
  onClose: () => void
}

export function ImageLightbox({ images, initialIndex, alt, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const positionOnDragStart = useRef({ x: 0, y: 0 })

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index)
    resetZoom()
  }, [])

  const prev = useCallback(() => goTo((currentIndex - 1 + images.length) % images.length), [currentIndex, images.length, goTo])
  const next = useCallback(() => goTo((currentIndex + 1) % images.length), [currentIndex, images.length, goTo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    setScale(s => Math.min(4, Math.max(1, s - e.deltaY * 0.001)))
  }

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    positionOnDragStart.current = position
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: positionOnDragStart.current.x + (e.clientX - dragStart.current.x),
      y: positionOnDragStart.current.y + (e.clientY - dragStart.current.y),
    })
  }

  const onMouseUp = () => setIsDragging(false)

  // Pinch-to-zoom
  const lastDist = useRef<number | null>(null)
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (lastDist.current !== null) {
        const delta = dist - lastDist.current
        setScale(s => Math.min(4, Math.max(1, s + delta * 0.01)))
      }
      lastDist.current = dist
    }
  }
  const onTouchEnd = () => { lastDist.current = null }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        onClick={onClose}
        aria-label="Zatvori"
      >
        <X size={24} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm select-none">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={e => { e.stopPropagation(); prev() }}
          aria-label="Prethodna slika"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      {/* Image */}
      <div
        className="flex items-center justify-center w-full h-full"
        onClick={e => e.stopPropagation()}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
      >
        <div className="relative" style={{
          transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s ease',
        }}>
          <img
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            className="max-h-[80vh] max-w-[90vw] object-contain select-none block"
            draggable={false}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-white/25 text-4xl font-bold tracking-widest uppercase select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] -rotate-12">
              MODEKTO.BA
            </span>
          </div>
        </div>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={e => { e.stopPropagation(); next() }}
          aria-label="Sljedeća slika"
        >
          <ChevronRight size={32} />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div
          className="absolute bottom-4 flex gap-2 px-4 overflow-x-auto max-w-full"
          onClick={e => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                i === currentIndex ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
