import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = React.forwardRef(({ 
  className, 
  label,
  error,
  children,
  ...props 
}, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 font-body">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-body focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-colors pr-10",
            error && "border-error focus:border-error focus:ring-error/20",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          size={20} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" 
        />
      </div>
      {error && (
        <p className="text-sm text-error font-body">{error}</p>
      )}
    </div>
  )
})

Select.displayName = "Select"

export default Select