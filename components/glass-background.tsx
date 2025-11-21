"use client"

export default function GlassBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-15 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-10 animate-blob animation-delay-4000" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--primary) 1px, transparent 1px), linear-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}
