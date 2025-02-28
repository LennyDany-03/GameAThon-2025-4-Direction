import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Book, Briefcase, Settings, Users, User } from "lucide-react";

const HomePage = () => {
  // Banner state and functions
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Banner images
  const bannerImages = [
    "/api/placeholder/1200/400",
    "/api/placeholder/1200/400",
    "/api/placeholder/1200/400",
    "/api/placeholder/1200/400",
    "/api/placeholder/1200/400",
    "/api/placeholder/1200/400",
  ];
  
  // Auto slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [bannerImages.length]);
  
  // Banner controls
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerImages.length) % bannerImages.length);
  };
  
  // Animation variants for banner
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  
  // Navbar items
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Learn", icon: Book, path: "/learn" },
    { name: "Product", icon: Briefcase, path: "/product" },
    { name: "Service", icon: Settings, path: "/service" },
    { name: "About Us", icon: Users, path: "/aboutus" },
  ];
  
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      title: "Handcrafted Jewelry Set",
      subtitle: "By Artisan Creations",
      description: "Beautiful handmade jewelry set that includes earrings, necklace, and bracelet made with sustainable materials.",
      image: "src/assets/HandMade.jpg",
      price: 89.99,
      discount: 15,
      rating: 4.7,
      badges: ["Handmade", "Eco-friendly"],
    },
    {
      id: 2,
      title: "Organic Skincare Bundle",
      subtitle: "By Natural Beauty",
      description: "A complete skincare set with cleanser, toner, and moisturizer made from 100% organic ingredients.",
      image: "src/assets/SkinCar.jpg",
      price: 65.50,
      discount: 0,
      rating: 4.9,
      badges: ["Organic", "Cruelty-free"],
    },
    {
      id: 3,
      title: "Woven Basket Collection",
      subtitle: "By Weave & Wonder",
      description: "Set of three handwoven baskets in different sizes, perfect for home organization and decor.",
      image: "src/assets/Basket.jpg",
      price: 45.99,
      discount: 10,
      rating: 4.5,
      badges: ["Handcrafted"],
    },
    {
      id: 4,
      title: "Digital Marketing Course",
      subtitle: "By Growth Academy",
      description: "Comprehensive online course teaching essential digital marketing skills for female entrepreneurs.",
      image: "src/assets/Marketing.jpg",
      price: 129.99,
      discount: 20,
      rating: 4.8,
      badges: ["Online", "Certificate"],
    },
  ];

  // Card component
  const Card = ({ title, subtitle, description, image, price, discount, rating, badges }) => {
    // Calculate discount price if applicable
    const discountedPrice = discount ? price - (price * discount) / 100 : null;
    
    return (
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        whileHover={{ 
          y: -10,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
          transition: { type: "spring", stiffness: 300, damping: 20 }
        }}
      >
        {/* Card Image */}
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          
          {/* Badges */}
          {badges && badges.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-semibold rounded-md bg-pink-600 text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          
          {/* Discount Badge */}
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              {discount}% OFF
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mb-1">{subtitle}</p>
          )}

          {/* Rating */}
          {rating && (
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-600">
                {rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Price */}
          <div className="mt-2 mb-4">
            {discountedPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-pink-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              </div>
            ) : (
              price && (
                <span className="text-lg font-bold text-gray-800">
                  ${price.toFixed(2)}
                </span>
              )
            )}
          </div>

          {/* Button */}
          <motion.button
            className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Details
          </motion.button>
        </div>
      </motion.div>
    );
  };

  // Animation variants for content sections
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0 
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
        {/* Banner Section */}
        <div className="relative w-full overflow-hidden h-72 md:h-80 lg:h-96">
          {/* Main Banner Images */}
          <AnimatePresence initial={false} custom={1}>
            <motion.div
              key={currentIndex}
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full"
            >
              <img 
                src={bannerImages[currentIndex]} 
                alt={`Banner slide ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-8">
                <motion.h2 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  Empowering Women Entrepreneurs
                </motion.h2>
                <motion.p 
                  className="text-sm md:text-base lg:text-lg max-w-2xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Join our platform to showcase your business, connect with customers, and access resources to grow your brand.
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Arrows */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 focus:outline-none"
            onClick={prevSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 focus:outline-none"
            onClick={nextSlide}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Indicator Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full focus:outline-none ${
                  index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <motion.section 
          className="py-8 px-4 max-w-7xl mx-auto"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="mb-6 text-center" variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover unique products and services from women entrepreneurs around the world
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                subtitle={product.subtitle}
                description={product.description}
                image={product.image}
                price={product.price}
                discount={product.discount}
                rating={product.rating}
                badges={product.badges}
              />
            ))}
          </div>
          
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <motion.button 
              className="px-6 py-3 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Products
            </motion.button>
          </motion.div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          className="py-10 md:py-16 px-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Start Your Journey?
            </motion.h2>
            <motion.p 
              className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Join our community of women entrepreneurs and take your business to new heights.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.button 
                className="px-6 py-2 md:py-3 bg-white text-pink-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.button>
              <motion.button 
                className="px-6 py-2 md:py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 md:py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Women Empowerment Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;