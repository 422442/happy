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
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const goToNext = useCallback(() => {
    setSelectedPhoto((prev) => (prev + 1) % photos.length)
  }, [])

  const goToPrev = useCallback(() => {
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
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToPrev()
      else goToNext()
      setIsDragging(false)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const diff = e.touches[0].clientX - startX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToPrev()
      else goToNext()
      setIsDragging(false)
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const getCardDimensions = () => {
    if (windowWidth < 768) {
      return { width: 280, height: 460, translateZ: 500 }
    } else if (windowWidth < 1024) {
      return { width: 350, height: 580, translateZ: 700 }
    } else {
      return { width: 420, height: 680, translateZ: 900 }
    }
  }

  const cardDimensions = getCardDimensions()

  return (
    <>
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        <h3 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">Cherished Moments</h3>
        <p className="text-center text-muted-foreground mb-12 text-lg">A journey through our beautiful memories</p>

        <div className="relative group">
          <div
            className="relative h-[600px] md:h-[750px] lg:h-[850px] cursor-grab active:cursor-grabbing"
            style={{ perspective: "2000px" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative w-full h-full transition-transform duration-700 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${selectedPhoto * -(360 / photos.length)}deg)`,
                }}
              >
                {photos.map((photo, index) => {
                  const angle = (360 / photos.length) * index
                  const isActive = index === selectedPhoto

                  const distance = Math.min(
                    Math.abs(index - selectedPhoto),
                    photos.length - Math.abs(index - selectedPhoto),
                  )
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.3

                  return (
                    <div
                      key={photo.id}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${angle}deg) translateZ(${cardDimensions.translateZ}px)`,
                        opacity,
                      }}
                    >
                      <Card
                        className={`overflow-hidden bg-card border-2 transition-all duration-700 ${
                          isActive ? "border-primary shadow-2xl shadow-primary/50" : "border-primary/20 shadow-xl"
                        }`}
                        style={{
                          width: `${cardDimensions.width}px`,
                          height: `${cardDimensions.height}px`,
                          transform: `rotateY(${-angle}deg)`,
                        }}
                      >
                        <div className="relative w-full h-full bg-background">
                          <div className="absolute inset-0">
                            <Image
                              src={photo.src || "/placeholder.svg"}
                              alt={photo.alt}
                              fill
                              sizes={`${cardDimensions.width}px`}
                              className="object-contain"
                              priority={distance <= 1}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                          {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                              <p className="text-lg md:text-xl font-semibold">{photo.caption}</p>
                              <p className="text-xs md:text-sm text-white/80 mt-1">
                                Photo {index + 1} of {photos.length}
                              </p>
                            </div>
                          )}

                          {!isActive && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedPhoto(index)
                                setIsPlaying(false)
                              }}
                              className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 hover:opacity-100"
                            >
                              <span className="text-white text-sm font-semibold bg-black/50 px-4 py-2 rounded-full">
                                View
                              </span>
                            </button>
                          )}
                        </div>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                goToPrev()
                setIsPlaying(false)
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
                setIsPlaying(false)
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </Button>

            <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPlaying(!isPlaying)
                }}
                className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsFullscreen(true)
                }}
                className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedPhoto(index)
                    setIsPlaying(false)
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    selectedPhoto === index
                      ? "w-8 bg-primary shadow-lg shadow-primary/50"
                      : "w-2 bg-white/30 hover:bg-white/50 backdrop-blur-sm"
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 relative">
            <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setSelectedPhoto(index)
                    setIsPlaying(false)
                  }}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden transition-all duration-300 snap-center ${
                    selectedPhoto === index
                      ? "ring-4 ring-primary scale-110 shadow-xl shadow-primary/50"
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
          Drag to rotate • Arrow keys to navigate • Space to play/pause
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
