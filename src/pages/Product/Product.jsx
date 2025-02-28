import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlurText from "../../components/BlurText/BlurText";
import Navbar from "../../components/NavBar/NavBar";

const Example = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const empowermentWords = [
    "Entrepreneurs",
    "Creators",
    "Leaders",
    "Innovators",
    "Visionaries",
    "Changemakers",
    "Founders"
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % empowermentWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const infinityTextVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };


  const imageVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <Navbar />
        <div className="flex flex-col md:flex-row mx-auto max-w-6xl px-4 pt-16">
          {/* Left section with infinity animation */}
          <motion.div 
            className="w-full md:w-1/2 flex flex-col justify-center p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={handleAnimationComplete}
          >
            <motion.h2 
              className="text-lg font-medium text-pink-600 mb-3"
              variants={itemVariants}
            >
              Empowering Women
            </motion.h2>
            
            <motion.div className="flex mb-3 h-16" variants={itemVariants}>
              <span className="text-4xl font-bold text-gray-800 mr-3">Women</span>
              <motion.div
                key={currentWordIndex}
                className="text-4xl font-bold text-pink-600"
                variants={infinityTextVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                {empowermentWords[currentWordIndex]}
              </motion.div>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Empowering women entrepreneurs to showcase their businesses, grow their brands, and access financial literacy resources. Join our marketplace, connect with customers, and take your business to the next level!
            </motion.p>
            
            <motion.div className="flex gap-4" variants={itemVariants}>
              <motion.button
                className="px-6 py-3 bg-pink-600 text-white rounded-[30px] font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Now
              </motion.button>
              <motion.button
                className="px-6 py-3 border border-pink-600 text-pink-600 rounded-[30px] font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(236, 72, 153, 0.05)" }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right section with cool visuals */}
          <motion.div 
            className="w-full md:w-1/2 flex justify-center items-center p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="relative w-full max-w-md aspect-square"
            >
              {/* Main circular element */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full opacity-90"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              
              {/* Floating elements */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    top: `${20 + i * 15}%`,
                    left: `${15 + i * 12}%`,
                  }}
                  animate={{
                    y: [0, -10, 0, 10, 0],
                    x: [0, 5, 0, -5, 0],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <motion.span className="text-pink-600 font-bold">
                    {["💼", "💰", "🚀", "📊", "🌟"][i]}
                  </motion.span>
                </motion.div>
              ))}
              
              {/* Center text */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                  Women Empowerment
                </h1>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Example;