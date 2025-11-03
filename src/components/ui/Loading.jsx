import { cn } from "@/utils/cn"

const Loading = ({ className, variant = "default", ...props }) => {
  if (variant === "skeleton") {
    return (
      <div className={cn("animate-pulse space-y-6", className)} {...props}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-secondary rounded-xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-gradient-to-r from-primary/30 to-primary/20 rounded"></div>
                <div className="h-4 bg-gradient-to-r from-accent/30 to-accent/20 rounded w-3/4"></div>
                <div className="h-8 bg-gradient-to-r from-primary/40 to-accent/30 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary", className)} {...props}>
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 mx-auto">
            <svg className="animate-spin h-16 w-16 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-display font-semibold text-gray-900">Loading Sweet Treats...</p>
          <p className="text-sm text-gray-600">Preparing something delicious for you</p>
        </div>
      </div>
    </div>
  )
}

export default Loading