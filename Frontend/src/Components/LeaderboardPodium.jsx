import React from "react";
import leaderboardData from "../data/leaderboardData";
import MedalIcon from "../shapes/MedalIcon";

function LeaderboardPodium() {
  const topThree = leaderboardData.slice(0, 3);

  const podiumOrder = [topThree[1], topThree[0], topThree[2]]; // 2nd, 1st, 3rd

  return (
    <div className="flex justify-center items-end space-x-4 mt-8 mb-12">
      {podiumOrder.map((user, index) => (
        <div
          key={user.rank}
          className={`flex flex-col items-center ${
            user.rank === 1
              ? "order-2"
              : user.rank === 2
              ? "order-1"
              : "order-3"
          }`}
        >
          <div
            className={`bg-white shadow-lg rounded-xl p-4 w-48 text-center transform transition-transform hover:scale-105
                        ${
                          user.rank === 1
                            ? "h-40 border-4 border-yellow-400"
                            : "h-32 mt-10"
                        }`}
          >
            <div className="relative -mt-12 mb-2">
              <MedalIcon rank={user.rank} />
            </div>
            <p className="font-bold text-lg text-gray-800">{user.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardPodium;
