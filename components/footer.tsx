export default function Footer() {
  return (
    <footer className="py-12 px-4 text-center border-t border-border/50">
      <div className="max-w-2xl mx-auto space-y-4">
        <p className="text-2xl font-bold text-primary">May this year be your best one yet! 🎉</p>
        <p className="text-lg text-foreground/80 font-mono">With love and warmest wishes on your special day</p>
        <div className="flex items-center justify-center gap-3 text-3xl pt-4">
          <span className="animate-float">💝</span>
          <span className="animate-float" style={{ animationDelay: "0.2s" }}>
            🎈
          </span>
          <span className="animate-float" style={{ animationDelay: "0.4s" }}>
            🌟
          </span>
          <span className="animate-float" style={{ animationDelay: "0.6s" }}>
            🎊
          </span>
        </div>
      </div>
    </footer>
  )
}
