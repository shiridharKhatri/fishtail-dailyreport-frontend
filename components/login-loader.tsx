"use client"

import { useEffect, useState } from "react"

export function LoginLoader() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="dark fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      {/* Dark theme gradient background with subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />

      {/* Premium accent glows optimized for dark theme */}
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4">
        {/* Premium circular loader with smooth line animation */}
        <div className="relative w-24 h-24">
          {/* Outer circle border */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            style={{
              animation: "rotateClockwise 4s linear infinite",
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.15))",
            }}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/40"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="141.37"
              strokeDashoffset="141.37"
              className="text-primary"
              style={{
                animation: "strokeAnimation 2.5s ease-in-out infinite",
              }}
            />
          </svg>

          {/* Inner accent circle */}
          <div
            className="absolute inset-4 rounded-full border border-primary/30"
            style={{
              animation: "rotateCCW 3s linear infinite",
            }}
          />

          {/* Center dot with glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg"
              style={{
                boxShadow: "0 0 25px rgba(255, 255, 255, 0.8), 0 0 50px rgba(255, 255, 255, 0.4)",
              }}
            />
          </div>
        </div>

        {/* Text content with dark theme typography */}
        <div className="text-center space-y-3 max-w-sm">
          <h2 className="text-lg font-medium text-foreground tracking-wide">Signing in</h2>
          <p className="text-xs text-muted-foreground tracking-wide opacity-80 font-light">Verifying credentials</p>
        </div>

        {/* Elegant progress dots */}
        <div className="flex gap-2 items-center justify-center mt-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1 rounded-full bg-primary/50"
              style={{
                width: i === 0 ? "12px" : "4px",
                animation: `progressDot 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rotateClockwise {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotateCCW {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes strokeAnimation {
          0% {
            stroke-dashoffset: 141.37;
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0.4;
          }
        }

        @keyframes progressDot {
          0%, 100% {
            opacity: 0.5;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.5);
          }
        }
      `}</style>
    </div>
  )
}
