import HeroSection from "@/components/hero-section"
import IntroSection from "@/components/intro-section"
import PhotoGallery from "@/components/photo-gallery"
import MessageSection from "@/components/message-section"
import SurpriseButton from "@/components/surprise-button"
import MemoryTimeline from "@/components/memory-timeline"
import Footer from "@/components/footer"

export default function BirthdayPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background Gradient Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large gradient orb - top left */}
        <div 
          className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.3) 0%, rgba(234, 179, 8, 0) 70%)',
            animationDuration: '8s',
          }}
        />
        
        {/* Medium gradient orb - top right */}
        <div 
          className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0) 70%)',
            animationDuration: '10s',
            animationDelay: '2s',
          }}
        />
        
        {/* Large gradient orb - center */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(168, 85, 247, 0) 70%)',
            animation: 'float 15s ease-in-out infinite',
          }}
        />
        
        {/* Medium gradient orb - bottom left */}
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-[550px] h-[550px] rounded-full opacity-25 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)',
            animationDuration: '12s',
            animationDelay: '4s',
          }}
        />
        
        {/* Small gradient orb - bottom right */}
        <div 
          className="absolute -bottom-1/4 -right-1/4 w-[450px] h-[450px] rounded-full opacity-30 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(234, 179, 8, 0.25) 0%, rgba(234, 179, 8, 0) 70%)',
            animationDuration: '9s',
            animationDelay: '1s',
          }}
        />
        
        {/* Subtle grid overlay for depth */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(234, 179, 8, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(234, 179, 8, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
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
  )
}
