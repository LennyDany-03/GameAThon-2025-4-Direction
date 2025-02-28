import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Logo from '../../assets/Google.png'; // Assume you have a logo image

const LoginPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Redirect to home page
  const handleBackToHome = () => {
    // Use your router's navigation method here
    // For example with react-router: history.push('/')
    console.log("Navigating back to home");
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    // Implement your Google OAuth logic here
    console.log("Google login initiated");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation */}
      <div className="p-4">
        <motion.button
          onClick={handleBackToHome}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Home</span>
        </motion.button>
      </div>

      {/* Main content */}
      <motion.div
        className="flex-1 flex items-center justify-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md">
          <motion.div 
            className="bg-white rounded-xl shadow-xl overflow-hidden p-8"
            variants={itemVariants}
          >
            {/* Logo and header */}
            <div className="text-center mb-8">
              <motion.div 
                className="inline-block mb-4 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              >
                <img 
                  src={Logo} 
                  alt="Women Empowerment Platform Logo" 
                  className="h-16 mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64x64?text=Logo";
                  }} 
                />
              </motion.div>
              <motion.h2 
                className="text-2xl font-bold text-gray-800 mb-2"
                variants={itemVariants}
              >
                Welcome Back
              </motion.h2>
              <motion.p 
                className="text-gray-600"
                variants={itemVariants}
              >
                Sign in to access your account
              </motion.p>
            </div>

            {/* Google login button */}
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center py-3 px-4 bg-white border border-gray-300 rounded-lg font-medium text-gray-800 hover:bg-gray-50 shadow-sm transition-all"
                whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  className="mr-3"
                >
                  <path 
                    fill="#4285F4" 
                    d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" 
                  />
                  <path 
                    fill="#34A853" 
                    d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09c1.97 3.92 6.02 6.62 10.71 6.62z" 
                  />
                  <path 
                    fill="#FBBC05" 
                    d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29v-3.09h-3.98c-.81 1.69-1.28 3.6-1.28 5.38s.46 3.69 1.28 5.38l3.98-3.09z" 
                  />
                  <path 
                    fill="#EA4335" 
                    d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42c-2.08-1.94-4.78-3.13-8.02-3.13-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" 
                  />
                </svg>
                Continue with Google
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div 
              className="flex items-center my-6"
              variants={itemVariants}
            >
              <div className="flex-1 border-t border-gray-300"></div>
            </motion.div>

            {/* Help text */}
            <motion.div 
              className="text-center text-sm text-gray-600"
              variants={itemVariants}
            >
              <p>By signing in, you agree to our</p>
              <p className="mt-1">
                <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Terms of Service</a>
                {" and "}
                <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Privacy Policy</a>
              </p>
            </motion.div>
          </motion.div>

          {/* Join now section */}
          <motion.div 
            className="text-center mt-8"
            variants={itemVariants}
          >
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                Join now
              </a>
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Women Empowerment Platform. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginPage;