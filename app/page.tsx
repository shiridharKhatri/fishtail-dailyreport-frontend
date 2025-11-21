"use client"

import { useState } from "react"
import LoginForm from "@/components/login-form"
import GlassBackground from "@/components/glass-background"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <GlassBackground />
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md px-4 sm:px-6">
        <LoginForm />
      </div>
    </div>
  )
}
