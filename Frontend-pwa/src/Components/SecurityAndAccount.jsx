const SecurityAndAccount = () => (
  <div className="bg-white p-6 rounded-xl shadow-md space-y-6 w-1/2">
    <div className="flex items-center space-x-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6a4.5 4.5 0 10-9 0v4.5M19.5 10.5h-15a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25z" />
      </svg>
      <h2 className="text-2xl font-semibold">Security & Account</h2>
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Login Method</h3>
      <div className="bg-gray-100 p-4 rounded-lg">
        <p className="font-medium">Email & Password</p>
        <p className="text-sm text-gray-500">Last login: 1/15/2025, 10:30:00 AM</p>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Password</h3>
      <div className="flex items-center justify-between">
        <p className="font-medium">************</p>
        <button className="flex items-center space-x-2 py-2 px-4 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
          </svg>
          <span>Change Password</span>
        </button>
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold text-gray-700">Active Sessions</h3>
      <div className="space-y-2">
        <div className="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <p className="font-medium">Macbook Pro - Chrome</p>
            <span className="text-sm font-bold text-green-700 bg-green-200 px-2 py-1 rounded-full">Current</span>
          </div>
          <p className="text-sm text-gray-500">Delhi, India · 1/15/2025, 10:30:00 AM</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="font-medium">iPhone 15 - Safari</p>
            <button className="text-sm font-bold text-red-700 bg-red-200 px-2 py-1 rounded-full hover:bg-red-300 transition-colors">Revoke</button>
          </div>
          <p className="text-sm text-gray-500">Delhi, India · 1/14/2025, 6:45:00 PM</p>
        </div>
      </div>
      <button className="w-full py-2 px-4 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-colors">
        Logout All Other Devices
      </button>
    </div>

    <div className="space-y-4">
      <h3 className="font-semibold text-red-600">Danger Zone</h3>
      <div className="border border-red-300 p-4 rounded-lg space-y-2">
        <button className="w-full text-left flex items-center space-x-2 text-red-600 font-bold hover:bg-red-50 p-2 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v3.75m.75-2.25h12m-2.25-2.25h-6m-4.5 4.5V18a2.25 2.25 0 002.25 2.25h6.75m-4.5 2.25h6.75" />
          </svg>
          <span>Logout</span>
        </button>
        <button className="w-full text-left flex items-center space-x-2 text-red-600 font-bold hover:bg-red-50 p-2 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-3.265 3.265m0 0l-3.265-3.265m3.265 3.265v6.59M12 15.75h-.007m-.007 3.375h.007" />
          </svg>
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  </div>
);

export default SecurityAndAccount;