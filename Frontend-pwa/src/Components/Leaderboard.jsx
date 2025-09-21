import LeaderboardPodium from "./LeaderboardPodium";
import LeaderboardTablel from "./LeaderboardTable";

function Leaderboard() {
  return (
    <main className="flex-grow p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            See where you are!
          </h1>
          <p className="text-gray-500 mt-1">Here is your Leaderboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Showing :</span>
            <select className="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Overall</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20z" />
              <path d="M2 12h20" />
            </svg>
            <span>English</span>
          </button>
        </div>
      </div>

      <LeaderboardPodium />
      <LeaderboardTablel />
    </main>
  );
}

export default Leaderboard;
