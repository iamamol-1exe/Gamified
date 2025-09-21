const ProfileInformation = () => (
  <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-1/2">
    <div className="flex items-center space-x-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.5a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.631z" />
      </svg>
      <h2 className="text-2xl font-semibold">Profile Information</h2>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gray-200"></div>
        <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl font-bold">Amol</p>
        <p className="text-gray-500">@Amol</p>
      </div>
      <div className="text-sm text-gray-600 space-y-2">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.905l-7.228 4.797a2.25 2.25 0 01-2.174 0L2.97 8.452a2.25 2.25 0 01-1.07-1.905V6.75" />
          </svg>
          <p>amol@example.com</p>
        </div>
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 3.75-6 8.25-6 8.25s-6-4.5-6-8.25a6 6 0 0112 0z" />
          </svg>
          <p>Delhi, India</p>
        </div>
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-purple-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
          </svg>
          <p>Member since 1/1/2024</p>
        </div>
      </div>
      <div className="space-y-2 text-center mt-4">
        <h3 className="font-semibold text-gray-700">Bio</h3>
        <p className="text-gray-600">
          Student in Standard 6 from college D.A.V Public school
        </p>
      </div>
      <button className="mt-4 w-full py-2 px-4 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-colors">
        Edit Profile
      </button>
    </div>
  </div>
);
export default ProfileInformation;