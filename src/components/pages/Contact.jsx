import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success("Message sent successfully! We'll get back to you within 24 hours.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: "MapPin",
      title: "Visit Our Bakery",
      details: ["123 Sweet Street", "Bakery District", "Sweet City, SC 29401"],
      action: "Get Directions",
      gradient: "from-primary to-accent"
    },
    {
      icon: "Phone",
      title: "Call Us",
      details: ["(555) 123-CAKE", "(555) 123-2253", "Mon-Sat: 7AM - 8PM"],
      action: "Call Now",
      gradient: "from-accent to-primary"
    },
    {
      icon: "Mail",
      title: "Email Us",
      details: ["info@sweetslice.com", "orders@sweetslice.com", "We respond within 4 hours"],
      action: "Send Email",
      gradient: "from-primary/80 to-accent/80"
    }
  ]

  const businessHours = [
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "7:00 AM - 8:00 PM" },
    { day: "Wednesday", hours: "7:00 AM - 8:00 PM" },
    { day: "Thursday", hours: "7:00 AM - 8:00 PM" },
    { day: "Friday", hours: "7:00 AM - 9:00 PM" },
    { day: "Saturday", hours: "7:00 AM - 9:00 PM" },
    { day: "Sunday", hours: "8:00 AM - 6:00 PM" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900">
              Get In
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We'd love to hear from you! Whether you have questions about our products, 
              want to place a custom order, or just want to say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${info.gradient} p-6 text-white`}>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <ApperIcon name={info.icon} size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold">
                    {info.title}
                  </h3>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600">
                    {detail}
                  </p>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  {info.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-surface rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-accent p-8 text-white">
                <h2 className="text-3xl font-display font-bold mb-2">Send us a Message</h2>
                <p className="text-white/90">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    name="name"
                    value={formData.name}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                  />
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 font-body mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-body placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full text-lg py-4"
                >
                  {isSubmitting ? (
                    <>
                      <ApperIcon name="Loader2" size={20} className="mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Business Hours & Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Business Hours */}
            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
                <ApperIcon name="Clock" size={24} className="text-primary mr-3" />
                Business Hours
              </h3>
              <div className="space-y-3">
                {businessHours.map((schedule) => (
                  <div key={schedule.day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-900">{schedule.day}</span>
                    <span className={`text-sm ${schedule.hours === 'Closed' ? 'text-gray-500' : 'text-gray-600'}`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
                <ApperIcon name="Zap" size={24} className="text-accent mr-3" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <ApperIcon name="ShoppingCart" size={18} className="mr-3" />
                  Browse Products
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ApperIcon name="Cake" size={18} className="mr-3" />
                  Custom Orders
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ApperIcon name="Calendar" size={18} className="mr-3" />
                  Schedule Tasting
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-surface rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
                <ApperIcon name="Share2" size={24} className="text-success mr-3" />
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <ApperIcon name="Facebook" size={16} className="mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" className="justify-start">
                  <ApperIcon name="Instagram" size={16} className="mr-2" />
                  Instagram
                </Button>
                <Button variant="outline" className="justify-start">
                  <ApperIcon name="Twitter" size={16} className="mr-2" />
                  Twitter
                </Button>
                <Button variant="outline" className="justify-start">
                  <ApperIcon name="MapPin" size={16} className="mr-2" />
                  Pinterest
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to questions you might have
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
                Do you offer same-day delivery?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                For our regular menu items, we offer same-day delivery if ordered before 12 PM. 
                Custom cakes require at least 48 hours notice.
              </p>
            </div>
            
            <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
                Can I modify an existing order?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Yes, you can modify orders up to 24 hours before the delivery time. 
                Please call us or send an email with your order details.
              </p>
            </div>
            
            <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
                Do you cater events?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! We provide catering services for weddings, corporate events, and parties. 
                Contact us for a custom quote.
              </p>
            </div>
            
            <div className="bg-surface p-6 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600 leading-relaxed">
                We accept cash, all major credit cards, PayPal, and Apple Pay. 
                Custom orders require a 50% deposit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact