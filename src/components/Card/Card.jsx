import React from "react";
import { motion } from "framer-motion";

const Card = ({
  title,
  subtitle,
  description,
  image,
  price,
  discount,
  rating,
  badges = [],
  buttonText = "View Details",
  onClick,
  variant = "default", // default, minimal, featured
  className = "",
}) => {
  // Calculate discount price if applicable
  const discountedPrice = discount ? price - (price * discount) / 100 : null;
  
  // Card style variants
  const cardStyles = {
    default: "bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden",
    minimal: "bg-white border border-gray-100 rounded-lg overflow-hidden",
    featured: "bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-lg shadow-lg overflow-hidden",
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    },
    hover: { 
      y: -10,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    }
  };

  return (
    <motion.div
      className={`${cardStyles[variant]} ${className} h-full flex flex-col`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Card Image */}
      <div className="relative">
        <img
          src={image || "/api/placeholder/400/300"}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        {badges.length > 0 && (
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
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mb-1">{subtitle}</p>
          )}
        </div>

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
        {description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">
            {description}
          </p>
        )}

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
          className="mt-auto w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-md transition-colors"
          onClick={onClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Card;