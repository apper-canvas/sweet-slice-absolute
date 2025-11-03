import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Header from "@/components/organisms/Header"
import Footer from "@/components/organisms/Footer"
import Cart from "@/components/organisms/Cart"
import { toast } from "react-toastify"

const Layout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("sweetslice_cart")
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart)
          const count = cartItems.reduce((total, item) => total + item.quantity, 0)
          setCartItemCount(count)
        } catch (error) {
          console.error("Error loading cart count:", error)
          setCartItemCount(0)
        }
      } else {
        setCartItemCount(0)
      }
    }

    updateCartCount()

    // Listen for cart updates
    const handleStorageChange = () => {
      updateCartCount()
    }

    window.addEventListener("storage", handleStorageChange)
    
    // Custom event for cart updates within the same tab
    window.addEventListener("cartUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("cartUpdated", handleStorageChange)
    }
  }, [])

  const addToCart = (item) => {
    try {
      const savedCart = localStorage.getItem("sweetslice_cart")
      const cartItems = savedCart ? JSON.parse(savedCart) : []

      // Check if item already exists with same configuration
      const existingItemIndex = cartItems.findIndex(
        cartItem =>
          cartItem.productId === item.productId &&
          cartItem.size === item.size &&
          cartItem.flavor === item.flavor &&
          cartItem.customMessage === item.customMessage
      )

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        cartItems[existingItemIndex].quantity += item.quantity
      } else {
        // Add new item
        cartItems.push(item)
      }

      localStorage.setItem("sweetslice_cart", JSON.stringify(cartItems))
      
      // Update cart count
      const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
      setCartItemCount(newCount)

      // Dispatch custom event
      window.dispatchEvent(new Event("cartUpdated"))

      toast.success(`${item.productName} added to cart!`)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Failed to add item to cart")
    }
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  const closeCart = () => {
    setIsCartOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartItemCount={cartItemCount}
        onCartOpen={openCart}
      />
      
      <main className="pt-16">
        <Outlet context={{ addToCart }} />
      </main>
      
      <Footer />
      
      <Cart 
        isOpen={isCartOpen}
        onClose={closeCart}
      />
    </div>
  )
}

export default Layout