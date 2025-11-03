import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import orderService from "@/services/api/orderService"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadOrder = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await orderService.getByOrderId(orderId)
      setOrder(data)
    } catch (err) {
      setError(err.message || "Failed to load order details")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const handleRetry = () => {
    loadOrder()
  }

  const getEstimatedTime = () => {
    if (!order) return ""
    
    const isPickup = order.deliveryMethod === "pickup"
    const deliveryDate = new Date(order.deliveryDate)
    const today = new Date()
    const isToday = deliveryDate.toDateString() === today.toDateString()
    
    if (isToday && isPickup) {
      return "Ready for pickup in 2-3 hours"
    } else if (isToday) {
      return "Delivered today"
    } else {
      return `${isPickup ? "Ready for pickup" : "Delivered"} on ${deliveryDate.toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })}`
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />
  }

  if (!order) {
    return <Error message="Order not found" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-success to-success/80 rounded-full flex items-center justify-center shadow-xl">
              <ApperIcon name="CheckCircle" size={48} className="text-white" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute inset-0 bg-gradient-to-r from-success/20 to-success/10 rounded-full animate-pulse"
            />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Thank you for your order! We're already getting started on your delicious treats.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Order Info Card */}
            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                <h2 className="text-2xl font-display font-bold mb-2">Order Details</h2>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-white/90">Order Number</p>
                    <p className="text-xl font-mono font-bold">{order.orderId}</p>
                  </div>
                  <div className="h-8 w-px bg-white/30"></div>
                  <div>
                    <p className="text-white/90">Status</p>
                    <p className="text-lg font-semibold capitalize">{order.status || "Processing"}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Customer Information */}
                <div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{order.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-3">
                    {order.deliveryMethod === "pickup" ? "Pickup" : "Delivery"} Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center space-x-3">
                      <ApperIcon 
                        name={order.deliveryMethod === "pickup" ? "MapPin" : "Truck"} 
                        size={20} 
                        className="text-primary" 
                      />
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {order.deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"}
                        </p>
                        <p className="text-sm text-gray-600">{getEstimatedTime()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="Calendar" size={20} className="text-accent" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(order.deliveryDate).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </p>
                        <p className="text-sm text-gray-600">{order.deliveryTime}</p>
                      </div>
                    </div>
                    {order.specialInstructions && (
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Special Instructions:</span> {order.specialInstructions}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-display font-semibold text-lg text-gray-900 mb-4">
                    Your Items
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.productName}</h4>
                            <div className="text-sm text-gray-600 space-y-1 mt-1">
                              <div className="flex items-center space-x-4">
                                <span>Size: {item.size}</span>
                                <span>Flavor: {item.flavor}</span>
                                <span>Qty: {item.quantity}</span>
                              </div>
                              {item.customMessage && (
                                <p className="text-accent italic">
                                  Message: "{item.customMessage}"
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-gray-500">
                                ${item.price.toFixed(2)} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                What Happens Next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-xl flex-shrink-0">
                    <ApperIcon name="ChefHat" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Preparation Begins</h4>
                    <p className="text-gray-600 text-sm">
                      Our bakers will start preparing your order using fresh ingredients and our signature recipes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-accent/20 p-3 rounded-xl flex-shrink-0">
                    <ApperIcon name="MessageCircle" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Updates Sent</h4>
                    <p className="text-gray-600 text-sm">
                      We'll send you updates via email and SMS as your order progresses through preparation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-success/20 p-3 rounded-xl flex-shrink-0">
                    <ApperIcon name={order.deliveryMethod === "pickup" ? "MapPin" : "Truck"} size={24} className="text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ready Notification</h4>
                    <p className="text-gray-600 text-sm">
                      You'll receive a notification when your order is ready for {order.deliveryMethod}.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/20 p-3 rounded-xl flex-shrink-0">
                    <ApperIcon name="Heart" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Enjoy!</h4>
                    <p className="text-gray-600 text-sm">
                      Enjoy your delicious treats and don't forget to share photos with us on social media!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 space-y-6">
              {/* Order Total */}
              <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Order Total
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ${(order.totalAmount - (order.deliveryMethod === "delivery" ? 8.99 : 0)).toFixed(2)}
                    </span>
                  </div>
                  
                  {order.deliveryMethod === "delivery" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-gray-900">$8.99</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold text-primary border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500">
                  Payment will be collected on {order.deliveryMethod}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Button asChild size="lg" className="w-full">
                  <Link to="/products">
                    <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                    Order More Treats
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">
                    <ApperIcon name="MessageCircle" size={20} className="mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6">
                <h4 className="font-display font-semibold text-gray-900 mb-4">
                  Need Help?
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Phone" size={16} className="text-primary" />
                    <span className="text-gray-700">(555) 123-CAKE</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Mail" size={16} className="text-accent" />
                    <span className="text-gray-700">orders@sweetslice.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ApperIcon name="Clock" size={16} className="text-success" />
                    <span className="text-gray-700">Tue-Sun: 7AM - 8PM</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation