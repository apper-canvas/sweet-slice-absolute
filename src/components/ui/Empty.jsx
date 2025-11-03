import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "Nothing here yet", 
  message = "It looks like there's nothing to show right now.", 
  actionText = "Browse Products",
  onAction,
  icon = "ShoppingBag",
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
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-secondary to-primary/20 rounded-full flex items-center justify-center shadow-lg">
            <ApperIcon name={icon} size={48} className="text-primary" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-display font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg">
            {message}
          </p>
        </div>

        {onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg"
          >
            <ApperIcon name="ShoppingCart" size={20} />
            {actionText}
          </button>
        )}
        
        <div className="grid grid-cols-3 gap-4 pt-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mb-2">
              <ApperIcon name="Cake" size={24} className="text-accent" />
            </div>
            <p className="text-sm text-gray-600">Custom Cakes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center mb-2">
              <ApperIcon name="Cookie" size={24} className="text-primary" />
            </div>
            <p className="text-sm text-gray-600">Fresh Pastries</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center mb-2">
              <ApperIcon name="Heart" size={24} className="text-accent" />
            </div>
            <p className="text-sm text-gray-600">Made with Love</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Empty