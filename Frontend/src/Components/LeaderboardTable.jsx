import React from "react";
import leaderboardData from "../data/leaderboardData";

function LeaderboardTable() {
  const otherPlayers = leaderboardData.slice(3);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-4 text-left text-gray-500 font-semibold px-6">
        <div>Username</div>
        <div className="text-center">Rank</div>
        <div className="text-right">Point</div>
      </div>
      {otherPlayers.map((user) => (
        <div
          key={user.rank}
          className="grid grid-cols-3 gap-4 items-center bg-white shadow-sm rounded-lg px-6 py-4 transition-all hover:shadow-md hover:bg-indigo-50"
        >
          <div className="font-medium text-gray-800">{user.username}</div>
          <div className="text-center font-semibold text-indigo-600">
            {user.rank}
          </div>
          <div className="text-right font-semibold text-gray-700">
            {user.points}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardTable;
