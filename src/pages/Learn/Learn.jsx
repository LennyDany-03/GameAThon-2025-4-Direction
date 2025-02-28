import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Play, BookOpen, Clock, Star, ChevronRight, Heart, Share2, Download } from "lucide-react";
import Navbar from "../../components/NavBar/NavBar"; // Import the Navbar component

const LearnPage = () => {
  // State for search input
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter videos based on search query
  const filteredVideos = videoData.filter(video => 
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    visible: { opacity: 1, y: 0 }
  };

  // More featured videos for the "Related Videos" section
  const relatedFeaturedVideos = videoData.filter(video => 
    video.category === "Business Strategy" || video.category === "Leadership"
  ).slice(0, 3);

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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Learn & Grow</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expand your knowledge with our curated collection of educational videos for women entrepreneurs.
            </p>
          </motion.div>

          {/* Search and filter section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search videos by title, category or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div 
            className="mb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  className="px-4 py-2 rounded-full border border-gray-300 bg-white hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-colors text-sm font-medium"
                  onClick={() => setSearchQuery(category)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Featured video section */}
          {!searchQuery && (
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Featured Video</h2>
                <a href="#all-videos" className="text-indigo-600 hover:text-indigo-800 flex items-center transition-colors text-sm font-medium">
                  View All Videos <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="lg:flex">
                  <div className="lg:w-2/3">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dJQn4DqzMVQ"
                        title="Building a Successful Woman-Led Business"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                  <div className="lg:w-1/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded-full">
                          Finance
                        </span>
                        <div className="flex space-x-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Heart size={18} />
                          </motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                            className="p-1 text-gray-400 hover:text-indigo-500 transition-colors"
                          >
                            <Share2 size={18} />
                          </motion.button>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">Financial Planning for Women Entrepreneurs</h3>
                      <p className="text-gray-600 mb-4">
                        A comprehensive guide to managing finances, securing funding, and planning for growth as a woman business owner. Learn strategies that will help you build a financially sustainable business.
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="mr-4">32:15</span>
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>Finance</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-3">
                        <img 
                          src="https://randomuser.me/api/portraits/women/42.jpg" 
                          alt="Presenter" 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Sarah Johnson</span>
                      </div>
                      <motion.a
                        href="https://www.youtube.com/watch?v=dJQn4DqzMVQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors"
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        Watch Full Video
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Related videos section */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Related Videos</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedFeaturedVideos.map((video) => (
                      <a 
                        key={video.id}
                        href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 group"
                      >
                        <div className="relative w-20 h-12 flex-shrink-0">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="w-full h-full object-cover rounded"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all">
                            <Play className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-xs font-medium text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">{video.title}</h5>
                          <p className="text-xs text-gray-500">{video.duration}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Video grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
            id="all-videos"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {searchQuery ? `Search Results: ${filteredVideos.length} videos found` : "All Videos"}
            </h2>
            
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No videos found matching your search. Try a different keyword.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Video Card Component
const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  
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
      <div className="relative aspect-w-16 aspect-h-9">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Play className="h-16 w-16 text-white opacity-80" />
            </motion.div>
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-semibold rounded">
            {video.category}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{video.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">{video.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{video.duration}</span>
          </div>
          <a 
            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            Watch Video
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Sample video data
const videoData = [
  {
    id: 1,
    title: "Financial Management for Small Businesses",
    description: "Learn essential financial management skills to ensure your small business thrives in today's competitive market.",
    category: "Finance",
    thumbnail: "https://i.ytimg.com/vi/Izw-xaVkO0g/maxresdefault.jpg",
    youtubeId: "Izw-xaVkO0g",
    duration: "28:45",
    rating: 4.8
  },
  {
    id: 2,
    title: "Social Media Marketing Strategies",
    description: "Discover effective social media marketing strategies to grow your online presence and connect with your target audience.",
    category: "Marketing",
    thumbnail: "https://i.ytimg.com/vi/mYjf7lJMzNw/maxresdefault.jpg",
    youtubeId: "mYjf7lJMzNw",
    duration: "34:12",
    rating: 4.7
  },
  {
    id: 3,
    title: "Building a Sustainable Business Model",
    description: "This video explores how to create a sustainable business model that balances profit with purpose and environmental responsibility.",
    category: "Business Strategy",
    thumbnail: "https://i.ytimg.com/vi/GnJwXUosUUo/maxresdefault.jpg",
    youtubeId: "GnJwXUosUUo",
    duration: "41:58",
    rating: 4.9
  },
  {
    id: 4,
    title: "Effective Leadership Skills for Women",
    description: "Develop the leadership skills needed to lead with confidence, authenticity, and effectiveness in any business environment.",
    category: "Leadership",
    thumbnail: "https://i.ytimg.com/vi/ZpFhVbDo-Jk/maxresdefault.jpg",
    youtubeId: "ZpFhVbDo-Jk",
    duration: "36:24",
    rating: 4.9
  },
  {
    id: 5,
    title: "E-commerce Essentials: Setting Up Your Online Store",
    description: "A step-by-step guide to setting up a successful online store, from platform selection to product listings and payment processing.",
    category: "E-commerce",
    thumbnail: "https://i.ytimg.com/vi/tIl8SYJ_9Bc/maxresdefault.jpg",
    youtubeId: "tIl8SYJ_9Bc",
    duration: "52:10",
    rating: 4.6
  },
  {
    id: 6,
    title: "Work-Life Balance for Entrepreneurs",
    description: "Strategies for maintaining a healthy work-life balance while building and growing your business.",
    category: "Wellbeing",
    thumbnail: "https://i.ytimg.com/vi/UjKU8Ca_EC0/maxresdefault.jpg",
    youtubeId: "UjKU8Ca_EC0",
    duration: "25:18",
    rating: 4.7
  },
  {
    id: 7,
    title: "Legal Considerations for Small Business Owners",
    description: "Understand the essential legal aspects of running a business, from business structures to contracts and intellectual property.",
    category: "Legal",
    thumbnail: "https://i.ytimg.com/vi/R9IkVD-HCSU/maxresdefault.jpg",
    youtubeId: "R9IkVD-HCSU",
    duration: "48:32",
    rating: 4.5
  },
  {
    id: 8,
    title: "Product Development: From Idea to Market",
    description: "Follow the journey of product development from initial concept to market launch, including prototyping, testing, and manufacturing.",
    category: "Product Development",
    thumbnail: "https://i.ytimg.com/vi/edWbCjfvzSE/maxresdefault.jpg",
    youtubeId: "edWbCjfvzSE",
    duration: "39:45",
    rating: 4.8
  },
  {
    id: 9,
    title: "Building a Strong Personal Brand",
    description: "Learn how to create and maintain a compelling personal brand that aligns with your business values and resonates with your audience.",
    category: "Branding",
    thumbnail: "https://i.ytimg.com/vi/qiJpjOzQwSM/maxresdefault.jpg",
    youtubeId: "qiJpjOzQwSM",
    duration: "31:20",
    rating: 4.7
  },
  // New videos added from your links
  {
    id: 10,
    title: "Woman Entrepreneur Success Story",
    description: "Learn from the journey and insights of a successful woman entrepreneur who built her business from scratch.",
    category: "Entrepreneurship",
    thumbnail: "https://i.ytimg.com/vi/Izw-xaVkO0g/maxresdefault.jpg",
    youtubeId: "Izw-xaVkO0g",
    duration: "15:38",
    rating: 4.9
  },
  {
    id: 11,
    title: "How to Build a Team for Your Startup",
    description: "Essential guidance for entrepreneurs on building, managing, and growing an effective team for your new business.",
    category: "Leadership",
    thumbnail: "https://i.ytimg.com/vi/bixR-KIJKYM/maxresdefault.jpg",
    youtubeId: "bixR-KIJKYM",
    duration: "23:17",
    rating: 4.7
  },
  {
    id: 12,
    title: "Marketing Your Small Business Online",
    description: "Learn effective digital marketing strategies specifically designed for small businesses with limited budgets.",
    category: "Marketing",
    thumbnail: "https://i.ytimg.com/vi/vilZazhIjoc/maxresdefault.jpg",
    youtubeId: "vilZazhIjoc",
    duration: "18:42",
    rating: 4.8
  },
  {
    id: 13,
    title: "Financial Planning for Women Entrepreneurs",
    description: "A comprehensive guide to managing finances, securing funding, and planning for growth as a woman business owner.",
    category: "Finance",
    thumbnail: "https://i.ytimg.com/vi/dJQn4DqzMVQ/maxresdefault.jpg",
    youtubeId: "dJQn4DqzMVQ",
    duration: "32:15",
    rating: 4.9
  },
  {
    id: 14,
    title: "Achieving Work-Life Balance as an Entrepreneur",
    description: "Practical tips and strategies for maintaining a healthy balance between running your business and personal life.",
    category: "Wellbeing",
    thumbnail: "https://i.ytimg.com/vi/UzfgLngHisw/maxresdefault.jpg",
    youtubeId: "UzfgLngHisw",
    duration: "27:34",
    rating: 4.8
  }
];

// Categories for filter buttons
const categories = [
  "All",
  "Finance",
  "Marketing",
  "Business Strategy",
  "Leadership",
  "E-commerce",
  "Wellbeing",
  "Legal",
  "Product Development",
  "Branding",
  "Entrepreneurship"
];

export default LearnPage;