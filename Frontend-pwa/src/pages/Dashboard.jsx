import React from "react";
import Calendar from "../Components/Calendar";
import WelcomeBanner from "../Components/WelcomeBanner";
import Subjects from "../Components/Subjects"
import DailyChallenges from "../Components/DailyChallenges"


const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="lg:flex lg:space-x-8">
        <div className="flex-1">
          
          <WelcomeBanner />
          <DailyChallenges />
          <Subjects />
          
        </div>
        <div className="lg:w-80 mt-8 lg:mt-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">English</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 text-gray-500"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
              Points : 50
            </div>
          </div>
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
