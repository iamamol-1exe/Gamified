import { useContext, useState } from "react";

import SideBar from "../Components/SideBar";
import ProfileInformation from "../Components/ProfileInformation";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const [isSidebarOpen] = useState(false);

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar - conditionally render with proper spacing */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64 flex-shrink-0" : "w-0"
        }`}
      >
        {isSidebarOpen && <SideBar isOpen={isSidebarOpen} />}
      </div>

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        {/* Header */}
        {/* <Header onMenuClick={toggleSidebar} /> */}

        {/* Main Content with responsive layout */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="flex flex-col min-h-screen bg-gray-100 font-sans p-4 space-y-4">
            <div className="flex flex-row min-h-screen rounded-2xl overflow-hidden shadow-2xl">
              <SideBar isOpen={isSidebarOpen} />
              <div className="flex flex-col flex-grow">
                {/* <Header onMenuClick={toggleSidebar} /> */}
                <main className="flex-grow p-6 flex justify-center bg-gray-50">
                  <ProfileInformation />
                </main>
              </div>
            </div>
            {/* Script tag is not needed here; Tailwind is configured in the project */}
          </div>
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
