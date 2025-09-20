import React, { useState } from "react";
import Leaderboard from "../Components/Leaderboard";
import Footer from "../Components/Footer";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";

const LeaderBoardPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="mt-16">
          {" "}
          {/* Adjust this value based on header height */}
          <Leaderboard />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
