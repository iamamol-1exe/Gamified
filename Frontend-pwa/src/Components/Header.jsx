import React, { useState } from "react"; // 1. Import useState from React
import { BellIcon, MenuIcon } from "../shapes/DashBoardShapes";
import NotificationDropdown from "./NotificationDropdown";

const Header = ({ onMenuClick }) => {
  // Dummy data for demonstration. In a real app, you'd fetch this.
  const dummyNotifications = [
    { id: 1, title: "New Assignment Posted", message: "Maths Chapter 5 homework is due Friday." },
    { id: 2, title: "Grade Update", message: "Your Science quiz has been graded." },
    { id: 3, title: "Event Reminder", message: "Parent-Teacher meeting tomorrow at 10 AM." },
  ];

  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const handleNotificationClick = () => {
    setNotificationOpen(!isNotificationOpen);
  };

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
        </a>

        {/* --- Start Notification Section --- */}
        {/* 2. Add a relative container for positioning the dropdown */}
        <div className="relative">
          {/* 3. Add onClick to the button */}
          <button onClick={handleNotificationClick} className="relative text-gray-600">
            <BellIcon className="w-6 h-6" />
            {/* 4. Conditionally show the notification dot */}
            {dummyNotifications.length > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-purple-600 ring-2 ring-white"></span>
            )}
          </button>

          {/* 5. Conditionally render the dropdown component */}
          {isNotificationOpen && (
            <NotificationDropdown 
              notifications={dummyNotifications}
              onClose={() => setNotificationOpen(false)}
            />
          )}
        </div>
        {/* --- End Notification Section --- */}

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