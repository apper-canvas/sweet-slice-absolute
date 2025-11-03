import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import orderService from "@/services/api/orderService"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"
import Loading from "@/components/ui/Loading"
import Empty from "@/components/ui/Empty"

const Checkout = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    email: "",
    phone: ""
  })

  const [deliveryInfo, setDeliveryInfo] = useState({
    deliveryMethod: "pickup",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    city: "",
    zipCode: "",
    specialInstructions: ""
  })

  const steps = [
    { id: 1, title: "Contact Info", icon: "User" },
    { id: 2, title: "Delivery", icon: "Truck" },
    { id: 3, title: "Review", icon: "CheckCircle" }
  ]

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM", "7:00 PM"
  ]

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("sweetslice_cart")
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        if (items.length === 0) {
          navigate("/products")
          return
        }
        setCartItems(items)
      } catch (error) {
        console.error("Error loading cart:", error)
        navigate("/products")
      }
    } else {
      navigate("/products")
    }
  }, [navigate])

  // Set minimum delivery date (tomorrow)
  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const minDate = tomorrow.toISOString().split('T')[0]
    
    if (!deliveryInfo.deliveryDate) {
      setDeliveryInfo(prev => ({
        ...prev,
        deliveryDate: minDate
      }))
    }
  }, [deliveryInfo.deliveryDate])

  const getTotalAmount = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const deliveryFee = deliveryInfo.deliveryMethod === "delivery" ? 8.99 : 0
    return subtotal + deliveryFee
  }

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target
    setDeliveryInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!customerInfo.customerName || !customerInfo.email || !customerInfo.phone) {
          toast.error("Please fill in all contact information")
          return false
        }
        break
      case 2:
        if (!deliveryInfo.deliveryDate || !deliveryInfo.deliveryTime) {
          toast.error("Please select delivery date and time")
          return false
        }
        if (deliveryInfo.deliveryMethod === "delivery") {
          if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.zipCode) {
            toast.error("Please fill in all delivery address information")
            return false
          }
        }
        break
    }
    return true
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handlePlaceOrder = async () => {
    if (!validateStep(2)) return

    setIsSubmitting(true)
    try {
      const orderData = {
        ...customerInfo,
        ...deliveryInfo,
        items: cartItems,
        totalAmount: getTotalAmount()
      }

      const newOrder = await orderService.create(orderData)
      
      // Clear cart
      localStorage.removeItem("sweetslice_cart")
      window.dispatchEvent(new Event("cartUpdated"))

      toast.success("Order placed successfully!")
      navigate(`/order-confirmation/${newOrder.orderId}`)
    } catch (error) {
      console.error("Error placing order:", error)
      toast.error("Failed to place order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartItems.length === 0) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Complete Your
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Order
            </span>
          </h1>
          <p className="text-gray-600">Just a few more steps and your delicious treats will be on their way!</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-3 ${
                  currentStep >= step.id ? "text-primary" : "text-gray-400"
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    currentStep >= step.id 
                      ? "bg-primary border-primary text-white" 
                      : "border-gray-300 text-gray-400"
                  }`}>
                    {currentStep > step.id ? (
                      <ApperIcon name="Check" size={20} />
                    ) : (
                      <ApperIcon name={step.icon} size={20} />
                    )}
                  </div>
                  <span className="font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 rounded ${
                    currentStep > step.id ? "bg-primary" : "bg-gray-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
                    <ApperIcon name="User" size={24} className="text-primary mr-3" />
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6">
                    <Input
                      label="Full Name *"
                      name="customerName"
                      value={customerInfo.customerName}
                      onChange={handleCustomerInfoChange}
                      placeholder="Enter your full name"
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Email Address *"
                        name="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={handleCustomerInfoChange}
                        placeholder="your.email@example.com"
                      />
                      <Input
                        label="Phone Number *"
                        name="phone"
                        type="tel"
                        value={customerInfo.phone}
                        onChange={handleCustomerInfoChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <Button onClick={handleNext} size="lg">
                      Continue to Delivery
                      <ApperIcon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Delivery Information */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
                    <ApperIcon name="Truck" size={24} className="text-primary mr-3" />
                    Delivery Information
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Delivery Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Delivery Method *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          onClick={() => setDeliveryInfo(prev => ({ ...prev, deliveryMethod: "pickup" }))}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            deliveryInfo.deliveryMethod === "pickup"
                              ? "border-primary bg-primary/5"
                              : "border-gray-300 hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <ApperIcon name="MapPin" size={20} className="text-primary" />
                            <div className="text-left">
                              <p className="font-medium">Store Pickup</p>
                              <p className="text-sm text-gray-600">Free - Ready in 2-3 hours</p>
                            </div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => setDeliveryInfo(prev => ({ ...prev, deliveryMethod: "delivery" }))}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            deliveryInfo.deliveryMethod === "delivery"
                              ? "border-primary bg-primary/5"
                              : "border-gray-300 hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <ApperIcon name="Truck" size={20} className="text-primary" />
                            <div className="text-left">
                              <p className="font-medium">Delivery</p>
                              <p className="text-sm text-gray-600">$8.99 - Next day delivery</p>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={`${deliveryInfo.deliveryMethod === "pickup" ? "Pickup" : "Delivery"} Date *`}
                        name="deliveryDate"
                        type="date"
                        value={deliveryInfo.deliveryDate}
                        onChange={handleDeliveryInfoChange}
                        min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      />
                      <Select
                        label={`${deliveryInfo.deliveryMethod === "pickup" ? "Pickup" : "Delivery"} Time *`}
                        name="deliveryTime"
                        value={deliveryInfo.deliveryTime}
                        onChange={handleDeliveryInfoChange}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </Select>
                    </div>

                    {/* Delivery Address */}
                    {deliveryInfo.deliveryMethod === "delivery" && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-medium text-gray-900">Delivery Address</h3>
                        <Input
                          label="Street Address *"
                          name="address"
                          value={deliveryInfo.address}
                          onChange={handleDeliveryInfoChange}
                          placeholder="123 Main Street"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="City *"
                            name="city"
                            value={deliveryInfo.city}
                            onChange={handleDeliveryInfoChange}
                            placeholder="Sweet City"
                          />
                          <Input
                            label="ZIP Code *"
                            name="zipCode"
                            value={deliveryInfo.zipCode}
                            onChange={handleDeliveryInfoChange}
                            placeholder="29401"
                          />
                        </div>
                      </div>
                    )}

                    {/* Special Instructions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        name="specialInstructions"
                        value={deliveryInfo.specialInstructions}
                        onChange={handleDeliveryInfoChange}
                        placeholder="Any special delivery instructions..."
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-body placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
                      Back to Contact
                    </Button>
                    <Button onClick={handleNext} size="lg">
                      Continue to Review
                      <ApperIcon name="ArrowRight" size={20} className="ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
                    <ApperIcon name="CheckCircle" size={24} className="text-primary mr-3" />
                    Review Your Order
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Contact Info Review */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                      <p className="text-gray-600">{customerInfo.customerName}</p>
                      <p className="text-gray-600">{customerInfo.email}</p>
                      <p className="text-gray-600">{customerInfo.phone}</p>
                    </div>

                    {/* Delivery Info Review */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {deliveryInfo.deliveryMethod === "pickup" ? "Pickup" : "Delivery"} Information
                      </h3>
                      <p className="text-gray-600 capitalize">
                        {deliveryInfo.deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"}
                      </p>
                      <p className="text-gray-600">
                        {deliveryInfo.deliveryDate} at {deliveryInfo.deliveryTime}
                      </p>
                      {deliveryInfo.deliveryMethod === "delivery" && (
                        <p className="text-gray-600">
                          {deliveryInfo.address}, {deliveryInfo.city} {deliveryInfo.zipCode}
                        </p>
                      )}
                      {deliveryInfo.specialInstructions && (
                        <p className="text-gray-600 italic mt-2">
                          Note: {deliveryInfo.specialInstructions}
                        </p>
                      )}
                    </div>

                    {/* Order Items Review */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {cartItems.map((item) => (
                          <div key={`${item.productId}-${item.size}-${item.flavor}`} className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.productName}</p>
                              <p className="text-sm text-gray-600">
                                {item.size} • {item.flavor} • Qty: {item.quantity}
                              </p>
                              {item.customMessage && (
                                <p className="text-sm text-accent italic">
                                  Message: "{item.customMessage}"
                                </p>
                              )}
                            </div>
                            <p className="font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={handlePrevious}>
                      <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
                      Back to Delivery
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      disabled={isSubmitting}
                      size="lg"
                      className="min-w-[180px]"
                    >
                      {isSubmitting ? (
                        <>
                          <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                          Placing Order...
                        </>
                      ) : (
                        <>
                          <ApperIcon name="CreditCard" size={20} className="mr-2" />
                          Place Order
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.flavor}`} className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {item.productName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.size} • {item.flavor}
                        </p>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 ml-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">
                      ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                    </span>
                  </div>
                  
                  {deliveryInfo.deliveryMethod === "delivery" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-gray-900">$8.99</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold text-primary border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span>${getTotalAmount().toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <ApperIcon name="Info" size={18} className="text-primary mt-0.5" />
                    <div className="text-sm">
                      <p className="text-gray-900 font-medium">Secure Checkout</p>
                      <p className="text-gray-600">
                        Your order will be prepared fresh and ready for {deliveryInfo.deliveryMethod} 
                        at your selected time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout