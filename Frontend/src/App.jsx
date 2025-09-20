import "./App.css";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import Registration from "./pages/Registration";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<UserPage />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
      </Routes>
    </>
  );
}

export default App;
