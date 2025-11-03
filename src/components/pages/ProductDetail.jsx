import { useState, useEffect } from "react"
import { useParams, useNavigate, useOutletContext } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import productService from "@/services/api/productService"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Badge from "@/components/atoms/Badge"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useOutletContext()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedFlavor, setSelectedFlavor] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const loadProduct = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await productService.getById(id)
      setProduct(data)
      setSelectedSize(data.availableSizes[0])
      setSelectedFlavor(data.availableFlavors[0])
    } catch (err) {
      setError(err.message || "Failed to load product")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      loadProduct()
    }
  }, [id])

  const handleRetry = () => {
    loadProduct()
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsAddingToCart(true)
    try {
      await addToCart({
        productId: product.Id.toString(),
        productName: product.name,
        quantity: quantity,
        size: selectedSize,
        flavor: selectedFlavor,
        customMessage: customMessage,
        price: product.basePrice
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />
  }

  if (!product) {
    return <Error message="Product not found" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-3 mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={20} />
            <span>Back</span>
          </button>
          <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
          <span className="text-gray-600">{product.category}</span>
          <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
          <span className="text-primary font-medium truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {product.customizable && (
                <Badge 
                  variant="default" 
                  className="absolute top-4 left-4 shadow-lg"
                >
                  <ApperIcon name="Settings" size={14} className="mr-1" />
                  Customizable
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index 
                        ? "border-primary shadow-lg scale-105" 
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <Badge variant="secondary" className="whitespace-nowrap capitalize">
                  {product.category}
                </Badge>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center space-x-4">
                <div className="text-3xl font-display font-bold text-primary">
                  ${product.basePrice.toFixed(2)}
                </div>
                <span className="text-gray-500">starting price</span>
              </div>

              {product.dietaryTags && product.dietaryTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.dietaryTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Customization Options */}
            <div className="space-y-6 p-6 bg-surface rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-display font-semibold text-gray-900">
                Customize Your Order
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Select>

                <Select
                  label="Flavor"
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                >
                  {product.availableFlavors.map((flavor) => (
                    <option key={flavor} value={flavor}>
                      {flavor}
                    </option>
                  ))}
                </Select>
              </div>

              {product.customizable && (
                <Input
                  label="Custom Message (Optional)"
                  placeholder="Enter a custom message for your cake..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  maxLength={100}
                />
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="h-8 w-8"
                    >
                      <ApperIcon name="Minus" size={16} />
                    </Button>
                    <span className="px-3 py-1 min-w-[2rem] text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-8 w-8"
                    >
                      <ApperIcon name="Plus" size={16} />
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-display font-bold text-primary">
                    ${(product.basePrice * quantity).toFixed(2)}
                  </p>
                  {quantity > 1 && (
                    <p className="text-sm text-gray-500">
                      ${product.basePrice.toFixed(2)} each
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                size="lg"
                className="w-full text-lg py-4"
              >
                {isAddingToCart ? (
                  <>
                    <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                    Add to Cart - ${(product.basePrice * quantity).toFixed(2)}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Truck" size={16} className="text-success" />
                  <span>Free delivery over $50</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Clock" size={16} className="text-info" />
                  <span>Ready in 2-3 hours</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Shield" size={20} className="text-success" />
                <div>
                  <p className="font-medium text-gray-900">Quality Guarantee</p>
                  <p className="text-sm text-gray-600">Fresh ingredients, made daily</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ApperIcon name="Heart" size={20} className="text-accent" />
                <div>
                  <p className="font-medium text-gray-900">Made with Love</p>
                  <p className="text-sm text-gray-600">Crafted by our expert bakers</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail