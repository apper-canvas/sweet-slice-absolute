import { useState } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const SearchBar = ({ onSearch, placeholder = "Search for cakes, cupcakes, and pastries...", className, ...props }) => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    
    setIsLoading(true)
    try {
      await onSearch(query.trim())
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)} {...props}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-12 pr-24 rounded-xl border border-gray-300 bg-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors font-body text-sm placeholder:text-gray-500"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
          >
            <ApperIcon name="X" size={16} />
          </button>
        )}
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 text-sm"
        >
          {isLoading ? (
            <ApperIcon name="Loader2" size={16} className="animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </form>
  )
}

export default SearchBar