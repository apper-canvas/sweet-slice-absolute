import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const CartItem = ({ item, onUpdateQuantity, onRemove, className, ...props }) => {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    onUpdateQuantity(item.productId, newQuantity)
  }

  const handleRemove = () => {
    onRemove(item.productId)
  }

  return (
    <motion.div
      className={cn(
        "bg-surface border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      {...props}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary/20 rounded-lg flex items-center justify-center">
            <ApperIcon name="Cake" size={24} className="text-primary" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h4 className="font-display font-semibold text-gray-900 truncate">
                {item.productName}
              </h4>
              <div className="text-sm text-gray-600 space-y-1 mt-1">
                <div className="flex items-center gap-4">
                  <span>Size: {item.size}</span>
                  <span>Flavor: {item.flavor}</span>
                </div>
                {item.customMessage && (
                  <p className="text-accent italic">
                    Message: "{item.customMessage}"
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleRemove}
              className="text-error hover:text-error/80 p-1 rounded-full hover:bg-error/10 transition-colors"
              aria-label="Remove item"
            >
              <ApperIcon name="X" size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-8 w-8 text-gray-600 hover:text-primary"
              >
                <ApperIcon name="Minus" size={14} />
              </Button>
              <span className="px-3 py-1 min-w-[2rem] text-center font-medium">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleQuantityChange(quantity + 1)}
                className="h-8 w-8 text-gray-600 hover:text-primary"
              >
                <ApperIcon name="Plus" size={14} />
              </Button>
            </div>

            <div className="text-right">
              <p className="text-lg font-display font-bold text-primary">
                ${(item.price * quantity).toFixed(2)}
              </p>
              {quantity > 1 && (
                <p className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem