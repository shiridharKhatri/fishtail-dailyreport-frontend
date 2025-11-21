import React from "react"
import { LoadingSpinner } from "../loading-spinner"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
  spinnerSize?: "sm" | "md" | "lg"
  spinnerPosition?: "left" | "right"
}

export const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      isLoading = false,
      loadingText,
      children,
      disabled,
      className,
      spinnerSize = "md",
      spinnerPosition = "left",
      ...props
    },
    ref,
  ) => {
    const isButtonDisabled = isLoading || disabled

    return (
      <button
        ref={ref}
        disabled={isButtonDisabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-200",
          isButtonDisabled && "opacity-70 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {isLoading && spinnerPosition === "left" && <LoadingSpinner size={spinnerSize} className="text-current" />}
        <span>{isLoading && loadingText ? loadingText : children}</span>
        {isLoading && spinnerPosition === "right" && <LoadingSpinner size={spinnerSize} className="text-current" />}
      </button>
    )
  },
)

LoadingButton.displayName = "LoadingButton"
