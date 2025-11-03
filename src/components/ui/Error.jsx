import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ 
  title = "Oops! Something went wrong", 
  message = "We encountered an issue loading your content. Please try again.", 
  onRetry, 
  className,
  ...props 
}) => {
  return (
    <div className={cn(
      "min-h-[400px] flex items-center justify-center p-8",
      className
    )} {...props}>
      <div className="text-center space-y-6 max-w-md">
        <div className="relative">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertTriangle" size={40} className="text-error" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-error/5 to-accent/5 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-xl font-display font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {message}
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <ApperIcon name="RefreshCw" size={18} />
            Try Again
          </button>
        )}
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? Contact us at{" "}
            <a href="mailto:support@sweetslice.com" className="text-accent hover:text-accent/80 transition-colors">
              support@sweetslice.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Error