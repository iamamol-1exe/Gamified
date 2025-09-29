import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  AreaChartIcon,
  BarChart3Icon,
  BellIcon,
  FolderClockIcon,
  HomeIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "../shapes/DashBoardShapes";

const Sidebar = ({ isOpen }) => {
  const { logout,user } = useContext(AuthContext);
  const navigate = useNavigate();
    const userType = user?.userType;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const commonNavItems = [
  //  { icon: UserIcon, label: "User Profile", onClick: () => navigate("/profilepage") },
  ];
  
  const teacherNavItems = [
    { icon: HomeIcon, label: "Home", onClick: () => navigate("/teacherdashboard") },
    { icon: BarChart3Icon, label: "Student Performance", onClick: () => navigate("/studentperformance") },

  ];
  
  const studentNavItems = [
    { icon: HomeIcon, label: "Home", onClick: () => navigate("/userpage") },
    // { icon: FolderClockIcon, label: "Offline Resources", onClick: () => navigate("/resources") },
    { icon: BarChart3Icon, label: "Leaderboard", onClick: () => navigate("/leaderboard") },
    // { icon: BellIcon, label: "Notifications", onClick: () => navigate("/notifications") },
  ];
  

  let navItems = [...commonNavItems];
  if (user?.userType === "teacher") {
    navItems = [...navItems, ...teacherNavItems];
  } else if (user?.userType === "student") {
    navItems = [...navItems, ...studentNavItems];
  }

  // const navItems = [
    // { 
    //   icon: HomeIcon,
    //   label: "Home",
    //   path:"/userpage",
    //   onClick: () => navigate("/userpage"),
    // },
    // {
    //   icon: BarChart3Icon,
    //   label: "Leaderboard",
    //   onClick: () => navigate("/leaderboard"),
    // },
    // { icon: FolderClockIcon, label: "Offline Resources" },
    // { icon: AreaChartIcon, label: "Performance Insights" },
    // { icon: BellIcon, label: "Notifications" },
    // { icon: UserIcon,
    //   label: "User Profile",
    //   onClick: () => navigate("/profilepage"),
    //  },
  // ];

  const bottomNavItems = [
    { icon: UserIcon, label: "User Profile", onClick: () => navigate("/profilepage") },
    { icon: LogOutIcon, label: "Logout", onClick: handleLogout },
    // { icon: SettingsIcon, label: "Settings" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#1A1F36] text-white w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-40 flex flex-col`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-purple-600 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 21v-1m-6.364-1.636l.707-.707"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Lakshya</h1>
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#2A2F45] text-white rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item, index) => (
          <a
            key={index}
            onClick={item.onClick}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              item.active
                ? "bg-purple-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            style={{ cursor: 'pointer' }}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="px-4 pb-4 space-y-2">
        {bottomNavItems.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={item.onClick}
            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
