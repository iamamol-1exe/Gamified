import React from "react";
import kids from "../assets/kids.jpg";

const WelcomeBanner = () => {
  return (
    <div className="md:flex items-center justify-between space-y-4 md:space-y-0">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to STEM Quest
        </h2>
        <p className="text-gray-500 mt-2">
          Learn, Play, and Grow with Interactive STEM Education
        </p>
        <p className="text-gray-600 mt-4 max-w-lg">
          Explore exciting games and activities designed to make learning
          Science, Technology, Engineering, and Mathematics fun and engaging!
        </p>
      </div>
      <div className="flex-shrink-0">
        <img
          src={kids}
          alt="STEM Illustration"
          className="rounded-lg w-64 h-auto md:w-80 lg:w-96 object-cover"
        />
      </div>
    </div>
  );
};

export default WelcomeBanner;
