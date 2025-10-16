"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play, Maximize2, X } from "lucide-react"

const photos = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/img/r${i + 1}.jpg`,
  alt: `Memory ${i + 1}`,
  caption: `Beautiful moment ${i + 1}`,
}))

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const goToNext = useCallback(() => {
    setDirection(1)
    setSelectedPhoto((prev) => (prev + 1) % photos.length)
  }, [])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setSelectedPhoto((prev) => (prev - 1 + photos.length) % photos.length)
  }, [])

  useEffect(() => {
    if (!isPlaying || isFullscreen) return

    const interval = setInterval(goToNext, 4000)
    return () => clearInterval(interval)
  }, [isPlaying, isFullscreen, goToNext])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") setIsFullscreen(false)
      if (e.key === " ") {
        e.preventDefault()
        setIsPlaying((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setIsPlaying(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setIsPlaying(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - startX
    setDragOffset(diff)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startX
    setDragOffset(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    
    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        goToPrev()
      } else {
        goToNext()
      }
    }
    
    setIsDragging(false)
    setDragOffset(0)
    setStartX(0)
  }

  return (
    <>
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">Cherished Moments</h3>
        <p className="text-center text-muted-foreground mb-12 text-lg">A journey through our beautiful memories</p>

        <div className="relative group">
          {/* Main Slideshow */}
          <div
            className="relative h-[600px] md:h-[700px] lg:h-[750px] overflow-hidden rounded-2xl bg-muted/30"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {photos.map((photo, index) => {
                const offset = index - selectedPhoto
                const isActive = index === selectedPhoto
                const isPrev = index === (selectedPhoto - 1 + photos.length) % photos.length
                const isNext = index === (selectedPhoto + 1) % photos.length
                
                let translateX = offset * 100
                let scale = 0.8
                let opacity = 0
                let zIndex = 0

                if (isActive) {
                  translateX = 0
                  scale = 1
                  opacity = 1
                  zIndex = 30
                } else if (isPrev) {
                  translateX = -100
                  scale = 0.85
                  opacity = 0.4
                  zIndex = 20
                } else if (isNext) {
                  translateX = 100
                  scale = 0.85
                  opacity = 0.4
                  zIndex = 20
                } else if (offset < 0) {
                  translateX = -120
                  scale = 0.7
                  opacity = 0
                  zIndex = 10
                } else {
                  translateX = 120
                  scale = 0.7
                  opacity = 0
                  zIndex = 10
                }

                if (isDragging && isActive) {
                  translateX = (dragOffset / window.innerWidth) * 100
                }

                return (
                  <div
                    key={photo.id}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(${translateX}%) scale(${scale})`,
                      opacity,
                      zIndex,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <Card className="relative w-full max-w-md h-[90%] overflow-hidden border-2 border-primary/20 shadow-2xl">
                      <div className="relative w-full h-full bg-background">
                        <Image
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-contain"
                          priority={Math.abs(offset) <= 1}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <p className="text-xl md:text-2xl font-semibold">{photo.caption}</p>
                            <p className="text-sm text-white/80 mt-2">
                              Photo {index + 1} of {photos.length}
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>
                )
              })}

            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                goToPrev()
                setIsPlaying(false)
              }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm z-40 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                goToNext()
                setIsPlaying(false)
              }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm z-40 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </Button>

            {/* Control Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-40">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(true)}
                className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm"
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > selectedPhoto ? 1 : -1)
                    setSelectedPhoto(index)
                    setIsPlaying(false)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedPhoto === index
                      ? "w-8 bg-primary shadow-lg shadow-primary/50"
                      : "w-2 bg-white/40 hover:bg-white/60 backdrop-blur-sm"
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-8">
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setDirection(index > selectedPhoto ? 1 : -1)
                    setSelectedPhoto(index)
                    setIsPlaying(false)
                  }}
                  className={`relative flex-shrink-0 w-20 h-32 md:w-24 md:h-36 rounded-xl overflow-hidden transition-all duration-300 snap-center ${
                    selectedPhoto === index
                      ? "ring-4 ring-primary scale-105 shadow-xl shadow-primary/50"
                      : "ring-2 ring-border/50 hover:ring-primary/50 hover:scale-105 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="object-cover" />
                  {selectedPhoto === index && <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px]" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          Drag to slide • Arrow keys to navigate • Space to play/pause
        </p>
      </section>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
              <Image
                src={photos[selectedPhoto].src || "/placeholder.svg"}
                alt={photos[selectedPhoto].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center">
            <p className="text-xl font-semibold mb-2">{photos[selectedPhoto].caption}</p>
            <p className="text-sm text-white/70">
              {selectedPhoto + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
