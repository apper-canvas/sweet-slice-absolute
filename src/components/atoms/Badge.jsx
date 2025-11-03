import React from "react"
import { cn } from "@/utils/cn"

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  children,
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gradient-to-r from-primary to-accent text-white",
    secondary: "bg-secondary text-gray-800 border border-primary/20",
    success: "bg-gradient-to-r from-success to-success/80 text-white",
    warning: "bg-gradient-to-r from-warning to-warning/80 text-white",
    error: "bg-gradient-to-r from-error to-error/80 text-white",
    outline: "border-2 border-primary text-primary bg-transparent",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge