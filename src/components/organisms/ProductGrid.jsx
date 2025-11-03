import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/utils/cn"
import productService from "@/services/api/productService"
import ProductCard from "@/components/molecules/ProductCard"
import SearchBar from "@/components/molecules/SearchBar"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"

const ProductGrid = ({ category, onAddToCart, className, ...props }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(category || "all")
  const [sortBy, setSortBy] = useState("name")

  const categories = [
    { id: "all", name: "All Products", icon: "Grid3X3" },
    { id: "cakes", name: "Cakes", icon: "Cake" },
    { id: "cupcakes", name: "Cupcakes", icon: "Cherry" },
    { id: "pastries", name: "Pastries", icon: "Coffee" }
  ]

  const sortOptions = [
    { value: "name", label: "Name A-Z" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ]

  const loadProducts = async () => {
    setLoading(true)
    setError("")
    try {
      const data = selectedCategory === "all" 
        ? await productService.getAll()
        : await productService.getByCategory(selectedCategory)
      setProducts(data)
      setFilteredProducts(data)
    } catch (err) {
      setError(err.message || "Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [selectedCategory])

  useEffect(() => {
    let filtered = [...products]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.basePrice - b.basePrice)
        break
      case "price-high":
        filtered.sort((a, b) => b.basePrice - a.basePrice)
        break
      case "name":
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, sortBy])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleRetry = () => {
    loadProducts()
  }

  if (loading) {
    return <Loading variant="skeleton" />
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} />
  }

  return (
    <div className={cn("space-y-8", className)} {...props}>
      {/* Search and Filters */}
      <div className="space-y-6">
        <SearchBar onSearch={handleSearch} />
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex items-center gap-2"
              >
                <ApperIcon name={cat.icon} size={16} />
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-surface border border-gray-300 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          
          {searchQuery && (
            <Button
              variant="ghost"
              onClick={() => handleSearch("")}
              className="text-sm"
            >
              <ApperIcon name="X" size={16} className="mr-1" />
              Clear search
            </Button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Empty
          title="No products found"
          message={
            searchQuery 
              ? `We couldn't find any products matching "${searchQuery}". Try adjusting your search or browse our categories.`
              : "No products available in this category right now. Check back soon for new additions!"
          }
          actionText="View All Products"
          onAction={() => {
            setSelectedCategory("all")
            setSearchQuery("")
          }}
          icon="Search"
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${sortBy}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}

export default ProductGrid