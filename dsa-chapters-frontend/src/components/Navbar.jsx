import React, {useState} from "react";
import { Menu, X, LogOut, BookOpen, Home, BookMarked, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({handleLogout}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation()
    const navigate = useNavigate();

    const navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: Home },
      { name: 'Topics', href: '/topics', icon: BookOpen },
      { name: 'My Progress', href: '#', icon: BookMarked },
      { name: 'Profile', href: '/profile', icon: User },
    ];
    // const handleLogout = () => {
    //     // Handle logout logic here
    //     navigate('/login');
    //   };
    
  return (
    <div>
      {" "}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  DSA Learning
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium `}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <Link to={'/login'}>
                <div className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </div>
                </Link>
                
              </button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      location.pathname === item.href
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
