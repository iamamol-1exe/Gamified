import { Link } from "react-router-dom";
import TeacherHeader from "../Components/TeacherHeader";

const TeacherDashboardPage = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <TeacherHeader></TeacherHeader>

      {/* Main Dashboard Cards */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mx-3 mb-4">
          Teacher Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-3">
          {/* Student Insights Card */}
          <div className="bg-blue-50 p-6 rounded-2xl text-center shadow-sm flex flex-col items-center hover:opacity-80 hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              Student insights
            </h4>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Get here insights
            </p>
            <Link
              to="/studentperformance"
              className="bg-blue-200 text-blue-800 hover:opacity-80 hover:scale-105 w-full font-semibold py-3 rounded-lg transition-all duration-200"
            >
              View Insights
            </Link>
          </div>

          {/* Add MCQ Questions Card */}
          <div className="bg-green-50 p-6 rounded-2xl text-center shadow-sm flex flex-col items-center hover:opacity-80 hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              Add MCQ Questions
            </h4>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Add questions
            </p>
            <Link
              to="/quizform"
              className="bg-green-200 text-green-800 hover:opacity-80 hover:scale-105 w-full font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Create Questions
            </Link>
          </div>

          {/* Chat with Students Card */}
          <div className="bg-purple-50 p-6 rounded-2xl text-center shadow-sm flex flex-col items-center hover:opacity-80 hover:scale-105 transition-all duration-200 cursor-pointer">
            <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              Chat with students
            </h4>
            <p className="text-gray-600 text-sm mb-6 flex-grow">
              Go to message sections
            </p>
            <button className="bg-purple-200 text-purple-800 hover:opacity-80 hover:scale-105 w-full font-semibold py-3 rounded-lg transition-all duration-200">
              Open Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
