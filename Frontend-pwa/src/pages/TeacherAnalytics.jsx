// import React from 'react';
// import {
//   BellIcon,
//   HomeIcon,
//   BarChart3Icon,
//   FolderClockIcon,
//   AreaChartIcon,
//   UserIcon,
//   LogOutIcon,
//   SettingsIcon,
//   SearchIcon,
// } from './shapes/DashBoardShapes';

import Calendar from "../Components/Calendar";

const TeacherAnalytics = () => {
  return (
    <div className="flex flex-col space-y-8 p-8 bg-gray-100">
      {/* User Info Section */}
      <div className="flex flex-wrap items-start space-x-6">
        <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-300"></div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">Amol</h1>
          <p className="text-gray-500">amol@example.com</p>
          <p className="text-gray-500">Delhi, India</p>
          <p className="text-gray-500">Member since 1/1/2024</p>
          <div className="mt-2 text-gray-600">
            <h2 className="text-lg font-semibold">Bio</h2>
            <p>Student in Standard 6 From college D.A.V Public school</p>
          </div>
        </div>
        <div>
        <Calendar />
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rank Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-lg font-semibold text-gray-800">Rank</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900 mt-2">4</p>
        </div>

        {/* Points Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">💰</span>
            <h2 className="text-lg font-semibold text-gray-800">Points</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900 mt-2">320</p>
        </div>

        {/* MaxStreak Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">🔥</span>
            <h2 className="text-lg font-semibold text-gray-800">MaxStreak</h2>
          </div>
          <p className="text-4xl font-bold text-gray-900 mt-2">8 Days</p>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalytics;