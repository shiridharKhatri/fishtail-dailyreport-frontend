"use client"

export default function GlassBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-primary/18 rounded-full blur-3xl opacity-35 animate-blob animation-delay-4000" />

      {/* Secondary glow layers */}
      <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/12 rounded-full blur-3xl opacity-25 animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20 animate-float animation-delay-2000" />

      {/* Subtle accent glows */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/8 rounded-full blur-3xl opacity-15 animate-float animation-delay-6000" />
      <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-primary/8 rounded-full blur-3xl opacity-10 animate-float animation-delay-4000" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--primary) 1px, transparent 1px), linear-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial vignette for depth */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-50"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />
    </div>
  )
}
