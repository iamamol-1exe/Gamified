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

const UserPage = () => {
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
        <div className="bg-purple-100 rounded-xl shadow-lg p-6 w-72">
          <div className="flex justify-between items-center text-purple-800 mb-4">
            <span className="font-semibold text-xl">JAN 2022</span>
            <div className="flex items-center space-x-2">
              <span className="cursor-pointer">{'<'}</span>
              <span className="cursor-pointer">{'>'}</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
              <span key={day} className="text-sm font-semibold text-purple-600">{day}</span>
            ))}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
              <div key={date} className="relative flex justify-center items-center h-8 w-8 rounded-md">
                <span className="text-sm text-gray-700">{date}</span>
                {date % 5 === 0 && <span className="absolute bottom-1 right-1 block h-2 w-2 rounded-full bg-yellow-400"></span>}
                {date % 3 === 0 && <span className="absolute top-1 right-1 block text-orange-400 text-xs">🔥</span>}
              </div>
            ))}
          </div>
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

export default UserPage;
