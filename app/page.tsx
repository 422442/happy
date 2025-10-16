"use client"

import HeroSection from "@/components/hero-section"
import IntroSection from "@/components/intro-section"
import PhotoGallery from "@/components/photo-gallery"
import MessageSection from "@/components/message-section"
import SurpriseButton from "@/components/surprise-button"
import MemoryTimeline from "@/components/memory-timeline"
import Footer from "@/components/footer"
import BirthYearGate from "@/components/birth-year-gate"

export default function BirthdayPage() {
  return (
    <BirthYearGate>
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-purple-50 to-amber-50">
        {/* Animated Background Effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Large animated gradient orb - top left (Golden) */}
          <div 
            className="absolute -top-1/3 -left-1/4 w-[700px] h-[700px] rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, rgba(251, 191, 36, 0.1) 50%, transparent 70%)',
              animationDuration: '8s',
            }}
          />
          
          {/* Medium gradient orb - top right (Pink/Rose) */}
          <div 
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(244, 114, 182, 0.35) 0%, rgba(244, 114, 182, 0.1) 50%, transparent 70%)',
              animationDuration: '10s',
              animationDelay: '2s',
            }}
          />
          
          {/* Large floating gradient orb - center (Purple) */}
          <div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, rgba(192, 132, 252, 0.08) 50%, transparent 70%)',
              animation: 'float 20s ease-in-out infinite',
            }}
          />
          
          {/* Medium gradient orb - middle left (Blue/Purple) */}
          <div 
            className="absolute top-1/2 -left-1/4 w-[650px] h-[650px] rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(147, 197, 253, 0.35) 0%, rgba(147, 197, 253, 0.1) 50%, transparent 70%)',
              animationDuration: '12s',
              animationDelay: '4s',
            }}
          />
          
          {/* Medium gradient orb - bottom right (Amber/Yellow) */}
          <div 
            className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(252, 211, 77, 0.4) 0%, rgba(252, 211, 77, 0.12) 50%, transparent 70%)',
              animationDuration: '9s',
              animationDelay: '1s',
            }}
          />
          
          {/* Additional accent orb - bottom left (Rose) */}
          <div 
            className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(251, 113, 133, 0.3) 0%, rgba(251, 113, 133, 0.08) 50%, transparent 70%)',
              animation: 'float 18s ease-in-out infinite reverse',
            }}
          />
          
          {/* Floating particles/sparkles */}
          <div className="absolute inset-0">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-amber-300/20 to-pink-300/20 animate-float"
                style={{
                  width: `${10 + Math.random() * 20}px`,
                  height: `${10 + Math.random() * 20}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${5 + Math.random() * 10}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>
          
          {/* Subtle animated gradient mesh overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `
                radial-gradient(at 20% 30%, rgba(251, 191, 36, 0.15) 0px, transparent 50%),
                radial-gradient(at 80% 20%, rgba(244, 114, 182, 0.15) 0px, transparent 50%),
                radial-gradient(at 40% 70%, rgba(192, 132, 252, 0.15) 0px, transparent 50%),
                radial-gradient(at 90% 80%, rgba(252, 211, 77, 0.15) 0px, transparent 50%)
              `,
              animation: 'gradientShift 15s ease infinite',
              backgroundSize: '200% 200%',
            }}
          />
          
          {/* Elegant grid overlay with golden accents */}
          <div 
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 191, 36, 0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 191, 36, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Content */}
        <HeroSection />
        <IntroSection />
        <PhotoGallery />
        <MessageSection />
        <SurpriseButton />
        <MemoryTimeline />
        <Footer />
      </main>
    </BirthYearGate>
  )
}
