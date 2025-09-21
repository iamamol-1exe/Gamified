import React, { useEffect, useRef } from 'react';

const NotificationDropdown = ({ notifications, onClose }) => {
  const dropdownRef = useRef(null);

  // This effect adds an event listener to close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
    >
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
      </div>
      <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li key={notification.id} className="p-4 hover:bg-gray-50 cursor-pointer">
              <p className="font-bold text-gray-700">{notification.title}</p>
              <p className="text-sm text-gray-500">{notification.message}</p>
            </li>
          ))
        ) : (
          <li className="p-4 text-center text-gray-500">No new notifications</li>
        )}
      </ul>
      <div className="p-2 bg-gray-50 text-center border-t">
        <a href="#" className="text-purple-600 font-semibold text-sm">
          View all notifications
        </a>
      </div>
    </div>
  );
};

export default NotificationDropdown;