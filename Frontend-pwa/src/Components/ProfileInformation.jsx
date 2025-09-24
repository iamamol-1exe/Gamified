import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileInformation = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(user);

  // Update local state when user context changes
  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  // Listen for storage changes from other tabs/windows only
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (JSON.stringify(parsedUser) !== JSON.stringify(user)) {
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Error syncing user data:", error);
      }
    };

    // Listen for storage changes from other tabs/windows
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [user, setUser]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6 w-full max-w-4xl mx-auto">
      <div className="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.5a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.631z"
          />
        </svg>
        <h2 className="text-2xl font-semibold">Profile Information</h2>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
            {userProfile ? userProfile.fullname?.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
              />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">
            {userProfile ? userProfile.fullname : "Loading..."}
          </p>
          <p className="text-gray-500">
            @{userProfile ? userProfile.fullname?.split(" ")[0] : "User"}
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Basic Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">
                  {userProfile ? userProfile.email : "email@example.com"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500">School</p>
                <p className="font-medium">
                  {userProfile ? userProfile.schoolName : "School Name"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-medium">
                  {userProfile ? userProfile.class : "Class"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-500">Roll Number</p>
                <p className="font-medium">
                  {userProfile ? userProfile.rollNo : "Roll No."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Points & Statistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Points & Performance
          </h3>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <div className="text-center mb-3">
              <p className="text-2xl font-bold text-purple-600">
                {userProfile?.points?.totalPoints || 0}
              </p>
              <p className="text-sm text-gray-600">Total Points</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center">
                <p className="font-semibold text-blue-600">
                  {userProfile?.points?.science || 0}
                </p>
                <p className="text-gray-600">Science</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-green-600">
                  {userProfile?.points?.math || 0}
                </p>
                <p className="text-gray-600">Math</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-orange-600">
                  {userProfile &&
                  userProfile.points &&
                  userProfile.points.technology !== undefined
                    ? userProfile.points.technology
                    : 0}
                </p>
                <p className="text-gray-600">Technology</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-emerald-600">
                  {userProfile?.points?.environment || 0}
                </p>
                <p className="text-gray-600">Environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streaks Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Learning Streaks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
              <div>
                <p className="text-lg font-bold text-orange-600">
                  {userProfile?.streaks?.currentStreak || 0}
                </p>
                <p className="text-sm text-gray-600">Current Streak</p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <div>
                <p className="text-lg font-bold text-red-600">
                  {userProfile?.streaks?.maxDays || 0}
                </p>
                <p className="text-sm text-gray-600">Max Streak</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Solved by Subject */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-3">Tests Solved</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="text-center">
              <p className="font-semibold text-blue-600">
                {userProfile?.streaks?.testSolved?.science || 0}
              </p>
              <p className="text-gray-600">Science</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-green-600">
                {userProfile?.streaks?.testSolved?.math || 0}
              </p>
              <p className="text-gray-600">Math</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-orange-600">
                {userProfile &&
                userProfile.streaks &&
                userProfile.streaks.testSolved?.technology !== undefined
                  ? userProfile.streaks.testSolved?.technology
                  : 0}
              </p>
              <p className="text-gray-600">Technology</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-emerald-600">
                {userProfile?.streaks?.testSolved?.environment || 0}
              </p>
              <p className="text-gray-600">Environment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">
          Achievements & Badges
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          {userProfile?.badges && userProfile.badges.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {userProfile.badges.map((badge, index) => (
                <div
                  key={index}
                  className="text-center p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">{badge}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
              <p className="text-gray-500">No badges earned yet</p>
              <p className="text-sm text-gray-400">
                Complete challenges to earn your first badge!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
