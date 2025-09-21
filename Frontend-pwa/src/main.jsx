import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext"; // 1. Import the AuthProvider
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Import your page components
import Layout from "./pages/Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx"; // Corrected casing from "login.jsx"
import UserPage from "./pages/UserPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LeaderBoardPage from "./pages/LeaderBoardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Registration from "./pages/Registration.jsx";
import Analytics from "./pages/Analytics.jsx";
import TeacherAnalytics from "./pages/TeacherAnalytics.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="profilepage" element={<ProfilePage />} />
        <Route path="userpage" element={<UserPage />} />
        <Route path="leaderboard" element={<LeaderBoardPage />} />
        <Route path="Analytics" element={<Analytics />} />
        <Route path="TeacherAnalytics" element={<TeacherAnalytics />} />
        {/* I've added the missing Dashboard route based on our previous discussions */}
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 2. Wrap the RouterProvider with the AuthProvider */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);