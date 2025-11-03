import { useOutletContext, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import ProductGrid from "@/components/organisms/ProductGrid"

const Products = () => {
  const { addToCart } = useOutletContext()
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-gray-900">
              Our Sweet
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Collection
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully crafted selection of cakes, cupcakes, and pastries. 
              Each treat is made fresh daily with premium ingredients and lots of love.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProductGrid 
          category={category}
          onAddToCart={addToCart}
        />
      </section>
    </div>
  )
}

export default Products