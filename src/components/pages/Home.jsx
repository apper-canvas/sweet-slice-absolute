import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import { motion } from "framer-motion"
import productService from "@/services/api/productService"
import ProductCard from "@/components/molecules/ProductCard"
import CategoryCard from "@/components/molecules/CategoryCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Home = () => {
  const { addToCart } = useOutletContext()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadFeaturedProducts = async () => {
    setLoading(true)
    setError("")
    try {
      const products = await productService.getFeatured(6)
      setFeaturedProducts(products)
    } catch (err) {
      setError(err.message || "Failed to load featured products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFeaturedProducts()
  }, [])

  const handleRetry = () => {
    loadFeaturedProducts()
  }

  const categories = ["cakes", "cupcakes", "pastries"]

  const features = [
    {
      icon: "Cake",
      title: "Custom Creations",
      description: "Personalized cakes designed just for your special moments"
    },
    {
      icon: "Clock",
      title: "Fresh Daily",
      description: "All our products are baked fresh every morning"
    },
    {
      icon: "Heart",
      title: "Made with Love",
      description: "Every treat is crafted with passion and premium ingredients"
    },
    {
      icon: "Truck",
      title: "Local Delivery",
      description: "Fast delivery within the city, free on orders over $50"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "The most beautiful wedding cake! Sweet Slice made our day absolutely perfect. The taste was incredible and the design exceeded our expectations."
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Amazing cupcakes for my daughter's birthday party. Fresh, delicious, and the kids loved them. Will definitely order again!"
    },
    {
      name: "Emma Wilson",
      rating: 5,
      text: "Best pastries in town! I visit every weekend for their croissants. The staff is friendly and the quality is consistently excellent."
    }
  ]

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1600&q=80"
            alt="Delicious chocolate cake"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                Sweet Dreams
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Come True
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                Handcrafted cakes, cupcakes, and pastries made fresh daily with premium ingredients. 
                From birthday celebrations to wedding dreams, we make every moment sweeter.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-4">
                <Link to="/products">
                  <ApperIcon name="ShoppingCart" size={20} className="mr-2" />
                  Order Now
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-gray-900">
                <Link to="/custom-orders">
                  <ApperIcon name="Sparkles" size={20} className="mr-2" />
                  Custom Orders
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl mb-3 inline-block">
                    <ApperIcon name={feature.icon} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm">Discover More</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ApperIcon name="ChevronDown" size={24} />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900">
            Our Delicious
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our carefully crafted categories of sweet treats, each made with passion and premium ingredients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900">
              Featured
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Favorites
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked selections from our bakery showcasing the very best we have to offer.
            </p>
          </motion.div>

          {loading && <Loading variant="skeleton" />}
          {error && <Error message={error} onRetry={handleRetry} />}
          
          {!loading && !error && featuredProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.Id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                  />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg">
              <Link to="/products">
                View All Products
                <ApperIcon name="ArrowRight" size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900">
                Baking Dreams Since
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  2015
                </span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                What started as a passion project in our home kitchen has grown into the community's favorite bakery. 
                We believe every celebration deserves something special, and every ordinary day can be made extraordinary 
                with the perfect sweet treat.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Using only the finest ingredients and time-honored techniques, we craft each cake, cupcake, and pastry 
                with the same care and attention as if it were for our own family.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                <div className="text-3xl font-display font-bold text-primary mb-2">5000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl">
                <div className="text-3xl font-display font-bold text-accent mb-2">9</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
            </div>

            <Button asChild size="lg">
              <Link to="/contact">
                <ApperIcon name="MessageCircle" size={20} className="mr-2" />
                Get In Touch
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80"
                alt="Baker decorating a cake"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-accent p-6 rounded-xl text-white shadow-xl">
              <div className="flex items-center space-x-3">
                <ApperIcon name="Award" size={24} />
                <div>
                  <div className="font-display font-bold">Premium Quality</div>
                  <div className="text-white/90 text-sm">Guaranteed Fresh</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              What Our Customers
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Are Saying
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from the families and businesses who trust us with their special moments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-8 rounded-xl shadow-xl"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <ApperIcon key={i} name="Star" size={18} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-display font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">Verified Customer</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold">
              Ready to Make Your
              <span className="block">Day Sweeter?</span>
            </h2>
            <p className="text-xl leading-relaxed opacity-90 max-w-2xl mx-auto">
              Whether you need a custom cake for a special celebration or just want to treat yourself to something delicious, 
              we're here to make your sweet dreams come true.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-4">
                <Link to="/products">
                  <ApperIcon name="ShoppingBag" size={20} className="mr-2" />
                  Browse Products
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary">
                <Link to="/contact">
                  <ApperIcon name="Phone" size={20} className="mr-2" />
                  Call Now: (555) 123-CAKE
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home