import HeroSection from "@/components/hero-section"
import IntroSection from "@/components/intro-section"
import PhotoGallery from "@/components/photo-gallery"
import MessageSection from "@/components/message-section"
import SurpriseButton from "@/components/surprise-button"
import MemoryTimeline from "@/components/memory-timeline"
import Footer from "@/components/footer"

export default function BirthdayPage() {
  return (
    <main className="min-h-screen bg-background">
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
