import React from "react";
import { Home, Book, Briefcase, Settings, Users, User, Circle  } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Learn", icon: Book, path: "/learn" },
    { name: "Product", icon: Briefcase, path: "/product" },
    { name: "Service", icon: Settings, path: "/service" },
    { name: "About Us", icon: Users, path: "/aboutus" },
    { name: "Join", icon: Circle, path: "/join" }
  ];

  return (
    <div className="bg-pink-600 text-white h-screen w-14 hover:w-48 fixed left-0 top-0 flex flex-col items-center py-4 transition-all duration-300 overflow-hidden">
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
        <a href="/login"></a>
      </div>
    </div>
  );
};

export default Navbar;
