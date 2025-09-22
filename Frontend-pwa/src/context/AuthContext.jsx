import { createContext, useState, useEffect } from "react";

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      // Clear invalid data
      localStorage.removeItem("user");
      return null;
    }
  });

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    console.log("User logged in successfully");
  };

  const logout = () => {
    setUser(null);
  };

  // Create a boolean flag for easier checking
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setUser, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
