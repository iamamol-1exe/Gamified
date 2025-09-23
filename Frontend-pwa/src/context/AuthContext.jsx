import { createContext, useState, useEffect } from "react";
import axios from "axios";

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [quizData, setQuizData] = useState([
    {
      question: "Which shape has 4 equal sides?",
      options: ["Triangle", "Square", "Rectangle", "Circle"],
      answer: "Square",
      subject: "TECh",
      totalMarks: 50,
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris",
      subject: "Geography",
      totalMarks: 50,
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H", "O", "H2O", "C"],
      answer: "H2O",
      subject: "Chemistry",
      totalMarks: 50,
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["J.K. Rowling", "Harper Lee", "George Orwell", "Mark Twain"],
      answer: "Harper Lee",
      subject: "Literature",
      totalMarks: 50,
    },
    {
      question: "What is the smallest planet in our solar system?",
      options: ["Mercury", "Mars", "Earth", "Venus"],
      answer: "Mercury",
      subject: "Astronomy",
      totalMarks: 50,
    },
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
      const url = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(url, {
        standard: standard,
        subject: subject,
      });
      
      if (!response) {
        alert("Questions is not availble");
        throw new Error("No response received");
      }

      // Make sure we have data
      if (response.data && Array.isArray(response.data.questions)) {
        // Append the questions to the quizData array
        setQuizData((prevQuizData) => [
          ...prevQuizData,
          ...response.data.questions,
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
        getQuestions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
