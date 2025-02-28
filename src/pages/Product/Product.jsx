import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, ShoppingCart, Heart, ChevronDown, Tag, Check } from "lucide-react";
import Navbar from "../../components/NavBar/NavBar";

const ProductPage = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter products based on search, category, and price
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        product =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (category !== "All") {
      result = result.filter(product => product.category === category);
    }
    
    // Filter by price range
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // 'featured' - no sorting needed as the original order is assumed to be featured
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, category, priceRange, sortBy, products]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Include the Navbar component */}
      <Navbar />
      
      <div className="ml-14 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero section */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Discover Our Products</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our curated collection of products from women entrepreneurs around the world.
            </p>
          </motion.div>

          {/* Search and filters */}
          <div className="mb-8">
            {/* Search bar */}
            <motion.div 
              className="relative max-w-lg mx-auto mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search products by name, category or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Filter className="h-5 w-5" />
              </button>
            </motion.div>

            {/* Filter Controls */}
            {showFilters && (
              <motion.div 
                className="bg-white rounded-lg shadow-md p-4 mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="All">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="0"
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Min"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  {/* Sort By Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Filter Tags */}
            {(searchQuery || category !== "All" || priceRange[0] > 0 || priceRange[1] < 500) && (
              <motion.div 
                className="flex flex-wrap gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {searchQuery && (
                  <div className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full px-3 py-1">
                    <span>Search: {searchQuery}</span>
                    <button 
                      onClick={() => setSearchQuery("")}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
                {category !== "All" && (
                  <div className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full px-3 py-1">
                    <span>Category: {category}</span>
                    <button 
                      onClick={() => setCategory("All")}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <div className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full px-3 py-1">
                    <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
                    <button 
                      onClick={() => setPriceRange([0, 500])}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                )}
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setCategory("All");
                    setPriceRange([0, 500]);
                    setSortBy("featured");
                  }}
                  className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium rounded-full px-3 py-1 transition-colors"
                >
                  Clear All
                </button>
              </motion.div>
            )}
          </div>

          {/* Results count and sort (visible on mobile) */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
            <div className="md:hidden">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-white border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low-high">Sort: Price Low-High</option>
                <option value="price-high-low">Sort: Price High-Low</option>
                <option value="rating">Sort: Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="h-24 w-24 mx-auto mb-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCategory("All");
                    setPriceRange([0, 500]);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Filters
                </button>
              </motion.div>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

// Product Card Component
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const discountedPrice = product.discount 
    ? (product.price - (product.price * product.discount / 100)).toFixed(2) 
    : null;
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-200">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          />
        </button>
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {product.discount}% OFF
          </div>
        )}
        
        {/* Hover Actions */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <motion.button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </motion.button>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.title}</h3>
        
        {/* Seller */}
        <div className="text-sm text-gray-600 mb-2">{product.seller}</div>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          {discountedPrice ? (
            <>
              <span className="text-xl font-bold text-indigo-600">${discountedPrice}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Badge */}
        {product.badge && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Check className="h-3 w-3 mr-1" />
              {product.badge}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Sample Categories
const categories = [
  "Jewelry",
  "Clothing",
  "Home Decor",
  "Beauty",
  "Art",
  "Food",
  "Accessories",
  "Wellness",
  "Books",
  "Technology"
];

// Sample Product Data
const products = [
  {
    id: 1,
    title: "Handcrafted Silver Earrings",
    category: "Jewelry",
    seller: "Artisan Creations",
    description: "Beautiful handmade silver earrings with natural stones, perfect for any occasion.",
    price: 45.99,
    discount: 10,
    rating: 4.8,
    reviews: 123,
    image: "https://plus.unsplash.com/premium_photo-1675719847698-6c8a924b2a7a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2lsdmVyJTIwamV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D",
    badge: "Handmade"
  },
  {
    id: 2,
    title: "Organic Cotton Blouse",
    category: "Clothing",
    seller: "Eco Fashion",
    description: "Sustainably made blouse from 100% organic cotton, comfortable and stylish.",
    price: 59.99,
    discount: 0,
    rating: 4.6,
    reviews: 88,
    image: "https://plus.unsplash.com/premium_photo-1679430887921-31e1047e5b55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3JnYW5pYyUyMGNvdHRvbnxlbnwwfHwwfHx8MA%3D%3D",
    badge: "Eco-friendly"
  },
  {
    id: 3,
    title: "Ceramic Plant Pot Set",
    category: "Home Decor",
    seller: "Green Home",
    description: "Set of 3 ceramic plant pots in different sizes, hand-painted with unique designs.",
    price: 34.50,
    discount: 0,
    rating: 4.7,
    reviews: 56,
    image: "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Handmade"
  },
  {
    id: 4,
    title: "Natural Face Serum",
    category: "Beauty",
    seller: "Pure Glow",
    description: "Rejuvenating face serum made with natural ingredients, free from parabens and sulfates.",
    price: 29.99,
    discount: 15,
    rating: 4.9,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Organic"
  },
  {
    id: 5,
    title: "Abstract Canvas Painting",
    category: "Art",
    seller: "Creative Minds",
    description: "Original abstract painting on canvas, vibrant colors that will brighten any space.",
    price: 120.00,
    discount: 0,
    rating: 4.7,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Handmade"
  },
  {
    id: 6,
    title: "Artisanal Chocolate Box",
    category: "Food",
    seller: "Sweet Delights",
    description: "Assortment of handcrafted chocolates using fair-trade cocoa and natural ingredients.",
    price: 25.99,
    discount: 0,
    rating: 4.8,
    reviews: 112,
    image: "https://plus.unsplash.com/premium_photo-1667031518595-9cb4b0d504ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hvY29sYXRlJTIwYm94fGVufDB8fDB8fHww",
    badge: "Fair Trade"
  },
  {
    id: 7,
    title: "Leather Travel Wallet",
    category: "Accessories",
    seller: "Journey Essentials",
    description: "Handmade leather travel wallet with multiple compartments for passports, cards, and documents.",
    price: 49.99,
    discount: 5,
    rating: 4.6,
    reviews: 78,
    image: "https://plus.unsplash.com/premium_photo-1676999224991-8f3d35dbde54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D",
    badge: "Handmade"
  },
  {
    id: 8,
    title: "Aromatherapy Candle Set",
    category: "Wellness",
    seller: "Serene Spaces",
    description: "Set of 3 aromatherapy candles made with essential oils and soy wax for relaxation and stress relief.",
    price: 32.50,
    discount: 0,
    rating: 4.9,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Organic"
  },
  {
    id: 9,
    title: "Women in Business Book",
    category: "Books",
    seller: "Inspiration Press",
    description: "Inspiring stories of successful women entrepreneurs from around the world.",
    price: 19.95,
    discount: 0,
    rating: 4.7,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: null
  },
  {
    id: 10,
    title: "Digital Marketing Course",
    category: "Technology",
    seller: "Growth Academy",
    description: "Comprehensive online course teaching essential digital marketing skills for women entrepreneurs.",
    price: 89.99,
    discount: 20,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1558655146-605d86ed31b3?q=80&w=2742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Bestseller"
  },
  {
    id: 11,
    title: "Hand-knitted Scarf",
    category: "Clothing",
    seller: "Warm Creations",
    description: "Cozy hand-knitted scarf made with premium wool, perfect for cold weather.",
    price: 38.99,
    discount: 0,
    rating: 4.5,
    reviews: 64,
    image: "https://plus.unsplash.com/premium_photo-1665408932949-a8db7f9b55fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2NhcmZ8ZW58MHx8MHx8fDA%3D",
    badge: "Handmade"
  },
  {
    id: 12,
    title: "Beaded Bracelet Set",
    category: "Jewelry",
    seller: "Vibrant Gems",
    description: "Set of 3 beaded bracelets with natural gemstones, can be worn together or separately.",
    price: 28.50,
    discount: 5,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    badge: "Handmade"
  }
];

export default ProductPage;