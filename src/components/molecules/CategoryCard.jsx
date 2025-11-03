import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const CategoryCard = ({ category, className, ...props }) => {
  const navigate = useNavigate()

  const categoryConfig = {
    cakes: {
      icon: "Cake",
      title: "Custom Cakes",
      description: "Perfect for celebrations and special moments",
      gradient: "from-primary to-accent",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80"
    },
    cupcakes: {
      icon: "Cherry",
      title: "Cupcakes",
      description: "Individual treats for every occasion",
      gradient: "from-accent to-primary",
      image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&q=80"
    },
    pastries: {
      icon: "Coffee",
      title: "Pastries",
      description: "Fresh baked goods for breakfast and snacks",
      gradient: "from-primary/80 to-accent/80",
      image: "https://images.unsplash.com/photo-1555507036-ab794f1ec35b?w=400&q=80"
    }
  }

  const config = categoryConfig[category] || categoryConfig.cakes

  const handleClick = () => {
    navigate(`/products?category=${category}`)
  }

  return (
    <motion.div
      className={cn(
        "group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-64",
        className
      )}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      {...props}
    >
      <div className="absolute inset-0">
        <img
          src={config.image}
          alt={config.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-80 group-hover:opacity-90 transition-opacity duration-300",
          config.gradient
        )} />
      </div>

      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <ApperIcon name={config.icon} size={24} />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl group-hover:text-yellow-100 transition-colors">
                {config.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {config.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
            <span className="text-sm font-medium">Explore Collection</span>
            <ApperIcon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
          <ApperIcon name="Eye" size={16} className="text-white" />
        </div>
      </div>
    </motion.div>
  )
}

export default CategoryCard