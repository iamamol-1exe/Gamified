import React from "react";

const DailyChallenges = () => {
  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-800">Daily Challenges</h3>
        <p className="text-gray-500">Complete 2 Challenges from any STEM</p>
      </div>
      <button className="bg-purple-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-700 transition">
        Start
      </button>
    </div>
  );
};

export default DailyChallenges;
