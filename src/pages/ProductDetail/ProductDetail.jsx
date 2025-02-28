import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, Book, Briefcase, Settings, Users, User, ShoppingCart, ChevronLeft, Heart, Share, Star, Plus, Minus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for quantity
  const [quantity, setQuantity] = useState(1);
  
  // State for selected image
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Dummy product data - in a real app, you would fetch this based on the id
  const product = {
    id: id,
    title: "Handcrafted Jewelry Set",
    subtitle: "By Artisan Creations",
    description: "This beautiful handmade jewelry set includes earrings, necklace, and bracelet. Each piece is crafted with sustainable materials and features unique designs inspired by nature. Perfect for everyday wear or special occasions, this set adds elegance to any outfit.",
    price: 89.99,
    discount: 15,
    rating: 4.7,
    reviewCount: 124,
    badges: ["Handmade", "Eco-friendly"],
    stock: 12,
    images: [
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600",
      "/api/placeholder/600/600"
    ],
    details: [
      "Handcrafted by skilled artisans",
      "Made with sustainable materials",
      "Nickel-free and hypoallergenic",
      "Adjustable chain length",
      "Comes in a gift box"
    ],
    specifications: {
      "Materials": "Recycled sterling silver, ethically sourced gemstones",
      "Chain Length": "18 inches (adjustable)",
      "Earring Type": "Drop earrings with butterfly backs",
      "Bracelet Size": "7 inches with 1-inch extender",
      "Weight": "28 grams"
    }
  };
  
  // Calculate discounted price
  const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;
  
  // Increase quantity
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  // Decrease quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Add to cart
  const addToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
    // Implement your cart logic here
  };
  
  // Buy now
  const buyNow = () => {
    console.log(`Buying ${quantity} of ${product.title}`);
    // Implement checkout logic or navigation here
  };
  
  // Navigation items for sidebar
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Learn", icon: Book, path: "/learn" },
    { name: "Product", icon: Briefcase, path: "/product" },
    { name: "Service", icon: Settings, path: "/service" },
    { name: "About Us", icon: Users, path: "/aboutus" },
  ];
  
  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar (sidebar) */}
      <div className="bg-pink-600 text-white h-screen w-14 hover:w-48 fixed left-0 top-0 flex flex-col items-center py-4 transition-all duration-300 overflow-hidden z-10">
        {/* Logo */}
        <div className="font-bold text-xl mb-8 self-center">L</div>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-8 w-full">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="flex items-center px-4 w-full h-10 hover:bg-pink-500 transition-colors duration-200"
              aria-label={item.name}
            >
              <div className="w-6 flex justify-center">
                <item.icon size={24} />
              </div>
              <span className="ml-4 whitespace-nowrap">{item.name}</span>
            </a>
          ))}
        </nav>

        {/* Login Icon */}
        <div className="mt-auto flex items-center w-full h-[40px] px-4 hover:bg-pink-500 cursor-pointer transition-colors duration-200">
          <div className="w-6 flex justify-center">
            <User size={24} />
          </div>
          <span className="ml-4 whitespace-nowrap">Login</span>
        </div>
      </div>

      {/* Main content with adjusted margin */}
      <div className="ml-14 transition-all duration-300">
        {/* Product Detail Content */}
        <motion.div
          className="max-w-7xl mx-auto py-8 px-4"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          {/* Breadcrumb and Back Button */}
          <motion.div 
            className="flex items-center mb-6"
            variants={childVariants}
          >
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
            >
              <ChevronLeft size={18} />
              <span className="ml-1">Back</span>
            </button>
            <div className="mx-2 text-gray-400">/</div>
            <div className="text-gray-600">Products</div>
            <div className="mx-2 text-gray-400">/</div>
            <div className="text-pink-600 truncate max-w-xs">{product.title}</div>
          </motion.div>
          
          {/* Product Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <motion.div 
              className="space-y-4"
              variants={childVariants}
            >
              {/* Main Image */}
              <motion.div 
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.title} 
                  className="w-full h-auto object-cover aspect-square"
                />
              </motion.div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.div 
                    key={index}
                    className={`rounded-md overflow-hidden flex-shrink-0 cursor-pointer border-2 ${
                      selectedImage === index ? "border-pink-500" : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} thumbnail ${index + 1}`} 
                      className="w-16 h-16 object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Product Info */}
            <motion.div 
              className="space-y-6"
              variants={childVariants}
            >
              {/* Title and Subtitle */}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{product.title}</h1>
                <p className="text-gray-600">{product.subtitle}</p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star 
                      key={index} 
                      size={16} 
                      className={index < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
              
              {/* Price */}
              <div className="flex items-end space-x-2">
                <span className="text-2xl font-bold text-pink-600">${discountedPrice.toFixed(2)}</span>
                {product.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
              
              {/* Description */}
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              
              {/* Stock */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 font-medium">Availability:</span>
                {product.stock > 0 ? (
                  <span className="text-green-600">{product.stock} in stock</span>
                ) : (
                  <span className="text-red-600">Out of stock</span>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div className="flex flex-col space-y-2">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center w-32">
                  <button 
                    onClick={decreaseQuantity} 
                    disabled={quantity <= 1}
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-l-md border border-gray-300 ${
                      quantity <= 1 ? "bg-gray-100 text-gray-400" : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1 && val <= product.stock) {
                        setQuantity(val);
                      }
                    }}
                    className="w-full h-8 px-2 text-center border-y border-gray-300 focus:outline-none text-gray-700"
                  />
                  <button 
                    onClick={increaseQuantity} 
                    disabled={quantity >= product.stock}
                    className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-r-md border border-gray-300 ${
                      quantity >= product.stock ? "bg-gray-100 text-gray-400" : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.button
                  onClick={addToCart}
                  className="flex-1 flex items-center justify-center py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </motion.button>
                <motion.button
                  onClick={buyNow}
                  className="flex-1 py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now
                </motion.button>
              </div>
              
              {/* Wishlist and Share */}
              <div className="flex space-x-4 pt-2">
                <button className="flex items-center text-gray-600 hover:text-pink-600 transition-colors">
                  <Heart size={18} className="mr-1" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-pink-600 transition-colors">
                  <Share size={18} className="mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </motion.div>
          </div>
          
          {/* Product Details Section */}
          <motion.div 
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={childVariants}
          >
            {/* Features */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Features</h2>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-pink-600 mr-2 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Specifications */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={index} className="flex flex-wrap">
                    <span className="w-1/3 font-medium text-gray-700">{key}:</span>
                    <span className="w-2/3 text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Related Products Placeholder */}
          <motion.div 
            className="mt-12"
            variants={childVariants}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                >
                  <img 
                    src="/api/placeholder/300/300" 
                    alt={`Related product ${index + 1}`} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 mb-1">Related Product {index + 1}</h3>
                    <p className="text-pink-600 font-bold">$49.99</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 md:py-12 px-4 mt-12">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Women Empowerment Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProductDetail;