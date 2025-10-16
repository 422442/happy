"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

export default function SurpriseButton() {
  const [clicked, setClicked] = useState(false)

  const handleSurprise = () => {
    setClicked(true)

    // Confetti burst
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#D4AF37", "#E8B4BC", "#1E3A8A", "#F5F5DC"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#D4AF37", "#E8B4BC", "#1E3A8A", "#F5F5DC"],
      })
    }, 250)

    // Reset after animation
    setTimeout(() => setClicked(false), duration)
  }

  return (
    <section className="py-20 px-4 text-center">
      <Button
        onClick={handleSurprise}
        disabled={clicked}
        size="lg"
        className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50"
      >
        {clicked ? "🎉 Surprise! 🎉" : "✨ Click for a Birthday Surprise! ✨"}
      </Button>
      {clicked && (
        <p className="mt-6 text-2xl font-bold text-secondary animate-fade-in-up">
          Wishing you a day as wonderful as you are! 💖
        </p>
      )}
    </section>
  )
}
