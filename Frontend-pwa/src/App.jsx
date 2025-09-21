import "./App.css";

import LandingPage from "./pages/LandingPage";
// import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import ProfilePage from "./pages/ProfilePage";
import Registration from "./pages/Registration";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/dashboard" element={<UserPage />} />
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/reg" element={<Registration />} />
      </Routes> */}
    </>
  );
}

export default App;
 