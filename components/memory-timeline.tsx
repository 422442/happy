import { Card } from "@/components/ui/card"

const memories = [
  {
    year: "The Beginning",
    title: "When We First Met",
    description: "The day our friendship began, and what a beautiful journey it has been since then.",
    icon: "🌟",
  },
  {
    year: "Adventures",
    title: "Unforgettable Moments",
    description: "All those spontaneous adventures, late-night conversations, and endless laughter.",
    icon: "🎭",
  },
  {
    year: "Growth",
    title: "Growing Together",
    description: "Supporting each other through challenges and celebrating every victory along the way.",
    icon: "🌱",
  },
  {
    year: "Today",
    title: "Celebrating You",
    description: "Today we honor the incredible person you are and the joy you bring to everyone.",
    icon: "🎂",
  },
]

export default function MemoryTimeline() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
      <h3 className="text-4xl md:text-5xl font-bold text-center text-primary mb-16">Our Journey Together</h3>

      <div className="grid md:grid-cols-2 gap-8">
        {memories.map((memory, index) => (
          <Card
            key={index}
            className="p-6 md:p-8 bg-card/50 backdrop-blur border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl flex-shrink-0">{memory.icon}</div>
              <div className="space-y-2">
                <div className="text-sm font-mono text-primary font-semibold">{memory.year}</div>
                <h4 className="text-2xl font-bold text-secondary">{memory.title}</h4>
                <p className="text-foreground/80 leading-relaxed font-mono">{memory.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
