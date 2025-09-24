import { useState } from "react";
import PropTypes from "prop-types"; // Add PropTypes import
import { BellIcon } from "../shapes/DashBoardShapes";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
// import { useAuth } from "../context/AuthContext"; // Commented out for now

const Header = ({ onMenuClick }) => {
  // Authentication will be added back when needed
  // const { isAuthenticated } = useAuth();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  // Dummy data for notifications
  const dummyNotifications = [
    {
      id: 1,
      title: "New Assignment Posted",
      message: "Maths Chapter 5 homework is due Friday.",
    },
    {
      id: 2,
      title: "Grade Update",
      message: "Your Science quiz has been graded.",
    },
    {
      id: 3,
      title: "Event Reminder",
      message: "Parent-Teacher meeting tomorrow at 10 AM.",
    },
  ];

  return (
    <header className="bg-[#D0B9FF] shadow-sm p-4 flex justify-between items-center">
      {/* --- Left Side: Logo and Title --- */}
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

      {/* --- Right Side: Icons and Pop-ups --- */}
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

        {/* --- Start Notification Section --- */}
        {/* 2. Add a relative container for positioning the dropdown */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!isNotificationOpen)}
            className="relative text-gray-600"
          >
            <BellIcon className="w-6 h-6" />
            {/* Conditionally show the notification dot */}
            {dummyNotifications.length > 0 && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-purple-600 ring-2 ring-white"></span>
            )}
          </button>

          {/* Conditionally render the dropdown component */}
          {isNotificationOpen && (
            <NotificationDropdown
              notifications={dummyNotifications}
              onClose={() => setNotificationOpen(false)}
            />
          )}
        </div>
        {/* --- End Notification Section --- */}

        {/* --- Profile Section --- */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!isProfileOpen)}
            className="cursor-pointer"
          >
            <img
              src="https://placehold.co/40x40/EFE2F9/7C3AED?text=U"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {isProfileOpen && (
            <ProfileDropdown onClose={() => setProfileOpen(false)} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// Add PropTypes validation
Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};
