import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Import your page components
import Layout from "./pages/Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
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
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);