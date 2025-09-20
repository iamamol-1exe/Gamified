import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, RouterProvider,Route,createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/login.jsx";
import UserPage from "./pages/UserPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LeaderBoardPage from "./pages/LeaderBoardPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>     
      <Route path="" element={<LandingPage />} />
       <Route path="login" element={<Login />} />
       <Route path="leaderboard" element={<LeaderBoardPage />} />
       <Route path="userprofile" element={<ProfilePage/>}/>
       <Route path="userpage" element={<UserPage/>}/>

      
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <RouterProvider router={router}/>
  </StrictMode>
)