import { Card } from "@/components/ui/card"

export default function MessageSection() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <Card className="p-8 md:p-12 bg-card/50 backdrop-blur border-2 border-primary/20">
        <h3 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-8">A Special Message for You</h3>
        <div className="space-y-6 text-lg md:text-xl text-foreground/90 leading-relaxed font-mono">
          <p>Dear Aditi Ji,</p>
          <p>
            On this beautiful day, I want you to know how incredibly special you are. Your smile lights up every room
            you enter, and your laughter is the sweetest melody. You have a heart of gold and a spirit that inspires
            everyone around you.
          </p>
          <p>
            Thank you for being such an amazing friend, for all the memories we've created together, and for simply
            being you. Your presence in my life is a gift I cherish every single day.
          </p>
          <p>
            As you celebrate another year of life, I hope this year brings you everything your heart desires. May your
            dreams take flight, may your days be filled with joy, and may you always know how deeply you are loved and
            appreciated.
          </p>
          <p className="text-primary font-bold text-2xl text-center mt-8">
            Happy Birthday, Aditi Ji! Here's to you! 🥂✨
          </p>
        </div>
      </Card>
    </section>
  )
}
