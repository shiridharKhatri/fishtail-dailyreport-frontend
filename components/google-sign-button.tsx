"use client"

import { useState } from "react"
import { Chrome } from "lucide-react"
import { LoadingButton } from "./ui/loading-button"

export default function GoogleSignButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      console.log("Google sign-in clicked")
    } catch (error) {
      console.error("Sign-in failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoadingButton
      onClick={handleGoogleSignIn}
      isLoading={isLoading}
      loadingText="Signing in..."
      className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-input hover:bg-input/80 text-foreground font-medium text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98 group"
     
    >
      <span className="flex items-center justify-center gap-2">
        <Chrome className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
        <span> Sign in with Google</span>
      </span>
    </LoadingButton>
  )
}
