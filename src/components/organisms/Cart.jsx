import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import CartItem from "@/components/molecules/CartItem"
import Empty from "@/components/ui/Empty"

const Cart = ({ isOpen, onClose, className, ...props }) => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("sweetslice_cart")
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart:", error)
        setCartItems([])
      }
    }
  }, [isOpen])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("sweetslice_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (productId, newQuantity) => {
    setCartItems(items =>
      items.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeItem = (productId) => {
    setCartItems(items => items.filter(item => item.productId !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    onClose()
    navigate("/checkout")
  }

  const handleContinueShopping = () => {
    onClose()
    navigate("/products")
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Cart Sidebar */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-md bg-surface shadow-2xl flex flex-col",
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
                <ApperIcon name="ShoppingCart" size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-gray-900">Your Cart</h2>
                <p className="text-sm text-gray-600">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <Empty
                title="Your cart is empty"
                message="Add some delicious treats to get started!"
                actionText="Browse Products"
                onAction={handleContinueShopping}
                icon="ShoppingCart"
              />
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.productId}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </AnimatePresence>

                {/* Clear Cart Button */}
                <div className="pt-4 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-error hover:text-error hover:bg-error/10"
                  >
                    <ApperIcon name="Trash2" size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-display font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-display font-bold text-primary">
                  ${getTotalAmount().toFixed(2)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleContinueShopping}
                  className="flex-1"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1"
                >
                  <ApperIcon name="CreditCard" size={16} className="mr-2" />
                  Checkout
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Free delivery on orders over $50
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Cart