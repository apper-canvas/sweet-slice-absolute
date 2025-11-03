import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Select from "@/components/atoms/Select"

const CustomOrders = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    eventType: "",
    cakeType: "",
    servingSize: "",
    deliveryDate: "",
    budget: "",
    description: "",
    specialRequests: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const eventTypes = [
    "Birthday Party",
    "Wedding",
    "Anniversary",
    "Graduation",
    "Corporate Event",
    "Baby Shower",
    "Retirement",
    "Holiday Celebration",
    "Other"
  ]

  const cakeTypes = [
    "Tiered Cake",
    "Sheet Cake",
    "Cupcake Tower",
    "Specialty Shaped Cake",
    "Dessert Table",
    "Wedding Cake",
    "Other"
  ]

  const servingSizes = [
    "10-15 people",
    "20-30 people",
    "40-50 people",
    "60-75 people",
    "100+ people"
  ]

  const budgetRanges = [
    "Under $100",
    "$100 - $250",
    "$250 - $500",
    "$500 - $1000",
    "$1000+"
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    const required = ["customerName", "email", "phone", "eventType", "deliveryDate", "description"]
    for (const field of required) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`)
        setIsSubmitting(false)
        return
      }
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success("Custom order request submitted successfully! We'll contact you within 24 hours.")
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        eventType: "",
        cakeType: "",
        servingSize: "",
        deliveryDate: "",
        budget: "",
        description: "",
        specialRequests: ""
      })
    } catch (error) {
      toast.error("Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: "Sparkles",
      title: "Unique Designs",
      description: "Custom designs tailored to your vision and theme"
    },
    {
      icon: "Users",
      title: "Any Size Event",
      description: "From intimate gatherings to grand celebrations"
    },
    {
      icon: "Calendar",
      title: "Flexible Scheduling",
      description: "We work around your timeline and delivery needs"
    },
    {
      icon: "MessageCircle",
      title: "Personal Consultation",
      description: "One-on-one design consultation included"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900">
            Custom
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Creations
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Let us bring your dream cake to life. From weddings to birthdays, corporate events to intimate celebrations - 
            we craft unique, personalized cakes that make your special moments unforgettable.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-surface rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-xl mx-auto mb-4 w-fit">
                <ApperIcon name={feature.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Order Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-surface rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary to-accent p-8 text-white">
            <h2 className="text-3xl font-display font-bold mb-2">Request Your Custom Cake</h2>
            <p className="text-white/90 leading-relaxed">
              Fill out the form below and our team will contact you within 24 hours to discuss your custom order.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name *"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
                <Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>
              <Input
                label="Phone Number *"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Event Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Event Type *"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
                <Input
                  label="Event Date *"
                  name="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
                  min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} // 7 days from now
                />
              </div>
            </div>

            {/* Cake Specifications */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Cake Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Cake Type"
                  name="cakeType"
                  value={formData.cakeType}
                  onChange={handleInputChange}
                >
                  <option value="">Select cake type</option>
                  {cakeTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Serving Size"
                  name="servingSize"
                  value={formData.servingSize}
                  onChange={handleInputChange}
                >
                  <option value="">Select serving size</option>
                  {servingSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Budget Range"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Design Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-display font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Design Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-body mb-2">
                    Cake Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Please describe your vision for the cake. Include details about theme, colors, decorations, flavors, and any specific requirements..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-body placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 font-body mb-2">
                    Special Requests or Dietary Requirements
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any allergies, dietary restrictions, special delivery instructions, or additional requests..."
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-body placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full text-lg py-4"
              >
                {isSubmitting ? (
                  <>
                    <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" size={20} className="mr-2" />
                    Submit Custom Order Request
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-3">
                We'll review your request and contact you within 24 hours with a quote and timeline.
              </p>
            </div>
          </form>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
              How far in advance should I order?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              We recommend ordering at least 2-3 weeks in advance for custom cakes, especially for weddings or large events. 
              For urgent orders, please call us directly.
            </p>
          </div>
          
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
              Do you provide tastings?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Yes! We offer cake tastings for orders over $200. Schedule an appointment to try different flavors 
              and discuss your design preferences.
            </p>
          </div>
          
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
              What's your cancellation policy?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Orders can be cancelled up to 72 hours before the delivery date for a full refund. 
              Cancellations within 72 hours are subject to a 50% charge.
            </p>
          </div>
          
          <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
              Do you deliver?
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Yes, we offer delivery within a 25-mile radius. Delivery fees vary by distance. 
              For events, we also provide setup services for an additional fee.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CustomOrders