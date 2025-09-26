import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([
    // {
    //   question: "Which shape has 4 equal sides?",
    //   options: ["Triangle", "Square", "Rectangle", "Circle"],
    //   answer: "Square",
    //   subject: "TECh",
    //   totalMarks: 50,
    // },
    // {
    //   question: "What is the capital of France?",
    //   options: ["London", "Berlin", "Paris", "Madrid"],
    //   answer: "Paris",
    //   subject: "Geography",
    //   totalMarks: 50,
    // },
    // {
    //   question: "What is the chemical symbol for water?",
    //   options: ["H", "O", "H2O", "C"],
    //   answer: "H2O",
    //   subject: "Chemistry",
    //   totalMarks: 50,
    // },
    // {
    //   question: "Who wrote 'To Kill a Mockingbird'?",
    //   options: ["J.K. Rowling", "Harper Lee", "George Orwell", "Mark Twain"],
    //   answer: "Harper Lee",
    //   subject: "Literature",
    //   totalMarks: 50,
    // },
    // {
    //   question: "What is the smallest planet in our solar system?",
    //   options: ["Mercury", "Mars", "Earth", "Venus"],
    //   answer: "Mercury",
    //   subject: "Astronomy",
    //   totalMarks: 50,
    // },
  ]);
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

  // Sync user data with server every 3 seconds
  useEffect(() => {
    const syncUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const API_ENDPOINTS = {
          student: `${API_BASE_URL}/user/api/profile`,
          teacher: `${API_BASE_URL}/teacher/api/profile`,
          admin: `${API_BASE_URL}/admin/api/profile`,
        };

        const endpoint = API_ENDPOINTS[user.userType];
        console.log(endpoint);
        if (!endpoint || !token) {
          return;
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(response);

        if (response.data && response.data.user) {
          const serverUser = response.data.user;

          // Only update if there are meaningful differences
          if (JSON.stringify(serverUser) !== JSON.stringify(user)) {
            console.log("Differences detected, updating user data");
            setUser(serverUser);
            console.log("User data synchronized with server");
          } else {
            console.log("No changes detected in user data");
          }
        }
      } catch (error) {
        // Silently handle errors to avoid spamming console
        if (error.response?.status !== 401) {
          console.error("Error synchronizing user data:", error.message);
        }
      }
    };

    // Only start syncing if user is logged in
    if (user) {
      // Sync immediately on mount
      syncUserData();

      // Then sync every 3 seconds
      const syncInterval = setInterval(syncUserData, 3000);

      return () => {
        clearInterval(syncInterval);
      };
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    console.log("User logged in successfully");
  };

  const logout = () => {
    setUser(null);
  };

  const getQuestions = async (standard, subject) => {
    console.log(standard, subject);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You need to login first");
        return;
      }
      const url = import.meta.env.VITE_GET_QUESTIONS;
      const response = await axios.post(
        url,
        {
          standard: standard,
          subject: subject,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (!response) {
        alert("Questions are not available");
        throw new Error("No response received");
      }

      // Make sure we have data
      if (response.data && Array.isArray(response.data.parsedQuestions)) {
        // Append the questions to the quizData array
        setQuizData((prevQuizData) => [
          ...prevQuizData,
          ...response.data.parsedQuestions,
        ]);
        return response.data;
      } else {
        console.error("Invalid question format received:", response.data);
        return response.data;
      }
    } catch (err) {
      console.error("Error while getting questions for user:", err);
      return null;
    }
  };

  // Create a boolean flag for easier checking
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setUser,
        user,
        login,
        logout,
        quizData,
        setQuizData,
        getQuestions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
