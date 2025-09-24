import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProfileDropdown = ({ onClose }) => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close the dropdown if a click is detected outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleLogout = () => {
    logout();
    onClose(); // Close the dropdown
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
    >
      {isAuthenticated ? (
        // --- LOGGED IN VIEW ---
        <div>
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="font-semibold text-gray-800 truncate">
              {user?.fullname || "User"}
            </p>
          </div>
          <ul className="py-2">
            <li>
              <Link
                to="/profilepage"
                onClick={onClose}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                View Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        // --- LOGGED OUT VIEW ---
        <ul className="py-2">
          <li>
            <Link
              to="/login"
              onClick={onClose}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/registration"
              onClick={onClose}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Register
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
