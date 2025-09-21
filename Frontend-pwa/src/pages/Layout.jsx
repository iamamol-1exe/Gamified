import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Sidebar from '../Components/SideBar';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar with state and conditional rendering */}
      <div className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64 flex-shrink-0' : 'w-0'
      }`}>
        {isSidebarOpen && <Sidebar isOpen={isSidebarOpen} />}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header with the toggle function passed as a prop */}
        <Header onMenuClick={toggleSidebar} />
        
        <main className="flex-1">
          {/* This is where the page content will be rendered */}
          <Outlet />
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default Layout;