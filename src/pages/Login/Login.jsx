import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/Google.png';

const LoginPage = () => {
  const navigate = useNavigate();

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

  // Define the callback in a way that it can be exposed to window
  const handleGoogleResponse = useCallback((response) => {
    console.log("Google authentication successful:", response);
    
    if (response.credential) {
      // Store the token in localStorage for later use
      localStorage.setItem('googleToken', response.credential);
      
      // Decode the JWT to get user information
      try {
        const base64Url = response.credential.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const user = JSON.parse(jsonPayload);
        console.log("User info:", user);
        
        // Store user info if needed
        localStorage.setItem('user', JSON.stringify({
          name: user.name,
          email: user.email,
          picture: user.picture
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
      
      // Redirect to home page
      navigate('/');
    }
  }, [navigate]);

  // Initialize Google OAuth
  useEffect(() => {
    // Expose the callback function to window object
    window.handleGoogleSignIn = handleGoogleResponse;
    
    // Load the Google API script
    const loadGoogleScript = () => {
      // Check if script is already loaded
      if (document.querySelector('script#google-auth')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = 'google-auth';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeGoogleAuth();
      };
    };

    // Initialize Google Authentication
    const initializeGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '1028081832518-ufok7s7c4tjr0ng0vsoipnfoo5pqvvlr.apps.googleusercontent.com',
          callback: handleGoogleResponse,
          auto_select: true
        });
        
        // Display the One Tap UI automatically
        window.google.accounts.id.prompt();
        
        // Also render a custom Google button (optional)
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-button'),
          { theme: 'outline', size: 'large', width: '100%' }
        );
      }
    };

    loadGoogleScript();

    // Clean up script and global function on unmount
    return () => {
      delete window.handleGoogleSignIn;
      const script = document.querySelector('script#google-auth');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [handleGoogleResponse]);

  // Redirect to home page
  const handleBackToHome = () => {
    navigate('/');
  };

  // Trigger Google Sign-in
  const handleGoogleLogin = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt();
    } else {
      console.error("Google authentication not initialized yet");
      // Try to load the script again
      const script = document.querySelector('script#google-auth');
      if (!script) {
        const newScript = document.createElement('script');
        newScript.src = 'https://accounts.google.com/gsi/client';
        newScript.id = 'google-auth';
        newScript.async = true;
        newScript.defer = true;
        document.body.appendChild(newScript);
        
        newScript.onload = () => {
          if (window.google && window.google.accounts && window.google.accounts.id) {
            window.google.accounts.id.initialize({
              client_id: '1028081832518-ufok7s7c4tjr0ng0vsoipnfoo5pqvvlr.apps.googleusercontent.com',
              callback: handleGoogleResponse
            });
            window.google.accounts.id.prompt();
          }
        };
      }
    }
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
                  alt="Google Logo" 
                  className="h-16 mx-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/64x64?text=G";
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

            {/* Google standard button container */}
            <motion.div variants={itemVariants} className="mb-4">
              <div id="google-signin-button" className="w-full"></div>
            </motion.div>

            {/* Google One Tap sign-in container */}
            <div id="g_id_onload" 
              data-client_id="1028081832518-ufok7s7c4tjr0ng0vsoipnfoo5pqvvlr.apps.googleusercontent.com" 
              data-context="signin" 
              data-callback="handleGoogleSignIn"
              data-auto_select="true" 
              data-itp_support="true">
            </div>

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