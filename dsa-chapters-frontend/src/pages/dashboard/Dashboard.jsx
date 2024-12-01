import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Dashboard</h2>
        <p className="text-gray-600 mb-6">Here is a summary of your recent activities and insights.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Section 1</h3>
            <p className="text-gray-500 mt-2">Some details or stats here.</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Section 2</h3>
            <p className="text-gray-500 mt-2">Some details or stats here.</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Section 3</h3>
            <p className="text-gray-500 mt-2">Some details or stats here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
