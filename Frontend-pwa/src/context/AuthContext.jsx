import React, { createContext, useState, useContext } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // State to hold the authentication status and user data
  const [user, setUser] = useState(null); // null when logged out, user object when logged in

  // NOTE: In a real app, you would check localStorage for a token here
  // to keep the user logged in across page refreshes.

  const login = (userData) => {
    setUser(userData);
    // NOTE: In a real app, you would also save the token to localStorage here
  };

  const logout = () => {
    setUser(null);
    // NOTE: In a real app, you would also remove the token from localStorage here
  };

  // Create a boolean flag for easier checking
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy access to the context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};