import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"

const ProductCard = ({ product, onAddToCart, className, ...props }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async (e) => {
    e.stopPropagation()
    setIsLoading(true)
    try {
      await onAddToCart({
        productId: product.Id.toString(),
        productName: product.name,
        quantity: 1,
        size: product.availableSizes[0],
        flavor: product.availableFlavors[0],
        customMessage: "",
        price: product.basePrice
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewProduct = () => {
    navigate(`/products/${product.Id}`)
  }

  return (
    <motion.div
      className={cn(
        "group cursor-pointer bg-surface rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100",
        className
      )}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleViewProduct}
      {...props}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {product.customizable && (
          <Badge 
            variant="default" 
            className="absolute top-3 left-3 shadow-lg"
          >
            <ApperIcon name="Settings" size={12} className="mr-1" />
            Customizable
          </Badge>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleViewProduct()
            }}
            className="bg-surface/90 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-surface transition-colors shadow-lg"
          >
            <ApperIcon name="Eye" size={16} />
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
              {product.name}
            </h3>
            <Badge variant="secondary" className="text-xs whitespace-nowrap">
              {product.category}
            </Badge>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ApperIcon name="Users" size={14} />
          <span>{product.availableSizes.length} sizes available</span>
          <span className="text-gray-300">•</span>
          <span>{product.availableFlavors.length} flavors</span>
        </div>

        {product.dietaryTags && product.dietaryTags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.dietaryTags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Starting at</p>
            <p className="text-2xl font-display font-bold text-primary">
              ${product.basePrice.toFixed(2)}
            </p>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            disabled={isLoading}
            size="sm"
            className="min-w-[100px]"
          >
            {isLoading ? (
              <ApperIcon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <>
                <ApperIcon name="ShoppingCart" size={16} className="mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard