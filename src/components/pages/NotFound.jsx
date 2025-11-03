import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const NotFound = () => {
  const suggestions = [
    { name: "Home", href: "/", icon: "Home", description: "Back to homepage" },
    { name: "Products", href: "/products", icon: "ShoppingBag", description: "Browse our delicious treats" },
    { name: "Custom Orders", href: "/custom-orders", icon: "Sparkles", description: "Create something special" },
    { name: "Contact", href: "/contact", icon: "MessageCircle", description: "Get in touch with us" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* 404 Illustration */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-center space-y-6"
            >
              <div className="relative inline-block">
                <div className="text-9xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  404
                </div>
                <div className="absolute inset-0 text-9xl font-display font-bold text-primary/10 blur-sm">
                  404
                </div>
              </div>
              
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center">
                  <ApperIcon name="Cake" size={64} className="text-primary" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-dashed border-accent/30 rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                It looks like this page crumbled away! The page you're looking for might have been moved, 
                deleted, or doesn't exist. But don't worry - we have plenty of sweet alternatives for you.
              </p>
            </div>

            {/* Quick Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {suggestions.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className="block p-6 bg-surface rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                  >
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ApperIcon name={item.icon} size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="min-w-[200px]">
                <Link to="/">
                  <ApperIcon name="Home" size={20} className="mr-2" />
                  Go Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                <Link to="/products">
                  <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
                  Browse Products
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Still Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our team is here to help! Whether you need assistance finding a product, 
              placing a custom order, or have any questions about our bakery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link to="/contact">
                  <ApperIcon name="MessageCircle" size={18} className="mr-2" />
                  Contact Support
                </Link>
              </Button>
              
              <div className="flex items-center justify-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Phone" size={16} className="text-primary" />
                  <span className="text-sm">(555) 123-CAKE</span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Mail" size={16} className="text-accent" />
                  <span className="text-sm">help@sweetslice.com</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="text-gray-500 italic text-lg">
              Fun fact: While you were here, we probably baked 12 fresh croissants! 🥐
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound