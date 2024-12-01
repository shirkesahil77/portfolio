import React, { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to provide authentication state and functions
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate(); // Initialize useNavigate hook

  // Check for token on mount to determine authentication status
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login success
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("token", "your-token-here"); // Replace with actual token
  };

  // Handle logout and navigate to /topics
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
    // navigate("/topics"); // Navigate to /topics after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
