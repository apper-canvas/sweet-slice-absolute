import { Link } from "react-router-dom"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Footer = ({ className, ...props }) => {
  const currentYear = new Date().getFullYear()

  const footerSections = {
    company: {
      title: "Sweet Slice",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Story", href: "/story" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" }
      ]
    },
    products: {
      title: "Products",
      links: [
        { name: "Custom Cakes", href: "/products?category=cakes" },
        { name: "Cupcakes", href: "/products?category=cupcakes" },
        { name: "Pastries", href: "/products?category=pastries" },
        { name: "Wedding Cakes", href: "/products?type=wedding" }
      ]
    },
    support: {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
        { name: "Order Tracking", href: "/track" },
        { name: "Returns", href: "/returns" }
      ]
    }
  }

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Pinterest", icon: "MapPin", href: "#" }
  ]

  return (
    <footer className={cn(
      "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white",
      className
    )} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-primary to-accent p-3 rounded-xl shadow-lg">
                <ApperIcon name="Cake" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">Sweet Slice</h3>
                <p className="text-sm text-gray-400">Premium Bakery</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Crafting delicious memories since 2015. From custom celebration cakes to daily fresh pastries, 
              we bring sweetness to every special moment in your life.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-gray-800 hover:bg-gradient-to-r hover:from-primary hover:to-accent p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <ApperIcon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-4">
              <h4 className="font-display font-semibold text-lg text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="py-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                <ApperIcon name="MapPin" size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">Visit Our Bakery</p>
                <p className="text-sm text-gray-400">123 Sweet Street, Bakery District</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-accent/20 p-2 rounded-lg">
                <ApperIcon name="Phone" size={18} className="text-accent" />
              </div>
              <div>
                <p className="font-medium">Call Us</p>
                <p className="text-sm text-gray-400">(555) 123-CAKE</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-success/20 p-2 rounded-lg">
                <ApperIcon name="Clock" size={18} className="text-success" />
              </div>
              <div>
                <p className="font-medium">Open Hours</p>
                <p className="text-sm text-gray-400">Tue-Sun: 7AM - 8PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <p>&copy; {currentYear} Sweet Slice. All rights reserved.</p>
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <ApperIcon name="Heart" size={16} className="text-accent" />
            <span>Made with love in our kitchen</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer