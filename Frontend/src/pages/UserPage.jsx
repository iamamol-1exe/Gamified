import React, { useState } from "react";
import Footer from "../Components/Footer";
import Dashboard from "./Dashboard";
import Sidebar from "../Components/SideBar";
import Header from "../Components/Header";

const UserPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true );
  // Prevent scrolling on the body
  return (
    <div>
      <div
        className="bg-gray-100 min-h-screen font-sans"
        style={{ overflow: "hidden" }}
      >
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} />
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-0"
            }`}
          >
            <Header onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
            <main className="p-6" style={{ overflow: "hidden" }}>
              <Dashboard />
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserPage;
