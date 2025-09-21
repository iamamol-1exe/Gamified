import React from "react";
import { BellIcon, MenuIcon } from "../shapes/DashBoardShapes";

const Header = ({ onMenuClick }) => {
  return (
    <header className="bg-[#D0B9FF] shadow-sm p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* The entire div is now clickable */}
        <div 
          onClick={onMenuClick} 
          className="flex items-center space-x-2 mr-4 cursor-pointer"
        >
          <div className="p-2 bg-purple-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 21v-1m-6.364-1.636l.707-.707"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
            STEM Quest
          </h1>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        {/* <a
          href="#"
          className="text-gray-600 hover:text-purple-600 font-semibold"
        >
          Home
        </a> */}
        {/* <a
          href="#"
          className="text-gray-600 hover:text-purple-600 font-semibold"
        >
          Logout
        </a> */}
        <button className="relative text-gray-600">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-purple-600 ring-2 ring-white"></span>
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://placehold.co/40x40/EFE2F9/7C3AED?text=U"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;